// NastyCanada Image Preload Script
(function() {
    // List of critical images to preload
    const imagesToPreload = [
        'images/products/tshirt.jpg',
        'images/products/hoodie.jpg',
        'images/products/snapbackhat.jpg',
        'images/products/dadhat.jpg',
        'images/products/phone-case.jpg',
        'images/products/collection-banner.jpg'
    ];
    
    // Function to preload an image
    function preloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => {
                console.log('Failed to preload:', url);
                // Try alternative path from root
                const rootUrl = '/' + url;
                const rootImg = new Image();
                rootImg.onload = () => resolve(rootUrl);
                rootImg.onerror = () => reject(url);
                rootImg.src = rootUrl;
            };
            img.src = url;
        });
    }
    
    // Add some debugging to help with troubleshooting
    console.log('NastyCanada: Starting image preloading...');
    
    // Preload all images
    Promise.allSettled(imagesToPreload.map(preloadImage))
        .then(results => {
            const succeeded = results.filter(r => r.status === 'fulfilled').length;
            console.log(`NastyCanada: Preloaded ${succeeded}/${imagesToPreload.length} images`);
            
            // Store the successfully loaded paths in sessionStorage
            results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    sessionStorage.setItem(imagesToPreload[index], result.value);
                }
            });
        });
})(); 