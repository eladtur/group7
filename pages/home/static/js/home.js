
document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about, .team h2, .ceo').forEach(element => {
        fadeInObserver.observe(element);
    });
});
