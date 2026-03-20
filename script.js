// UI Setup
const UI = {
    init: () => {
        UI.setupScrollReveal();
        UI.setupForm();
        UI.setupCursor();
    },

    // Scroll animation
    setupScrollReveal: () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    },

    // ✅ FORM HANDLER (CONNECTED TO BACKEND)
    setupForm: () => {
        const form = document.getElementById('contact-form');
        const btn = form.querySelector('button');
        const msg = document.getElementById('form-message');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const originalText = btn.innerText;
            btn.innerText = "Sending...";
            btn.style.opacity = "0.7";

            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch("https://portfolio-backend-36gi.onrender.com/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                console.log(result);

                msg.style.color = "#8eb88e";
                msg.innerText = "Message sent successfully 🚀";

                form.reset();

            } catch (error) {
                console.log(error);
                msg.style.color = "red";
                msg.innerText = "Error sending message ❌";
            } finally {
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.opacity = "1";
                    msg.innerText = "";
                }, 3000);
            }
        });
    },

    // Custom cursor
    setupCursor: () => {
        const cursor = document.getElementById('pixel-cursor');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const hoverSelectors = 'a, button, input, textarea, .nav-item, .social-item';

        document.body.addEventListener('mouseover', (e) => {
            if (e.target.closest(hoverSelectors)) {
                document.body.classList.add('hovering');
            }
        });

        document.body.addEventListener('mouseout', (e) => {
            if (e.target.closest(hoverSelectors)) {
                document.body.classList.remove('hovering');
            }
        });

        document.addEventListener('click', (e) => {
            for (let i = 0; i < 4; i++) {
                const spark = document.createElement('div');
                spark.classList.add('click-spark');
                document.body.appendChild(spark);

                spark.style.left = e.clientX + 'px';
                spark.style.top = e.clientY + 'px';

                const angle = Math.random() * Math.PI * 2;
                const velocity = 20 + Math.random() * 30;
                const tx = Math.cos(angle) * velocity + 'px';
                const ty = Math.sin(angle) * velocity + 'px';

                spark.style.setProperty('--tx', tx);
                spark.style.setProperty('--ty', ty);

                setTimeout(() => spark.remove(), 600);
            }
        });
    }
};

// Initialize UI
document.addEventListener('DOMContentLoaded', UI.init);