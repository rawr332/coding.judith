document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('blueprint-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const actionButtons = document.querySelectorAll('.action-btn');
    const progressBarFill = document.querySelector('.progress-fill');

    // 1. Smooth Scrolling for Navigation and Action Buttons
    const smoothScroll = (targetId) => {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
            // Remove active from all, add to clicked
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    actionButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('data-target'));
        });
    });

    // Set initial active link
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }

    // 2. Dynamic Header Shadow on Scroll
    const handleHeaderShadow = () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.5)';
        } else {
            header.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.3)';
        }
    };

    window.addEventListener('scroll', handleHeaderShadow);

    // 3. Trigger Progress Bar Animation when in view
    const progressBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBarFill.style.animationPlayState = 'running';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the bar is visible

    if (progressBarFill) {
        // Initially pause animation if it's defined in CSS
        progressBarFill.style.animationPlayState = 'paused'; 
        progressBarObserver.observe(progressBarFill);
    }
});