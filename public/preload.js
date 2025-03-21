// NastyCanada Image Preload Script
(function() {
    // List of critical images to preload
    const imagesToPreload = [
        '/images/products/tshirt.jpg',
        '/images/products/hoodie.jpg',
        '/images/products/snapbackhat.jpg',
        '/images/products/dadhat.jpg',
        '/images/products/phone-case.jpg',
        '/images/products/collection-banner.jpg'
    ];
    
    // Function to preload an image
    function preloadImage(url) {
        return new Promise((resolve, reject) => {
            console.log('Preloading image:', url);
            const img = new Image();
            img.onload = () => {
                console.log('Successfully preloaded:', url);
                resolve(url);
            };
            img.onerror = () => {
                console.log('Failed to preload:', url);
                // Try alternative path without leading slash
                const altUrl = url.startsWith('/') ? url.substring(1) : url;
                console.log('Trying alternative path:', altUrl);
                const altImg = new Image();
                altImg.onload = () => {
                    console.log('Alternative path successful:', altUrl);
                    resolve(altUrl);
                };
                altImg.onerror = () => {
                    console.error('All paths failed for:', url);
                    reject(url);
                };
                altImg.src = altUrl;
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
                    console.log('Stored in sessionStorage:', imagesToPreload[index], '=>', result.value);
                }
            });
        });
})(); 