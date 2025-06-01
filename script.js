// Main script file for the website root

// Redirect to js/main.js functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animation library if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: true
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

    // Add active class to current nav item
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Dynamic hero text animation for homepage
    const heroText = document.querySelector('.hero h1');
    if (heroText) {
        const text = heroText.innerHTML;
        const words = text.split(' ');
        
        if (words.length > 2) {
            const lastWord = words[words.length - 1];
            
            // Check if the last word is already wrapped
            if (!lastWord.includes('<span')) {
                words[words.length - 1] = `<span class="gradient-text">${lastWord}</span>`;
                heroText.innerHTML = words.join(' ');
            }
        }
    }

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }
});

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Add noise overlay
    if (!document.querySelector('.noise-overlay')) {
        const noiseOverlay = document.createElement('div');
        noiseOverlay.classList.add('noise-overlay');
        document.body.prepend(noiseOverlay);
    }
    
    // Parallax effect on images
    const parallaxElements = document.querySelectorAll('.image-frame, .category-image, .gallery-item, .motorcycle-image, .drift-car-image');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = 0.05;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Image hover animations
    const hoverImages = document.querySelectorAll('.category-image img, .gallery-item img, .motorcycle-image img, .drift-car-image img');
    
    hoverImages.forEach(img => {
        const parent = img.closest('.category-card') || img.closest('.gallery-item') || img.closest('.motorcycle-card') || img.closest('.drift-card');
        
        if (parent) {
            parent.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
                img.style.filter = 'grayscale(0%)';
            });
            
            parent.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
                img.style.filter = 'grayscale(0%)';
            });
        }
    });
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: true,
            offset: 50
        });
    }
    
    // Add subtle text shadow to headings
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
        heading.style.textShadow = '0 0 1px rgba(255, 255, 255, 0.1)';
    });
});

// Gallery tab functionality for Cars page
if (document.querySelector('.gallery-tab')) {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryContents = document.querySelectorAll('.gallery-content');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            galleryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all content sections
            galleryContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the selected content
            const target = tab.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
}

// Car modal functionality for Cars page
if (document.querySelector('.gallery-item')) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const carModals = document.querySelectorAll('.car-modal');
    const closeButtons = document.querySelectorAll('.car-modal-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const carId = item.getAttribute('data-car');
            const modal = document.getElementById(`${carId}-modal`);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        carModals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    carModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}
