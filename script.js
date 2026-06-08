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

    // 2. Sticky Navbar & Mobile Nav Active State Fix
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

    // --- LEGO BLOCK: Mobile Nav Active State on Scroll ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item'); // Assuming .nav-item is used for mobile nav links

    if (sections.length > 0 && navItems.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            // Loop through sections to find which one is currently in view
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Add a small offset (e.g., 1/3 of the window height) so it switches when the section is clearly in view
                if ((window.scrollY || window.pageYOffset) >= (sectionTop - window.innerHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            // Remove active class from all nav items and add to the current one
            navItems.forEach(item => {
                const href = item.getAttribute('href');
                if (href) {
                    item.classList.remove('active');
                    if (href.includes(current)) {
                        item.classList.add('active');
                    }
                }
            });
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
   ADVANCED PORTFOLIO THEME WIDGET (Full UI Sync + Glassmorphism + 50 Colors)
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
            // Blues & Cyans
            { id: 'blue-1', p: '#2563eb', d: '#1e40af', a: '#60a5fa' },
            { id: 'blue-2', p: '#3b82f6', d: '#1d4ed8', a: '#93c5fd' },
            { id: 'cyan-1', p: '#06b6d4', d: '#0e7490', a: '#67e8f9' },
            { id: 'cyan-2', p: '#0891b2', d: '#155e75', a: '#22d3ee' },
            { id: 'sky-1', p: '#0ea5e9', d: '#0369a1', a: '#7dd3fc' },
            { id: 'indigo-1', p: '#4f46e5', d: '#3730a3', a: '#818cf8' },
            { id: 'indigo-2', p: '#6366f1', d: '#4338ca', a: '#a5b4fc' },
            { id: 'ocean', p: '#0284c7', d: '#075985', a: '#38bdf8' },
            { id: 'azure', p: '#007fff', d: '#0059b3', a: '#4da6ff' },
            { id: 'navy', p: '#000080', d: '#00004d', a: '#3333ff' },

            // Purples & Pinks
            { id: 'purple-1', p: '#7e22ce', d: '#5b21b6', a: '#a855f7' },
            { id: 'purple-2', p: '#9333ea', d: '#6b21a8', a: '#c084fc' },
            { id: 'fuchsia-1', p: '#c026d3', d: '#86198f', a: '#e879f9' },
            { id: 'fuchsia-2', p: '#d946ef', d: '#a21caf', a: '#f0abfc' },
            { id: 'pink-1', p: '#db2777', d: '#9d174d', a: '#f472b6' },
            { id: 'pink-2', p: '#ec4899', d: '#be185d', a: '#f9a8d4' },
            { id: 'rose-1', p: '#e11d48', d: '#9f1239', a: '#fb7185' },
            { id: 'magenta', p: '#ff00ff', d: '#b300b3', a: '#ff66ff' },
            { id: 'plum', p: '#dda0dd', d: '#800080', a: '#eeccee' },
            { id: 'lavender', p: '#8a2be2', d: '#4b0082', a: '#b366ff' },

            // Reds & Oranges
            { id: 'red-1', p: '#dc2626', d: '#991b1b', a: '#f87171' },
            { id: 'red-2', p: '#ef4444', d: '#b91c1c', a: '#fca5a5' },
            { id: 'orange-1', p: '#ea580c', d: '#9a3412', a: '#fb923c' },
            { id: 'orange-2', p: '#f97316', d: '#c2410c', a: '#fdba74' },
            { id: 'amber-1', p: '#d97706', d: '#92400e', a: '#fcd34d' },
            { id: 'amber-2', p: '#f59e0b', d: '#b45309', a: '#fde68a' },
            { id: 'coral', p: '#ff7f50', d: '#cc4400', a: '#ffb380' },
            { id: 'tomato', p: '#ff6347', d: '#b32400', a: '#ff9980' },
            { id: 'crimson', p: '#dc143c', d: '#8b0000', a: '#ff4d6a' },
            { id: 'firebrick', p: '#b22222', d: '#800000', a: '#e64d4d' },

            // Greens & Teals
            { id: 'emerald-1', p: '#059669', d: '#065f46', a: '#34d399' },
            { id: 'emerald-2', p: '#10b981', d: '#047857', a: '#6ee7b7' },
            { id: 'teal-1', p: '#0d9488', d: '#115e59', a: '#2dd4bf' },
            { id: 'teal-2', p: '#14b8a6', d: '#0f766e', a: '#5eead4' },
            { id: 'green-1', p: '#16a34a', d: '#14532d', a: '#4ade80' },
            { id: 'green-2', p: '#22c55e', d: '#166534', a: '#86efac' },
            { id: 'lime-1', p: '#65a30d', d: '#3f6212', a: '#a3e635' },
            { id: 'mint', p: '#3eb489', d: '#236b51', a: '#76d2b3' },
            { id: 'forest', p: '#228b22', d: '#006400', a: '#5cb85c' },
            { id: 'olive', p: '#6b8e23', d: '#556b2f', a: '#a2cd5a' },

            // Grays, Neutrals & Unique
            { id: 'slate', p: '#475569', d: '#1e293b', a: '#94a3b8' },
            { id: 'zinc', p: '#52525b', d: '#27272a', a: '#a1a1aa' },
            { id: 'stone', p: '#57534e', d: '#292524', a: '#a8a29e' },
            { id: 'brown', p: '#8b4513', d: '#5c3317', a: '#cd853f' },
            { id: 'gold', p: '#ffd700', d: '#b38f00', a: '#ffe666' },
            { id: 'yellow-1', p: '#eab308', d: '#a16207', a: '#fef08a' },
            { id: 'salmon', p: '#fa8072', d: '#c14e41', a: '#fcb3ab' },
            { id: 'maroon', p: '#800000', d: '#4d0000', a: '#b33333' },
            { id: 'black-gold', p: '#1a1a1a', d: '#000000', a: '#ffd700' },
            { id: 'cyber', p: '#00ffcc', d: '#008066', a: '#66ffdb' }
        ]
    };

    // 2. Inject Widget HTML (Glassmorphism & Scrollable 50 Colors Grid)
    const widgetHtml = `
        <style>
            .theme-btn-active {
                background-color: var(--primary) !important;
                color: white !important;
                border-color: var(--primary) !important;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                transform: translateY(-2px);
            }
            .color-btn-active {
                transform: scale(1.2) translateY(-2px);
                border: 2px solid white !important;
                box-shadow: 0 0 15px var(--primary), 0 0 30px var(--primary);
                z-index: 10;
            }
            /* Custom Scrollbar for Color Grid */
            .theme-color-grid::-webkit-scrollbar {
                width: 6px;
            }
            .theme-color-grid::-webkit-scrollbar-track {
                background: rgba(255,255,255,0.05);
                border-radius: 10px;
            }
            .theme-color-grid::-webkit-scrollbar-thumb {
                background: rgba(255,255,255,0.2);
                border-radius: 10px;
            }
            .theme-color-grid::-webkit-scrollbar-thumb:hover {
                background: rgba(255,255,255,0.4);
            }
            
            /* Fade IN/OUT Animation classes for JS */
            .modal-fade-in {
                opacity: 1 !important;
                visibility: visible !important;
            }
            .modal-fade-out {
                opacity: 0 !important;
                visibility: hidden !important;
            }
        </style>

        <div id="theme-trigger" class="theme-trigger-container" aria-label="Open Theme Customizer">
            <i class="fa-solid fa-palette fa-spin theme-trigger-icon" aria-hidden="true"></i>
        </div>


        <div id="theme-modal" class="modal-fade-out" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); z-index: 10000; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;">
            <div style="background: rgba(20, 20, 25, 0.85); border: 1px solid rgba(255,255,255,0.1); width: 90%; max-width: 480px; padding: 30px; border-radius: var(--radius-lg); box-shadow: 0 25px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.02); position: relative; max-height: 85vh; display: flex; flex-direction: column;">
                
                <span id="close-theme" style="position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer; color: #a1a1aa; transition: 0.3s;">&times;</span>
                
                <h3 style="text-align: center; margin-bottom: 25px; color: #fff; font-family: 'Poppins', sans-serif; font-weight: 600;">
                    <i class="fa-solid fa-wand-magic-sparkles" style="color: var(--primary); text-shadow: 0 0 10px var(--primary);"></i> Theme Customizer
                </h3>
                
                <div style="margin-bottom: 25px;">
                    <h4 style="font-size: 0.8rem; color: #a1a1aa; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">1. Interface Shape</h4>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        ${THEME_CONFIG.radius.map(r => `
                            <button id="shape-btn-${r.id}" onclick="setShape('${r.id}')" 
                                style="flex: 1; padding: 10px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #fff; border-radius: var(--radius-sm); cursor: pointer; font-size: 13px; transition: 0.3s;">
                                ${r.name}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; overflow: hidden; flex-grow: 1;">
                    <h4 style="font-size: 0.8rem; color: #a1a1aa; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">2. Accent Color (50 Options)</h4>
                    <div class="theme-color-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(38px, 1fr)); gap: 12px; padding: 5px 5px 15px 5px; overflow-y: auto; max-height: 250px;">
                        ${THEME_CONFIG.colors.map(c => `
                            <div id="color-btn-${c.id}" onclick="setColor('${c.id}')" title="${c.id}" 
                                style="height: 38px; background: ${c.p}; border-radius: 50%; cursor: pointer; border: 2px solid transparent; transition: 0.3s; box-shadow: inset 0 2px 4px rgba(255,255,255,0.2);">
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div style="margin-top: 20px; text-align: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05);">
                    <button onclick="randomizeTheme()" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 12px 30px; border-radius: var(--radius-pill); color: white; cursor: pointer; font-size: 14px; font-weight: 600; transition: 0.3s; width: 100%;">
                        <i class="fa-solid fa-dice" style="color: var(--primary);"></i> Surprise Me
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

    trigger.addEventListener('click', () => {
        modal.classList.remove('modal-fade-out');
        modal.classList.add('modal-fade-in');
    });
    
    close.addEventListener('click', () => {
        modal.classList.remove('modal-fade-in');
        modal.classList.add('modal-fade-out');
    });
    
    modal.addEventListener('click', (e) => { 
        if (e.target === modal) {
            modal.classList.remove('modal-fade-in');
            modal.classList.add('modal-fade-out');
        }
    });

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
            if ((window.scrollY || window.pageYOffset) >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        /* --- 1. Desktop Sidebar Active Change --- */
        desktopNavItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href) {
                item.classList.remove('active');
                if (href.includes(current)) {
                    item.classList.add('active');
                }
            }
        });

        /* --- 2. Mobile Bottom Nav Active Change (New Logic Added) --- */
        mobileNavItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href) {
                item.classList.remove('active');
                // Home section-க்கு மட்டும் சின்ன அட்ஜஸ்ட்மென்ட் (சில சமயம் scroll 0-ல இருக்கும்போது)
                if (current === '' && href === '#home') {
                    item.classList.add('active');
                }
                else if (href.includes(current)) {
                    item.classList.add('active');
                }
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


// --- LEGO BLOCK: Recruiter Fast-Track Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const fastTrackBtn = document.getElementById('fast-track-toggle');
    const body = document.body;

    if (fastTrackBtn) {
        fastTrackBtn.addEventListener('click', () => {
            body.classList.toggle('fast-track-mode');
            fastTrackBtn.classList.toggle('active');
            
            // Haptic feedback
            if (navigator.vibrate) navigator.vibrate(50);
            
            // Save preference
            const isActive = body.classList.contains('fast-track-mode');
            localStorage.setItem('fastTrackMode', isActive);
        });

        // Load preference
        if (localStorage.getItem('fastTrackMode') === 'true') {
            body.classList.add('fast-track-mode');
            fastTrackBtn.classList.add('active');
        }
    }
});

// --- LEGO BLOCK: GitHub Dynamic Activity ---
async function fetchGithubActivity() {
    const grid = document.getElementById('github-activity-grid');
    if (!grid) return;

    try {
        // Strict Fetch API use
        const response = await fetch('https://api.github.com/users/0xdevprabhu/events/public');
        const events = await response.json();
        
        // Create 50 squares for visualization
        for (let i = 0; i < 50; i++) {
            const square = document.createElement('div');
            square.className = 'gh-square';
            
            // Randomly activate some squares based on real event count (simulated density)
            if (events.length > 0 && Math.random() > 0.6) {
                square.classList.add(Math.random() > 0.8 ? 'high' : 'active');
            }
            
            grid.appendChild(square);
        }
    } catch (error) {
        console.error("GitHub API Error:", error);
        grid.innerHTML = "<p>Activity feed loading...</p>";
    }
}
fetchGithubActivity();  

// Wrap everything in DOMContentLoaded so elements exist before logic runs
document.addEventListener('DOMContentLoaded', () => {
    
    // --- LEGO BLOCK: Interactive Terminal Logic ---
    const termInput = document.getElementById('terminal-input');
    const termHistory = document.getElementById('terminal-history');
    const termContainer = document.getElementById('interactive-terminal');

    if (termInput && termHistory) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = termInput.value.trim().toLowerCase();
                if (val !== '') {
                    termHistory.innerHTML += `<div style="margin-top: 5px;"><span style="color:#50fa7b">></span> ${val}</div>`;
                    
                    if (val === 'help' || val === 'resume') {
                        termHistory.innerHTML += `<div style="color:#f1fa8c; margin-bottom: 10px;">[ System ] Fetching Resume... Opening Secure Viewer.</div>`;
                        if(typeof openResumePreview === 'function') {
                            openResumePreview('pdf/Prabhu\'s_Resume.pdf');
                        }
                    } else if (val === 'clear') {
                        termHistory.innerHTML = '';
                    } else if (val === 'sudo') {
                        termHistory.innerHTML += `<div style="color:#ff5555; margin-bottom: 10px;">Nice try! But you are not admin 😉</div>`;
                    } else {
                        termHistory.innerHTML += `<div style="color:#ffb86c; margin-bottom: 10px;">Command not found: '${val}'. Type 'help' to download CV.</div>`;
                    }
                }
                termInput.value = '';
                termContainer.scrollTop = termContainer.scrollHeight;
            }
        });
    }

    // --- LEGO BLOCK: Scroll-Triggered Tracker Dot ---
    const desktopTrack = document.querySelector('.roadmap-container');
    const desktopDot = document.querySelector('.desktop-dot');
    const mobileTrack = document.querySelector('.snake-roadmap');
    const mobileDot = document.querySelector('.mobile-dot');

    window.addEventListener('scroll', () => {
        const viewHeight = window.innerHeight;
        const middleScreen = viewHeight / 2;

        const updateDotPosition = (container, dot) => {
            if (container && dot) {
                const rect = container.getBoundingClientRect();
                if (rect.top < viewHeight && rect.bottom > 0) {
                    let progress = (middleScreen - rect.top) / rect.height;
                    progress = Math.max(0, Math.min(1, progress)); 
                    dot.style.top = `${progress * 100}%`;
                }
            }
        };

        updateDotPosition(desktopTrack, desktopDot);
        updateDotPosition(mobileTrack, mobileDot);
    });

    // --- LEGO BLOCK: Magnetic Dropzone & Fetch API Interaction ---
    const offerDropzone = document.getElementById('dropzone-area');
    const offerFileInput = document.getElementById('offer-file');
    const offerForm = document.getElementById('offer-form');
    const dropText = document.getElementById('drop-text');
    const offerMessage = document.getElementById('offer-form-message');
    
    if (offerDropzone) {
        // Magnetic Hover Physics
        offerDropzone.addEventListener('mousemove', (e) => {
            const rect = offerDropzone.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            offerDropzone.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
            offerDropzone.style.borderColor = '#10b981'; 
            offerDropzone.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.15)';
        });

        offerDropzone.addEventListener('mouseleave', () => {
            offerDropzone.style.transform = `translate(0px, 0px) scale(1)`;
            offerDropzone.style.borderColor = '#cbd5e1'; 
            offerDropzone.style.boxShadow = 'none';
            offerDropzone.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        offerDropzone.addEventListener('mouseenter', () => { offerDropzone.style.transition = 'none'; });

        // Missing Block: Drag, Drop, and Fetch API
        if (offerFileInput && offerForm) {
            offerDropzone.addEventListener('click', () => offerFileInput.click());

            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                offerDropzone.addEventListener(eventName, (e) => { e.preventDefault(); e.stopPropagation(); }, false);
            });
            ['dragenter', 'dragover'].forEach(eventName => {
                offerDropzone.addEventListener(eventName, () => offerDropzone.classList.add('dragover'), false);
            });
            ['dragleave', 'drop'].forEach(eventName => {
                offerDropzone.addEventListener(eventName, () => offerDropzone.classList.remove('dragover'), false);
            });

            offerDropzone.addEventListener('drop', (e) => handleFiles(e.dataTransfer.files));
            offerFileInput.addEventListener('change', function() { handleFiles(this.files); });

            function handleFiles(files) {
                if (files.length > 0) {
                    const file = files[0];
                    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                    
                    if(validTypes.includes(file.type)) {
                        offerFileInput.files = files;
                        dropText.innerHTML = `<span style="color:#10b981; font-weight:bold;">${file.name}</span> selected!`;
                    } else {
                        alert('Oops! PDF or Word format mattum thala allowed.');
                    }
                }
            }

            // Async Fetch Submission
            offerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                if(!offerFileInput.files.length) {
                    alert('Please attach the offer letter!');
                    return;
                }

                const submitBtn = document.getElementById('offer-submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
                submitBtn.disabled = true;

                const formData = new FormData(offerForm);
                formData.append('is_offer', 'yes'); // Tells PHP it's an offer letter

                try {
                    const response = await fetch('contact.php', { method: 'POST', body: formData });
                    const data = await response.json();
                    
                    offerMessage.style.display = 'block';
                    if(data.status === 'success') {
                        offerMessage.style.color = '#10b981';
                        offerMessage.innerHTML = "Offer Letter Sent! 🎉 I'll review it ASAP.";
                        offerForm.reset();
                        dropText.innerHTML = `Drag & Drop PDF/DOC here<br>or <span class="highlight">Browse File</span>`;
                    } else {
                        offerMessage.style.color = '#e11d48';
                        offerMessage.innerHTML = "Error: " + data.message;
                    }
                } catch (error) {
                    offerMessage.style.display = 'block';
                    offerMessage.style.color = '#e11d48';
                    offerMessage.innerHTML = "Server connection failed!";
                } finally {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    setTimeout(() => { offerMessage.style.display = 'none'; }, 5000);
                }
            });
        }
    }

    
});

// --- LEGO BLOCK: Multi-Stage Generative Neural Flow Processing ---
document.addEventListener("DOMContentLoaded", () => {
    const neuralLoaderElement = document.getElementById("neuralLoader");
    const statusTextElement = document.getElementById("manifestStatus");
    if (!neuralLoaderElement || !statusTextElement) return;

    const manifestLogsSteps = [
        "PARSING INFRASTRUCTURE",
        "CONNECTING DATA VECTOR NODES",
        "SYNCING AI MODEL INTELLIGENCE",
        "RENDERING PREMIUM GRAPHICS UI",
        "OPTIMIZATION COMPLETED"
    ];

    async function manageLoaderRuntimeCycle() {
        let currentStepIndex = 0;

        const logSwitcherInterval = setInterval(() => {
            if (currentStepIndex < manifestLogsSteps.length - 1) {
                currentStepIndex++;
                statusTextElement.textContent = manifestLogsSteps[currentStepIndex];
            }
        }, 450); // Fluid logging updates cycle timer parameter

        // Listen for complete global resource load status logic
        window.addEventListener("load", async () => {
            // Keep execution state uniform for visually appealing tracking metrics
            await new Promise(resolve => setTimeout(resolve, 1800));
            
            clearInterval(logSwitcherInterval);
            statusTextElement.textContent = manifestLogsSteps[manifestLogsSteps.length - 1];
            
            await new Promise(resolve => setTimeout(resolve, 400));
            neuralLoaderElement.classList.add("dismiss-canvas-active");
        });
    }

    manageLoaderRuntimeCycle();
});