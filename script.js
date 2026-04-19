document.addEventListener("DOMContentLoaded", () => {

    // 0. Update Current Year in Footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 1. Mobile Navigation (Burger Menu)
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('active');

            // Burger Animation
            burger.classList.toggle('toggle');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => link.style.animation = '');
            });
        });
    }

    // 2. Sticky Navbar Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. Advanced Typing Text Animation Loop
    const animatedContainer = document.getElementById('animated-role-text');
    if (animatedContainer) {
        async function playHeroAnimation() {
            while (true) {
                // Phase 1: Type "Full Stack Developer"
                animatedContainer.innerHTML = '';
                const fullText = "Full Stack Developer";
                for (let char of fullText) {
                    const span = document.createElement('span');
                    span.className = 'letter-span';
                    span.textContent = char;
                    animatedContainer.appendChild(span);
                    await new Promise(r => setTimeout(r, 100)); // typing speed
                }

                await new Promise(r => setTimeout(r, 1500)); // Pause to read

                // Phase 2: "Full" drops down, "LAMP" bounces in
                const letters = Array.from(animatedContainer.querySelectorAll('.letter-span'));
                const fullLetters = letters.slice(0, 4); // 'F', 'u', 'l', 'l'

                // Drop "Full"
                for (let i = 0; i < 4; i++) {
                    fullLetters[i].classList.add('letter-fall-down');
                    await new Promise(r => setTimeout(r, 150));
                }

                await new Promise(r => setTimeout(r, 400));

                // Remove dropped letters
                for (let i = 0; i < 4; i++) {
                    fullLetters[i].remove();
                }

                // Inject "LAMP"
                const lampChars = ['L', 'A', 'M', 'P'];
                const lampSpans = [];
                for (let i = 0; i < 4; i++) {
                    const span = document.createElement('span');
                    span.className = 'letter-span';
                    span.textContent = lampChars[i];
                    span.style.opacity = '0'; // Initial state before bounce
                    animatedContainer.insertBefore(span, letters[4]);
                    lampSpans.push(span);
                }

                // Bounce "LAMP"
                for (let i = 0; i < 4; i++) {
                    lampSpans[i].classList.add('letter-bounce-in');
                    await new Promise(r => setTimeout(r, 200));
                }

                await new Promise(r => setTimeout(r, 2000)); // Pause for "LAMP Stack Developer"

                // Phase 3: Blast "LAMP Stack Developer"
                const currentLetters = animatedContainer.querySelectorAll('.letter-span');
                currentLetters.forEach(span => {
                    if (span.textContent.trim() !== '') {
                        const tx = (Math.random() - 0.5) * 600 + 'px';
                        const ty = (Math.random() - 0.5) * 600 + 'px';
                        const rot = (Math.random() - 0.5) * 360 + 'deg';
                        span.style.setProperty('--tx', tx);
                        span.style.setProperty('--ty', ty);
                        span.style.setProperty('--rot', rot);
                        span.classList.add('letter-blast');
                    } else {
                        span.style.transition = 'opacity 0.3s';
                        span.style.opacity = '0';
                    }
                });

                await new Promise(r => setTimeout(r, 1200)); // Wait for blast

                // Phase 4: Pop in "AI Assist Developer"
                animatedContainer.innerHTML = '';
                const aiText = "AI Assist Developer";
                for (let char of aiText) {
                    const span = document.createElement('span');
                    span.className = 'letter-span letter-fade-pop';
                    span.textContent = char;
                    animatedContainer.appendChild(span);
                }

                const newLetters = animatedContainer.querySelectorAll('.letter-span');
                for (let i = 0; i < newLetters.length; i++) {
                    newLetters[i].style.animationDelay = `${i * 0.05}s`;
                }

                await new Promise(r => setTimeout(r, 2500 + newLetters.length * 50)); // Pause to read

                // Phase 5: Fast delete to restart
                const lettersToDelete = Array.from(animatedContainer.querySelectorAll('.letter-span'));
                for (let i = lettersToDelete.length - 1; i >= 0; i--) {
                    lettersToDelete[i].style.transition = 'opacity 0.1s, transform 0.1s';
                    lettersToDelete[i].style.opacity = '0';
                    lettersToDelete[i].style.transform = 'scale(0.5)';
                    await new Promise(r => setTimeout(r, 30));
                    lettersToDelete[i].remove();
                }

                await new Promise(r => setTimeout(r, 300)); // Small pause before looping
            }
        }
        playHeroAnimation();
    }

    // 4. Scroll Reveal Animation (Fade In Up)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // 5. Skill Bar Animation (Trigger when visible)
                if (entry.target.classList.contains('skill-category')) {
                    const progressBars = entry.target.querySelectorAll('.progress-line');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        const span = bar.querySelector('span');
                        if (span) span.style.width = width;
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .skill-category, .project-card, .cert-card');
    animatedElements.forEach(el => observer.observe(el));

    // 6. Update Current Year in Footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // 7. Contact Form Handling is moved to a dedicated section later (Line 576) to avoid conflicts
});

/* --- PDF Viewer Logic --- */

// 1. Open File Function (Smart Lego Block with Percentage Loading)
function openPDF(fileUrl) {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfViewer');
    const img = document.getElementById('imgViewer');
    const loader = document.getElementById('modalLoader');
    const percentText = document.getElementById('loadPercent');

    // Reset Elements
    img.style.display = 'none';
    iframe.style.display = 'none';
    loader.style.display = 'flex';
    percentText.textContent = '0%';

    // Modal-ஐ காட்டுதல் (Flex)
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Start Fake Percentage Animation
    let progress = 0;
    const timer = setInterval(() => {
        if (progress < 90) {
            progress += Math.floor(Math.random() * 15) + 1;
            if (progress > 90) progress = 90;
            percentText.textContent = progress + '%';
        }
    }, 150);

    const finishLoading = () => {
        clearInterval(timer);
        percentText.textContent = '100%';
        setTimeout(() => {
            loader.style.display = 'none';
            if (fileUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
                img.style.display = 'block';
            } else {
                iframe.style.display = 'block';
            }
        }, 400); // 100% pathathukum prm switch panrom
    };

    // Extension check and load
    if (fileUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
        img.src = fileUrl;
        img.onload = finishLoading;
    } else {
        iframe.src = fileUrl;
        iframe.onload = finishLoading;
    }
}

// 2. Close File Function
function closePDF() {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfViewer');
    const img = document.getElementById('imgViewer');

    // Modal-ஐ மறைத்தல்
    modal.style.display = 'none';

    // Reset sources to stop loading
    iframe.src = '';
    img.src = '';

    // ஸ்க்ரோல் லாக் ரிலீஸ் செய்தல்
    document.body.style.overflow = 'auto';
}

// 3. Close when clicking outside the box
window.addEventListener('click', (e) => {
    const modal = document.getElementById('pdfModal');
    if (e.target === modal) {
        closePDF();
    }
});

// 5. Skill Bar Animation (Updated with Percentage Bubble)
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // A. Vertical Bars + Bubble Logic
            if (entry.target.classList.contains('tech-card')) {
                const percent = entry.target.getAttribute('data-percent');
                const fill = entry.target.querySelector('.bar-fill');
                const bubble = entry.target.querySelector('.percent-bubble');

                if (fill) {
                    setTimeout(() => {
                        fill.style.height = percent; // பாரை ஏற்றும்
                    }, 200);
                }

                if (bubble) {
                    bubble.textContent = percent; // Bubble-க்குள் நம்பரை எழுதும்
                }
            }

            // B. Old Horizontal Bars (About Me Section)
            if (entry.target.classList.contains('skill-category')) {
                const progressBars = entry.target.querySelectorAll('.progress-line');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    const span = bar.querySelector('span');
                    if (span) span.style.width = width;
                });
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.fade-in-up, .skill-category, .project-card, .cert-card, .tech-card');
animatedElements.forEach(el => observer.observe(el));
/* --- Go to Top Button Logic --- */
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    // 300px கீழே இறங்கினால் பட்டன் தெரியும்
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
}

// பட்டனை கிளிக் செய்தால் மேலே ஸ்மூத் ஆக போகும்
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ==============================================================
   ADVANCED PORTFOLIO THEME WIDGET (Full UI Sync)
   ============================================================== */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Config JSON
    const THEME_CONFIG = {
        radius: [
            { id: 'sharp', name: 'Sharp', values: { '--radius-pill': '0px', '--radius-lg': '0px', '--radius-md': '0px', '--radius-sm': '0px' } },
            { id: 'soft', name: 'Soft', values: { '--radius-pill': '8px', '--radius-lg': '8px', '--radius-md': '6px', '--radius-sm': '4px' } },
            { id: 'rounded', name: 'Rounded', values: { '--radius-pill': '50px', '--radius-lg': '24px', '--radius-md': '15px', '--radius-sm': '8px' } },
            { id: 'curved', name: 'Extra Curved', values: { '--radius-pill': '50px', '--radius-lg': '40px', '--radius-md': '25px', '--radius-sm': '12px' } }
        ],
        colors: [
            { id: 'indigo', p: '#4f46e5', d: '#4338ca', a: '#0ea5e9' },
            { id: 'royal', p: '#2563eb', d: '#1d4ed8', a: '#60a5fa' },
            { id: 'emerald', p: '#10b981', d: '#059669', a: '#34d399' },
            { id: 'rose', p: '#f43f5e', d: '#e11d48', a: '#fb7185' },
            { id: 'amber', p: '#d97706', d: '#b45309', a: '#fcd34d' },
            { id: 'violet', p: '#7c3aed', d: '#6d28d9', a: '#a78bfa' },
            { id: 'cyan', p: '#06b6d4', d: '#0891b2', a: '#22d3ee' },
            { id: 'fuchsia', p: '#d946ef', d: '#c026d3', a: '#e879f9' },
            { id: 'slate', p: '#475569', d: '#334155', a: '#94a3b8' },
            { id: 'sunset', p: '#ff512f', d: '#dd2476', a: '#ff9a9e' }
        ]
    };

    // 2. Inject Widget HTML (Updated with Variables)
    const widgetHtml = `
        <style>
            .theme-btn-active {
                background-color: var(--primary) !important;
                color: white !important;
                border-color: var(--primary) !important;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                transform: translateY(-2px);
            }
            .color-btn-active {
                transform: scale(1.3);
                border: 2px solid #2d3436 !important;
                box-shadow: 0 0 15px var(--primary);
                z-index: 10;
            }
        </style>

        <div id="theme-trigger" style="position: fixed; top: 20%; right: 0; background: var(--primary); color: white; padding: 12px 15px; border-radius: var(--radius-md) 0 0 var(--radius-md); cursor: pointer; z-index: 9990; box-shadow: -2px 2px 10px rgba(0,0,0,0.1); transition: 0.3s;">
            <i class="fa-solid fa-palette fa-spin" style="--fa-animation-duration: 3s;"></i>
        </div>

        <div id="theme-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); z-index: 9999; display: none; align-items: center; justify-content: center;">
            <div style="background: #fff; width: 90%; max-width: 450px; padding: 25px; border-radius: var(--radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.2); position: relative; max-height: 80vh; overflow-y: auto;">
                
                <span id="close-theme" style="position: absolute; top: 15px; right: 20px; font-size: 24px; cursor: pointer; color: #666;">&times;</span>
                
                <h3 style="text-align: center; margin-bottom: 20px; color: #333; font-family: 'Poppins', sans-serif;">
                    <i class="fa-solid fa-wand-magic-sparkles" style="color: var(--primary);"></i> Theme Settings
                </h3>
                
                <div style="margin-bottom: 20px;">
                    <h4 style="font-size: 14px; color: #666; margin-bottom: 10px; text-transform: uppercase;">1. UI Shape</h4>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        ${THEME_CONFIG.radius.map(r => `
                            <button id="shape-btn-${r.id}" onclick="setShape('${r.id}')" 
                                style="flex: 1; padding: 8px; border: 1px solid #ddd; background: #f8f9fa; border-radius: var(--radius-sm); cursor: pointer; font-size: 13px; transition: 0.2s;">
                                ${r.name}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div>
                    <h4 style="font-size: 14px; color: #666; margin-bottom: 10px; text-transform: uppercase;">2. Primary Color</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(35px, 1fr)); gap: 12px; padding: 5px;">
                        ${THEME_CONFIG.colors.map(c => `
                            <div id="color-btn-${c.id}" onclick="setColor('${c.id}')" title="${c.id}" 
                                style="height: 35px; background: ${c.p}; border-radius: var(--radius-md); cursor: pointer; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: 0.3s;">
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div style="margin-top: 25px; text-align: center;">
                    <button onclick="randomizeTheme()" style="background: var(--secondary); border: none; padding: 10px 25px; border-radius: var(--radius-pill); color: white; cursor: pointer; font-size: 13px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                        <i class="fa-solid fa-dice"></i> Shuffle Theme
                    </button>
                </div>
            </div>
        </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = widgetHtml;
    document.body.appendChild(div);

    // 3. Event Listeners
    const modal = document.getElementById('theme-modal');
    const trigger = document.getElementById('theme-trigger');
    const close = document.getElementById('close-theme');

    trigger.addEventListener('click', () => modal.style.display = 'flex');
    close.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

    // 4. Core Functions

    window.setColor = (id) => {
        const color = THEME_CONFIG.colors.find(c => c.id === id);
        if (color) {
            document.documentElement.style.setProperty('--primary', color.p);
            document.documentElement.style.setProperty('--primary-dark', color.d);
            document.documentElement.style.setProperty('--accent', color.a);
            document.documentElement.style.setProperty('--shadow-glow', `0 0 20px ${color.p}`);

            trigger.style.backgroundColor = color.p;

            document.querySelectorAll('[id^="color-btn-"]').forEach(btn => btn.classList.remove('color-btn-active'));
            const activeBtn = document.getElementById(`color-btn-${id}`);
            if (activeBtn) activeBtn.classList.add('color-btn-active');
        }
    };

    window.setShape = (id) => {
        const shape = THEME_CONFIG.radius.find(r => r.id === id);
        if (shape) {
            Object.entries(shape.values).forEach(([key, val]) => {
                document.documentElement.style.setProperty(key, val);
            });

            document.querySelectorAll('[id^="shape-btn-"]').forEach(btn => btn.classList.remove('theme-btn-active'));
            const activeBtn = document.getElementById(`shape-btn-${id}`);
            if (activeBtn) activeBtn.classList.add('theme-btn-active');
        }
    };

    window.randomizeTheme = () => {
        const randColorIndex = Math.floor(Math.random() * THEME_CONFIG.colors.length);
        const randShapeIndex = Math.floor(Math.random() * THEME_CONFIG.radius.length);
        setColor(THEME_CONFIG.colors[randColorIndex].id);
        setShape(THEME_CONFIG.radius[randShapeIndex].id);
    };

    // 5. Auto-Run Random Theme on Refresh
    randomizeTheme();

});

/* =========================================
   MOBILE APP LOGIC (Bottom Nav & Haptic)
   ========================================= */

// 1. Haptic Feedback Function (Vibration)
function vibrate() {
    // Check if browser supports vibration
    if (navigator.vibrate) {
        navigator.vibrate(40); // 40ms 'tik' vibration
    }
}

// Add vibration to all buttons automatically
document.addEventListener("DOMContentLoaded", () => {
    const allInteractiveElements = document.querySelectorAll('button, .btn, .project-link, .social-btn');

    allInteractiveElements.forEach(el => {
        el.addEventListener('click', () => vibrate());
    });

    /* script.js - Scroll Event Listener */

    // Selectors
    const sections = document.querySelectorAll('section');
    const desktopNavItems = document.querySelectorAll('.desktop-sidebar .sidebar-item');
    const mobileNavItems = document.querySelectorAll('.mobile-nav .nav-item'); // இதுதான் மிஸ் ஆகி இருந்தது!

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // ஸ்கிரீனின் சென்டர் பகுதியை தாண்டும்போது Active ஆக
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        /* --- 1. Desktop Sidebar Active Change --- */
        desktopNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });

        /* --- 2. Mobile Bottom Nav Active Change (New Logic Added) --- */
        mobileNavItems.forEach(item => {
            item.classList.remove('active');
            // Home section-க்கு மட்டும் சின்ன அட்ஜஸ்ட்மென்ட் (சில சமயம் scroll 0-ல இருக்கும்போது)
            if (current === '' && item.getAttribute('href') === '#home') {
                item.classList.add('active');
            }
            else if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
});

/* script.js - Last-la ithai serunga */

// Hide Swipe Hint on Scroll
const projectsGrid = document.querySelector('.projects-grid');
const swipeHint = document.querySelector('.mobile-swipe-hint');

if (projectsGrid && swipeHint) {
    projectsGrid.addEventListener('scroll', () => {
        // User konjam scroll pannale hint marainjudum
        if (projectsGrid.scrollLeft > 50) {
            swipeHint.style.transition = 'opacity 0.5s';
            swipeHint.style.opacity = '0';
            setTimeout(() => { swipeHint.style.display = 'none'; }, 500);
        }
    });
}

/* script.js - Contact Form AJAX Fix */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('successModal');

    // Form இருக்கானு செக் பண்ணிட்டு உள்ளே போறோம்
    if (contactForm) {

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        // பட்டன் டெக்ஸ்ட்டை பாதுகாத்து வைக்கிறோம் (Reset பண்ண தேவைப்படும்)
        const originalBtnContent = submitBtn.innerHTML;

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // 1. இதுதான் contact.php பேஜுக்கு போறதை தடுக்கும்!

            // 2. Button Loading State (Spinner காட்டுறது)
            // ஏற்கனவே CSS-ல .btn-spinner ஸ்டைல் இருக்குனு உறுதிப்படுத்திக்கோங்க
            submitBtn.disabled = true; // பட்டனை முடக்குதல்
            submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...`;
            submitBtn.style.opacity = "0.7";

            // 3. Data அனுப்புதல்
            const formData = new FormData(contactForm);

            fetch('contact.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json()) // PHP கிட்ட இருந்து JSON வரும்
                .then(data => {
                    if (data.status === 'success') {
                        // 4. வெற்றி! Modal காட்டு
                        showSuccessModal();
                        contactForm.reset(); // ஃபார்மை காலி பண்ணு
                    } else {
                        // PHP-ல ஏதோ எரர் (எ.கா: ஃபீல்ட் காலி)
                        alert('Error: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Something went wrong. Please try again.');
                })
                .finally(() => {
                    // 5. எல்லாம் முடிஞ்சதும் பட்டனை பழைய நிலைக்கு கொண்டு வா
                    submitBtn.innerHTML = originalBtnContent;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = "1";
                });
        });
    }

    // Modal Logic (தனி ஃபங்ஷன்)
    function showSuccessModal() {
        if (successModal) {
            successModal.classList.add('show');

            // Scroll to top smoothly while modal is visible
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // 3 செகண்ட்ல தானா மறைய
            setTimeout(() => {
                successModal.classList.remove('show');
            }, 3000);
        }
    }

    // Modal வெளிய கிளிக் பண்ணா மறைய
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('show');
            }
        });
    }
});

/* --- AI Chatbot Logic --- */
document.addEventListener("DOMContentLoaded", () => {
    const chatbotToggler = document.getElementById("chatbot-toggler");
    const closeBtn = document.getElementById("close-chat");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.getElementById("send-btn");

    let userMessage = null;
    const inputInitHeight = chatInput.scrollHeight;

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", `${className}`);
        let chatContent = className === "outgoing"
            ? `<p></p>`
            : `<span class="bot-icon"><i class="fa-solid fa-robot"></i></span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi;
    };

    const generateResponse = async (chatElement) => {
        const messageElement = chatElement.querySelector("p");

        try {
            const response = await fetch("chatbot.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });
            const data = await response.json();

            messageElement.textContent = data.reply;
        } catch (error) {
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        }
        chatbox.scrollTo(0, chatbox.scrollHeight);
    };

    const handleChat = () => {
        userMessage = chatInput.value.trim();
        if (!userMessage) return;

        // Clear input
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;

        // Append User Message
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        // Append "Thinking..." Message
        setTimeout(() => {
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 600);
    };

    chatInput.addEventListener("input", () => {
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);

    // Toggle Chat Window
    if (chatbotToggler) {
        chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
        closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
    }
});

/* ==============================================================
   CUSTOM INTERACTIVE CURSOR LOGIC
   ============================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
        // Track mouse movement
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows exactly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with a smooth delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect on specific interactive elements
        const interactables = document.querySelectorAll('a, button, .dock-item, .project-card, .split-card, .social-btn, .nav-item, input, textarea');

        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover-active');
                cursorDot.classList.add('hover-active'); // Expands the inner dot
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover-active');
                cursorDot.classList.remove('hover-active'); // Shrinks the inner dot back
            });
        });
    }
});

/* ==============================================================
   3D TILT EFFECT LOGIC (VanillaTilt)
   ============================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Check if VanillaTilt is loaded
    if (typeof VanillaTilt !== 'undefined') {

        // 1. Tilt effect for Skills Dock Items (High tilt, slight scale)
        VanillaTilt.init(document.querySelectorAll(".dock-item"), {
            max: 35,              // Maximum tilt rotation (degrees)
            speed: 400,           // Speed of the enter/exit transition
            glare: true,          // Adds a light glare effect
            "max-glare": 0.3,     // Maximum glare opacity (0 - 1)
            scale: 1.15           // Zooms in slightly on hover (replaces old CSS scale)
        });

        // 2. Tilt effect for Project Cards (Subtle tilt, very slight scale for premium feel)
        VanillaTilt.init(document.querySelectorAll(".split-card, .project-card"), {
            max: 10,              // Subtle tilt for larger cards
            speed: 400,
            glare: true,
            "max-glare": 0.15,
            scale: 1.02           // Very subtle pop-out effect
        });

    } else {
        console.warn("VanillaTilt library not found.");
    }
});

/* ==============================================================
   PREMIUM HERO: SPOTLIGHT & MAGNETIC BUTTONS LOGIC
   ============================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Spotlight Tracking
    const spotlight = document.querySelector('[data-spotlight]');
    const heroSection = document.querySelector('.premium-hero');

    if (spotlight && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            spotlight.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });
    }

    // 2. Magnetic Buttons Physics
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Apply 30% of the distance to create a realistic magnetic pull
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // Snap back to origin
            btn.style.transform = `translate(0px, 0px)`;
            btn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });

        btn.addEventListener('mouseenter', () => {
            // Remove transition during hover to lock onto cursor seamlessly
            btn.style.transition = 'none';
        });
    });
});

/* --- Tool Bottom Sheet Logic for Mobile --- */
function openBottomSheet(toolCard) {
    const sheet = document.getElementById('tool-bottom-sheet');
    const name = toolCard.getAttribute('data-name');
    const desc = toolCard.getAttribute('data-desc');
    const icon = toolCard.getAttribute('data-icon');
    const link = toolCard.getAttribute('data-link');

    const sheetIcon = document.getElementById('sheet-icon');
    const sheetName = document.getElementById('sheet-name');
    const sheetDesc = document.getElementById('sheet-desc');
    const sheetLink = document.getElementById('sheet-link');

    if (sheetName) sheetName.textContent = name;
    if (sheetDesc) sheetDesc.textContent = desc;
    if (sheetIcon) sheetIcon.className = `fa-solid ${icon}`;
    if (sheetLink) sheetLink.href = link;

    if (sheet) sheet.classList.add('active');
}

function closeBottomSheet() {
    const sheet = document.getElementById('tool-bottom-sheet');
    if (sheet) sheet.classList.remove('active');
}

// Global click handler for tool cards on mobile
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.tool-utility-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                // If not clicking the actual link (desktop view), open bottom sheet
                if (!e.target.closest('.tool-btn-link')) {
                    e.preventDefault();
                    openBottomSheet(card);
                }
            }
        });
    });
});

/* ==============================================================
   UNIQUE RESUME PREVIEW MODAL LOGIC (Glassmorphism + Scanner)
   ============================================================== */

function openResumePreview(pdfUrl) {
    const modal = document.getElementById('resume-preview-modal');
    const iframe = document.getElementById('resumeViewerAdvanced');
    const loader = document.getElementById('resume-loader');

    if (modal && iframe) {
        // Reset state
        iframe.style.opacity = '0';
        iframe.style.animation = 'none';
        if (loader) loader.style.display = 'flex';

        // Use a short delay before loading iframe to let modal animation play smoothly
        setTimeout(() => {
            iframe.src = pdfUrl + "#toolbar=0&navpanes=0&scrollbar=0"; // Hide PDF default toolbar for sleekness 

            // Re-trigger fade in animation
            setTimeout(() => {
                iframe.style.animation = 'fadeInPDF 1s ease forwards';
                if (loader) loader.style.display = 'none';
            }, 1500); // 1.5s fake scanning effect

        }, 400);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scrolling
    }
}

function closeResumePreview() {
    const modal = document.getElementById('resume-preview-modal');
    const iframe = document.getElementById('resumeViewerAdvanced');

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Unlock scrolling

        // Remove src after animation completes to stop background rendering
        setTimeout(() => {
            if (iframe) iframe.src = '';
        }, 500);
    }
}

// Close on outside click for the new modal
window.addEventListener('click', (e) => {
    const modal = document.getElementById('resume-preview-modal');
    if (e.target === modal) {
        closeResumePreview();
    }
});
