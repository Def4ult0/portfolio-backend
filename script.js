const DataService = {
    sendContact: async (data) => {
        console.log("Sending data:", data);
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));
    }
};

const UI = {
    init: async () => {
        UI.setupScrollReveal();
        UI.setupForm();
        UI.setupCursor();
    },

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

    setupForm: () => {
        const form = document.getElementById('contact-form');
        const btn = form.querySelector('button');
        const msg = document.getElementById('form-message');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const originalText = btn.innerText;
            btn.innerText = "Sending...";
            btn.style.opacity = "0.7";
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                await DataService.sendContact(formData);
                msg.style.color = "#8eb88e";
                msg.innerText = "Message sent successfully.";
                form.reset();
            } catch (error) {
                msg.style.color = "red";
                msg.innerText = "Error sending message.";
            } finally {
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.opacity = "1";
                    msg.innerText = "";
                }, 3000);
            }
        });
    },

    // --- Custom Cursor Logic (Updated) ---
    setupCursor: () => {
        const cursor = document.getElementById('pixel-cursor');
        
        // Move cursor
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Hover Effects: Use Event Delegation for reliability
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

        // Click Spark Effect
        document.addEventListener('click', (e) => {
            const sparkCount = 4;
            for (let i = 0; i < sparkCount; i++) {
                const spark = document.createElement('div');
                spark.classList.add('click-spark');
                document.body.appendChild(spark);
                
                // Initial position
                spark.style.left = e.clientX + 'px';
                spark.style.top = e.clientY + 'px';
                
                // Random direction
                const angle = Math.random() * Math.PI * 2;
                const velocity = 20 + Math.random() * 30;
                const tx = Math.cos(angle) * velocity + 'px';
                const ty = Math.sin(angle) * velocity + 'px';
                
                spark.style.setProperty('--tx', tx);
                spark.style.setProperty('--ty', ty);

                // Cleanup
                setTimeout(() => spark.remove(), 600);
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', UI.init);
document.getElementById("contact-form").addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    const response = await fetch("fetch("https://portfolio-backend.onrender.com/contact", {", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    });

    document.getElementById("form-message").innerText = "Message saved!";
});