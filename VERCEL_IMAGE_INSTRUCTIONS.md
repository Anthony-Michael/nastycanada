# NastyCanada Image Deployment Guide for Vercel

This guide will help you properly deploy your NastyCanada product images to Vercel.

## Image File Requirements

1. Place your product images in the `/public/images/products/` folder
2. Use the exact filenames that match our configuration:
   - `tshirt.jpg` - For the NastyCanada t-shirt
   - `hoodie.jpg` - For the NastyCanada hoodie
   - `snapbackhat.jpg` - For the snapback hat
   - `dadhat.jpg` - For the dad hat
   - `phone-case.jpg` - For the iPhone case
   - `collection-banner.jpg` - For the email signup background

## Image File Specifications

- Use JPEG format for best performance
- Recommended size: 800 × 900 pixels for product images
- Compress your images before uploading (use a tool like [TinyJPG](https://tinyjpg.com/))
- Make sure images are well-lit with a clean background
- Keep file sizes under 300KB for best performance

## Deploying to Vercel

### Method 1: Using the Vercel Dashboard

1. Log in to your [Vercel dashboard](https://vercel.com/dashboard)
2. Navigate to your NastyCanada project
3. Go to the "Settings" tab
4. Scroll down to "Build & Development Settings"
5. Click "Override" next to "Output Directory" and enter `public`
6. Save your changes
7. Redeploy your project

### Method 2: Using the Vercel CLI

1. Install the Vercel CLI: `npm install -g vercel`
2. Login to Vercel: `vercel login`
3. Navigate to your project directory
4. Run a manual deployment: `vercel --prod`

### Method 3: Manual File Upload (Easiest)

If you're having trouble with the automated deployment:

1. Go to your [Vercel dashboard](https://vercel.com/dashboard)
2. Navigate to your NastyCanada project
3. Click on "Deployments" in the left sidebar
4. Select your latest deployment
5. Look for the "Functions" tab and click it
6. Click "Browser" or "View Source" to navigate through your deployed files
7. Manually upload the image files to the correct paths:
   - e.g., `.vercel/output/static/images/products/tshirt.jpg`

## Troubleshooting

If images still don't appear after deploying:

1. **Check Browser Console**: Open your site, right-click, choose "Inspect" and check the Console tab for image loading errors
2. **Clear Cache**: Try opening your site in an incognito/private browser window or clearing your browser cache
3. **Check Image Paths**: Ensure the paths in `products-config.js` match exactly with your file names
4. **Recheck Case Sensitivity**: Make sure file extensions are lowercase (.jpg not .JPG)
5. **Force Redeploy**: In the Vercel dashboard, go to your project and click the "Redeploy" button
6. **Contact Support**: If all else fails, contact Vercel support with your deployment ID

## Using the Admin Interface

The admin interface at `https://nastycanada.com/admin.html` allows you to:

1. Update product details and Etsy links
2. Export your configuration for manual updating
3. Test that images are loading correctly 

Remember: After making changes via the admin interface, you'll need to manually update the `products-config.js` file with the exported configuration code. 