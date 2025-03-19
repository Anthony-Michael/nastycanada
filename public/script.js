// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Select the notify button
    const notifyButton = document.querySelector('.notify-button');
    const emailInput = document.querySelector('.newsletter-form input');
    
    if (notifyButton) {
        // Enhanced hover effect
        notifyButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px rgba(239, 51, 64, 0.4)';
        });
        
        notifyButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 10px rgba(239, 51, 64, 0.3)';
        });
        
        // Add click event for the newsletter signup
        notifyButton.addEventListener('click', function() {
            if (emailInput && emailInput.value.trim() !== '') {
                // Create popup element for success message
                const popup = document.createElement('div');
                popup.className = 'notification-popup';
                popup.textContent = 'Thanks! We\'ll notify you when our t-shirts are available.';
                
                // Style the popup
                popup.style.position = 'fixed';
                popup.style.top = '50%';
                popup.style.left = '50%';
                popup.style.transform = 'translate(-50%, -50%)';
                popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                popup.style.color = 'white';
                popup.style.padding = '20px 30px';
                popup.style.borderRadius = '8px';
                popup.style.zIndex = '1000';
                popup.style.fontWeight = 'bold';
                popup.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
                popup.style.opacity = '0';
                popup.style.transition = 'opacity 0.3s ease';
                
                // Add to body
                document.body.appendChild(popup);
                
                // Trigger animation
                setTimeout(() => {
                    popup.style.opacity = '1';
                }, 10);
                
                // Remove popup after delay
                setTimeout(() => {
                    popup.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(popup);
                    }, 300);
                }, 3000);
                
                // Clear the input
                emailInput.value = '';
            } else if (emailInput) {
                // Highlight input if empty
                emailInput.style.borderColor = 'var(--primary-red)';
                emailInput.style.backgroundColor = 'rgba(255, 0, 0, 0.05)';
                
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                    emailInput.style.backgroundColor = '';
                }, 1500);
            }
        });
        
        // Clear error styling when typing
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                this.style.borderColor = '';
                this.style.backgroundColor = '';
            });
        }
    }
    
    // Implement smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add some scroll animation for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-section, .features-list, .coming-soon');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.9) {
                element.classList.add('fadeIn');
            }
        });
    };
    
    // Add fade-in class with styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fadeIn {
            animation: fadeIn 0.6s ease forwards;
        }
        
        .product-section, .features-list, .coming-soon {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Run once on page load
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
}); 