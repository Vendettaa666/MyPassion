// Main JavaScript file for the website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animation library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: true,
            offset: 100
        });
    }

    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Interactive elements hover effects
    const addHoverEffect = (elements, className) => {
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add(className);
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove(className);
            });
        });
    };

    // Apply to interactive elements if they exist
    const interactiveElements = document.querySelectorAll('.interactive');
    if (interactiveElements.length > 0) {
        addHoverEffect(interactiveElements, 'hover-active');
    }

    // Dynamically add gradient text effect
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
        if (heading.classList.contains('auto-gradient') && !heading.classList.contains('gradient-text')) {
            heading.classList.add('gradient-text');
        }
    });

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Dark/Light mode toggle (for future implementation)
    const setupThemeToggle = () => {
        const themeToggle = document.querySelector('.theme-toggle');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('light-mode');
                
                // Save preference to localStorage
                const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
                localStorage.setItem('theme', currentTheme);
            });
            
            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                document.body.classList.add('light-mode');
            }
        }
    };
    
    setupThemeToggle();

    // Add subtle parallax effect to background images
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.2;
                element.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }

    // Initialize typed.js if available and element exists
    if (typeof Typed !== 'undefined') {
        const typedElement = document.querySelector('.typed-text');
        if (typedElement) {
            const strings = typedElement.dataset.strings.split(',');
            
            new Typed(typedElement, {
                strings: strings,
                typeSpeed: 50,
                backSpeed: 30,
                loop: true,
                backDelay: 2000
            });
        }
    }

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});