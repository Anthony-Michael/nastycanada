// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Select the buy button
    const buyButton = document.querySelector('.buy-button');
    
    if (buyButton) {
        // Enhanced hover effect
        buyButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 8px 20px rgba(239, 51, 64, 0.5)';
            this.style.backgroundColor = '#cc0000';
        });
        
        buyButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 12px rgba(239, 51, 64, 0.3)';
            this.style.backgroundColor = '';
        });
        
        // Add click event for the confirmation popup
        buyButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create popup element
            const popup = document.createElement('div');
            popup.className = 'redirect-popup';
            popup.textContent = 'Redirecting to Etsy...';
            
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
            
            // Redirect after delay
            setTimeout(() => {
                window.location.href = buyButton.href;
            }, 1500);
        });
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
        const elements = document.querySelectorAll('.product-section, .features-list, .price');
        
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
        
        .product-section, .features-list, .price {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Run once on page load
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
}); 