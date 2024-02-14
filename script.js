document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('heartsCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas(); // Set initial canvas size

    window.addEventListener('resize', resizeCanvas);

    const backgroundMusic = document.getElementById('backgroundMusic');

    const journeyButton = document.getElementById('journeyButton');
    const content = document.getElementById('content');
    let step = 0;
    let musicPlayed = false; // Flag to ensure music plays only once

    const messages = [
        "In the last five years, you've filled my life with so much joy.",
        "Every second with you, a gift; every moment something I wouldn’t want to miss.",
        "You're more than just my partner; you're my heart, my soul, my eternal bliss.",
        "We've built our jar of memories, each one I cherish, each one I want to reminisce.",
        "With you, I found a kind of love I didn’t even know was out there,",
        "A dream turned reality, a bond beyond compare.",
        "Loving you is the easiest thing I’ve ever done,",
        "It's like breathing, like the rising and setting of the sun.",
        "Now, I've got two questions for you,",
        "Will you keep being my adventure, my heart's joyous ride?",
        "And will you be my Valentine, today and in all the days that come by? 💖"
    ];


    journeyButton.addEventListener('click', function () {
        if (!musicPlayed) {
            backgroundMusic.play();
            backgroundMusic.volume = 1.0; // Ensure the volume is set to 100%
            musicPlayed = true;
        }

        step++;
        if (step <= messages.length) {
            content.querySelector('p').textContent = messages[step - 1];
            this.textContent = step < messages.length ? "Next" : "Reveal";
        } else {
            this.style.display = 'none';
            content.querySelector('p').textContent = "Will you be my Valentine? 💖";
            for (let i = 0; i < 50; i++) {
                setTimeout(createHeart, i * 100);
            }
        }
    });

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * (window.innerWidth - 60)}px`;
        heart.style.top = `${Math.random() * (window.innerHeight - 60)}px`;
        document.body.appendChild(heart);
        setTimeout(() => heart.classList.add('pop-in'), 100);
        setTimeout(() => heart.remove(), 3000); // Clean up after animation
    }

    let hearts = [];
    class Heart {
        constructor(x, y, size, speed) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speed = speed;
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.size * 0.3);
            ctx.bezierCurveTo(
                this.x, this.y,
                this.x - this.size / 2, this.y,
                this.x - this.size / 2, this.y + this.size * 0.3
            );
            ctx.bezierCurveTo(
                this.x - this.size / 2, this.y + this.size * 0.6,
                this.x, this.y + this.size * 0.6,
                this.x, this.y + this.size
            );
            ctx.bezierCurveTo(
                this.x, this.y + this.size * 0.6,
                this.x + this.size / 2, this.y + this.size * 0.6,
                this.x + this.size / 2, this.y + this.size * 0.3
            );
            ctx.bezierCurveTo(
                this.x + this.size / 2, this.y,
                this.x, this.y,
                this.x, this.y + this.size * 0.3
            );
            ctx.closePath();
            ctx.fillStyle = 'red';
            ctx.fill();
        }

        update() {
            this.y += this.speed;
            if (this.y - this.size > canvas.height) {
                hearts.splice(hearts.indexOf(this), 1);
            }
            this.draw();
        }
    }

    function addHeart() {
        const size = Math.random() * 20 + 15; // Size between 15 and 35
        hearts.push(new Heart(Math.random() * canvas.width, -size, size, Math.random() * 2 + 1));
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (hearts.length < 30 && Math.random() < 0.1) {
            addHeart();
        }

        hearts.forEach(heart => heart.update());
    }

    animate();
});
