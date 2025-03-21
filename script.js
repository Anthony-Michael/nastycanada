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
    console.log("DEBUG: Setting up image loading");
    const images = document.querySelectorAll('.product-image');
    console.log(`DEBUG: Found ${images.length} product images to process`);
    
    // We'll use this map for direct image assignments
    const imageMap = {
        "nastycanada t-shirt": "/images/products/tshirt.jpg",
        "nastycanada hoodie": "/images/products/hoodie.jpg", 
        "snapback hats": "/images/products/snapbackhat.jpg",
        "dad hats": "/images/products/dadhat.jpg",
        "iphone cases": "/images/products/phone-case.jpg"
    };
    
    // Debug direct image loading by trying to load each image directly
    console.log("DEBUG: Testing direct image loading");
    for (const [productName, imagePath] of Object.entries(imageMap)) {
        const testImg = new Image();
        testImg.onload = () => {
            console.log(`DEBUG: Direct load successful for ${imagePath}`);
        };
        testImg.onerror = () => {
            console.log(`DEBUG: Direct load FAILED for ${imagePath}`);
            
            // Try without leading slash
            const altPath = imagePath.substring(1);
            const altImg = new Image();
            altImg.onload = () => {
                console.log(`DEBUG: Alternative load successful for ${altPath}`);
            };
            altImg.onerror = () => {
                console.log(`DEBUG: Alternative load FAILED for ${altPath}`);
            };
            altImg.src = altPath;
        };
        testImg.src = imagePath;
    }
    
    images.forEach((img, index) => {
        console.log(`DEBUG: Processing image ${index + 1}`);
        
        // Get the product title from the card
        const card = img.closest('.product-card');
        const titleElement = card.querySelector('h3');
        
        if (!titleElement || !titleElement.textContent) {
            console.log(`DEBUG: No title found for image ${index + 1}`);
            return;
        }
        
        const cardTitle = titleElement.textContent.toLowerCase();
        console.log(`DEBUG: Card title for image ${index + 1}: "${cardTitle}"`);
        
        // Find the right image path for this product
        let imagePath = null;
        for (const [productName, path] of Object.entries(imageMap)) {
            if (cardTitle.includes(productName.toLowerCase())) {
                imagePath = path;
                break;
            }
        }
        
        // Default to t-shirt if no match found
        if (!imagePath) {
            imagePath = "/images/products/tshirt.jpg";
        }
        
        console.log(`DEBUG: Selected image path for ${cardTitle}: ${imagePath}`);
        
        // Try to load the image
        img.onerror = () => {
            console.log(`DEBUG: Image load error for: ${imagePath}`);
            
            // Try without leading slash
            const altPath = imagePath.substring(1);
            console.log(`DEBUG: Trying alternative path: ${altPath}`);
            img.src = altPath;
            
            // Handle error for the alternative path
            img.onerror = () => {
                console.error(`DEBUG: Failed to load image with both paths: ${imagePath} and ${altPath}`);
                
                // Show a placeholder as final fallback
                img.src = "https://placehold.co/400x450/red/white?text=Image+Not+Found";
                
                // Add error message to product card
                const errorMsg = document.createElement('div');
                errorMsg.className = 'image-error-message';
                errorMsg.textContent = 'Image not available';
                img.parentNode.appendChild(errorMsg);
            };
        };
        
        img.src = imagePath;
        console.log(`DEBUG: Set image src to: ${imagePath}`);
    });
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 