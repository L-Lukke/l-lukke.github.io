
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
    // Intersection Observer for scroll-reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.cyber-section').forEach(section => observer.observe(section));
    // Custom Crosshair Cursor
    const cursor = document.querySelector('.custom-cursor');
    const enableCustomCursor = window.matchMedia && window.matchMedia('(hover:hover)').matches;
    if (enableCustomCursor && cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        // Swap to triangle on interactive hover
        document.querySelectorAll('a, button, .nav-link, .contact-link').forEach(element => {
            element.addEventListener('mouseenter', () => cursor.classList.add('triangle-cursor'));
            element.addEventListener('mouseleave', () => cursor.classList.remove('triangle-cursor'));
        });
    } else {
        // Fallback: show normal cursor
        if (cursor) cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
});