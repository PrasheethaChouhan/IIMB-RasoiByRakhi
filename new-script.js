// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.remove();
            }, 500);
        }, 800);
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            menu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active menu item
                document.querySelectorAll('.menu a').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Menu filtering
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (menuCategories.length > 0) {
        menuCategories.forEach(category => {
            category.addEventListener('click', function() {
                // Update active category
                menuCategories.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-category');
                
                // Filter menu items
                menuItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Testimonials slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.opacity = '1';
                testimonial.style.transform = 'translateX(0)';
            } else {
                testimonial.style.opacity = '0.5';
                testimonial.style.transform = 'translateX(20px)';
            }
        });
    }
    
    // Only initialize slider if there are multiple testimonials and on mobile
    if (testimonials.length > 1 && window.innerWidth < 768) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Specials slider
    const specialItems = document.querySelectorAll('.special-item');
    let currentSpecial = 0;
    
    function showSpecial(index) {
        specialItems.forEach((item, i) => {
            if (i === index) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            } else {
                item.style.opacity = '0.5';
                item.style.transform = 'translateX(20px)';
            }
        });
    }
    
    // Only initialize slider if there are multiple specials and on mobile
    if (specialItems.length > 1 && window.innerWidth < 768) {
        setInterval(() => {
            currentSpecial = (currentSpecial + 1) % specialItems.length;
            showSpecial(currentSpecial);
        }, 5000);
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Form is already configured to submit to formsubmit.co
            // No need to prevent default or add additional handling
            console.log("Form submitted");
        });
    }
    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ item
                item.classList.toggle('active');
            });
        });
    }
});
