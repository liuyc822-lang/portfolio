// ========== Custom Cursor ==========
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot follows instantly
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
    // Smooth lag for outer circle
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover states
document.querySelectorAll('a, .gallery-item, .close-btn, .contact-info-box').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ========== Lenis Smooth Scroll ==========
function setupLenis() {
    if (typeof Lenis === 'undefined' || window.lenis) {
        return;
    }

    window.lenis = new Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        gestureOrientation: 'vertical',
        normalizeWheel: false,
        wheelMultiplier: 1
    });

    function raf(time) {
        if (window.lenis) {
            window.lenis.raf(time);
        }
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// Try to set up Lenis immediately
setupLenis();
// Also try on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLenis);
}
// And on window load
window.addEventListener('load', setupLenis);

gsap.registerPlugin(ScrollTrigger);

// ========== Hero Character Split & Reveal ==========
window.addEventListener('DOMContentLoaded', () => {
    // Only split the FIRST title line ("Jasmine's") into chars
    // Keep the second line ("Design") intact so #hero-slide can be animated
    const firstLine = document.querySelector('.hero-title-line:first-of-type');
    if (firstLine) splitTextToChars(firstLine);

    // Also split the text inside #hero-slide into chars but preserve the wrapper
    const heroSlide = document.getElementById('hero-slide');
    if (heroSlide) splitTextToChars(heroSlide);

    // Animate characters in with stagger
    const allChars = document.querySelectorAll('.hero-char');
    gsap.to(allChars, {
        y: 0, opacity: 1,
        duration: 1.8,
        stagger: 0.03,
        ease: "cubicBezier(0.19, 1, 0.22, 1)",
        delay: 0.3
    });

    // Hero meta fade in
    gsap.from(".hero-meta", { opacity: 0, duration: 1.5, delay: 1.2, ease: "cubicBezier(0.19, 1, 0.22, 1)" });

    // Nav fade in
    gsap.from("nav", { opacity: 0, y: -15, duration: 1.5, ease: "cubicBezier(0.19, 1, 0.22, 1)", delay: 1.0 });
});

function splitTextToChars(el) {
    const text = el.textContent;
    el.innerHTML = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.className = 'hero-char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        el.appendChild(span);
    });
}

// ========== [REST OF JAVASCRIPT FROM THE HTML FILE] =========
// NOTE: The rest of the script content should be copied here from the HTML file
