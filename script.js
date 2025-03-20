// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Generate product cards from configuration
    generateProductCards();
    
    // Product hover effects
    setupProductHoverEffects();
    
    // Implement smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Form submission handler
    setupEmailForm();
    
    // Add a simple sticky navigation on scroll
    setupStickyNavigation();
    
    // Add animated reveal effect for sections as user scrolls
    setupScrollAnimations();
    
    // Handle product image loading
    setupImageLoading();
    
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

// Generate product cards from the configuration
function generateProductCards() {
    const productContainer = document.getElementById('product-container');
    const template = document.getElementById('product-card-template');
    
    if (!productContainer || !template || !nastyProducts) return;
    
    // Clear any existing products
    productContainer.innerHTML = '';
    
    // Generate a card for each product in the configuration
    Object.values(nastyProducts).forEach(product => {
        const clone = template.content.cloneNode(true);
        
        // Set the product image with fallback
        const img = clone.querySelector('.product-image');
        img.src = product.placeholder;
        img.setAttribute('data-src', product.image);
        img.alt = product.name;
        
        // Set the product name and description
        clone.querySelector('h3').textContent = product.name;
        clone.querySelector('p').textContent = product.description;
        
        // Set the Etsy link
        clone.querySelector('.product-button').href = product.etsyLink;
        
        // Add the card to the container
        productContainer.appendChild(clone);
    });
}

// Setup product hover effects
function setupProductHoverEffects() {
    // This will be called after the products are generated
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.product-image');
            if (image) image.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.product-image');
            if (image) image.style.transform = 'scale(1)';
        });
    });
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup email form submission
function setupEmailForm() {
    const emailForm = document.querySelector('.email-form');
    
    if (emailForm) {
        emailForm.addEventListener('submit', event => {
            event.preventDefault();
            
            const emailInput = emailForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Create popup element for success message
                const popup = document.createElement('div');
                popup.className = 'notification-popup';
                popup.textContent = 'Thanks for subscribing! We\'ll keep you updated on our latest products.';
                
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
            } else {
                // Highlight input if invalid
                emailInput.style.borderColor = 'var(--primary-red)';
                emailInput.style.backgroundColor = 'rgba(255, 0, 0, 0.05)';
                
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                    emailInput.style.backgroundColor = '';
                }, 1500);
            }
        });
        
        // Clear error styling when typing
        const emailInput = emailForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                this.style.borderColor = '';
                this.style.backgroundColor = '';
            });
        }
    }
}

// Setup sticky navigation
function setupStickyNavigation() {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    
    if (navbar && hero) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-sticky');
            } else {
                navbar.classList.remove('navbar-sticky');
            }
        });
    }
}

// Setup scroll animations
function setupScrollAnimations() {
    const revealElements = document.querySelectorAll('.featured-products, .about-section, .signup-section, .faq-section, .upload-info-section');
    
    const revealElementsOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Add CSS class for the animation
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.8s ease';
    });
    
    // Add the revealed class to trigger animation
    window.addEventListener('scroll', revealElementsOnScroll);
    
    // Initial check in case elements are already in view
    revealElementsOnScroll();
}

// Handle product image loading
function setupImageLoading() {
    // This will be called after a short delay to ensure all product cards are generated
    setTimeout(() => {
        const productImages = document.querySelectorAll('.product-image');
        
        productImages.forEach(img => {
            // Check if there's a data-src attribute (for real product images)
            if (img.getAttribute('data-src')) {
                const realImagePath = img.getAttribute('data-src');
                const fallbackSrc = img.src;
                const productName = img.alt;
                
                // First check if this image was preloaded successfully in sessionStorage
                const preloadedPath = sessionStorage.getItem(realImagePath);
                if (preloadedPath) {
                    // Use the successful path from preloading
                    img.src = preloadedPath;
                    console.log('Using preloaded image: ' + preloadedPath);
                    return;
                }
                
                // Create a test image to check if the real image exists
                const testImage = new Image();
                
                // Set a timeout to handle very slow loading images
                const imageTimeout = setTimeout(() => {
                    console.log('Image load timeout for: ' + realImagePath);
                    // Keep the fallback/placeholder if loading takes too long
                    testImage.src = ''; // Cancel the image loading
                }, 5000); // 5 second timeout
                
                testImage.onload = function() {
                    clearTimeout(imageTimeout);
                    img.src = realImagePath;
                    console.log('Successfully loaded image: ' + realImagePath);
                };
                
                testImage.onerror = function() {
                    clearTimeout(imageTimeout);
                    console.log('Product image failed to load, using placeholder: ' + realImagePath);
                    
                    // Try to load from root /public directory as a fallback
                    const rootImagePath = '/' + realImagePath;
                    const secondTestImage = new Image();
                    
                    secondTestImage.onload = function() {
                        img.src = rootImagePath;
                        console.log('Loaded image from root path: ' + rootImagePath);
                    };
                    
                    secondTestImage.onerror = function() {
                        // Keep the fallback/placeholder if both paths fail
                        console.log('Both paths failed for: ' + productName);
                        
                        // Add an error indicator to inform the user
                        const card = img.closest('.product-card');
                        if (card) {
                            const errorMsg = document.createElement('div');
                            errorMsg.className = 'image-error-msg';
                            errorMsg.innerHTML = 'Image temporarily unavailable';
                            errorMsg.style.position = 'absolute';
                            errorMsg.style.top = '10px';
                            errorMsg.style.right = '10px';
                            errorMsg.style.background = 'rgba(0,0,0,0.6)';
                            errorMsg.style.color = 'white';
                            errorMsg.style.padding = '5px 10px';
                            errorMsg.style.borderRadius = '4px';
                            errorMsg.style.fontSize = '12px';
                            card.style.position = 'relative';
                            card.appendChild(errorMsg);
                            
                            // Remove the error message after 5 seconds
                            setTimeout(() => {
                                errorMsg.remove();
                            }, 5000);
                        }
                    };
                    
                    secondTestImage.src = rootImagePath;
                };
                
                // Start loading the image
                testImage.src = realImagePath;
            }
        });
    }, 100);
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 