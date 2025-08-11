
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.cyber-section').forEach(section => observer.observe(section));
    const cursor = document.querySelector('.custom-cursor');
    const enableCustomCursor = window.matchMedia && window.matchMedia('(hover:hover)').matches;
    if (enableCustomCursor && cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        const interactiveSel = 'a, button, .nav-link, .contact-link';
        document.addEventListener('pointermove', (e) => {
        const overInteractive = e.target.closest(interactiveSel);
        cursor.classList.toggle('triangle-cursor', !!overInteractive);
        });
    } else {
        if (cursor) cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
});