# Southern Haulers Image Manifest

## Copyright-Free Images for Landing Page

All images sourced from Unsplash and Pexels (free for commercial use with no attribution required).

### Hero Section

**Primary Hero Image**: Container Port with Cranes
- URL: `https://plus.unsplash.com/premium_photo-1661963131307-f79ad259ccfc`
- Dimensions: 3000x1999
- Source: Unsplash
- Usage: Main hero background image showing container operations

**Secondary Hero Image**: Logistics Container Loading
- URL: `https://plus.unsplash.com/premium_photo-1661932036915-4fd90bec6e8a`
- Dimensions: 3000x2000
- Source: Unsplash
- Usage: Hero split section or carousel slide

### Container Drayage Services

**Image 1**: Shipping Containers at Port
- URL: `https://images.unsplash.com/photo-1678182451047-196f22a4143e`
- Dimensions: 3000x1999
- Source: Unsplash

**Image 2**: Container Port Operations
- URL: `https://images.unsplash.com/photo-1601897690942-bcacbad33e55`
- Dimensions: 3000x1987
- Source: Unsplash

### Trucking/Transportation Services

**Image 1**: Red Semi Truck on Road
- URL: `https://images.pexels.com/photos/6563903/pexels-photo-6563903.jpeg`
- Dimensions: 5021x3085
- Source: Pexels

**Image 2**: Cargo Truck Near Building
- URL: `https://images.pexels.com/photos/18034869/pexels-photo-18034869.png`
- Dimensions: 5184x2812
- Source: Pexels

### Warehousing Services

**Image 1**: Modern Warehouse Logistics
- URL: `https://plus.unsplash.com/premium_photo-1681426728047-2164a00fe3dc`
- Dimensions: 3000x1688
- Source: Unsplash

**Image 2**: Warehouse Inventory Management
- URL: `https://plus.unsplash.com/premium_photo-1681426710520-7c56c9f563d2`
- Dimensions: 3000x1688
- Source: Unsplash

### Agricultural Hauling

**Image 1**: Soybean Harvesting with Truck
- URL: `https://images.pexels.com/photos/31226932/pexels-photo-31226932.jpeg`
- Dimensions: 5760x3840
- Source: Pexels

**Image 2**: Farm Harvest Operations
- URL: `https://images.pexels.com/photos/6680149/pexels-photo-6680149.jpeg`
- Dimensions: Various
- Source: Pexels

### Port Terminal Images

**Image 1**: Harbor Cranes and Operations
- URL: `https://images.pexels.com/photos/51325/industry-sunset-port-facility-mood-51325.jpeg`
- Dimensions: 4928x3264
- Source: Pexels

## Image Optimization Guidelines

### Next.js Image Component Usage

All images should be used with the Next.js Image component for automatic optimization:

```typescript
import Image from 'next/image';

<Image
  src="/images/hero/container-port.jpg"
  alt="Southern Haulers container drayage operations"
  width={3000}
  height={1999}
  priority={true} // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // Add blur placeholder
  className="object-cover"
/>
```

### Image Sizes Needed

For optimal performance, create the following versions of each image:

1. **Hero Images**: 
   - Desktop: 1920x1080
   - Tablet: 1024x768
   - Mobile: 640x427

2. **Service Images**:
   - Desktop: 1200x800
   - Tablet: 768x512
   - Mobile: 480x320

3. **Icon/Feature Images**:
   - 400x400 (square format)

### WebP Conversion

Convert all JPGs to WebP format for better compression:

```bash
# Using cwebp tool
cwebp -q 80 input.jpg -o output.webp
```

### Blur Placeholders

Generate blur placeholders using Next.js:

```bash
npm install plaiceholder
```

Then generate placeholders in your build process.

## Download Instructions

To download and prepare images for the project:

```bash
# Create image directories
mkdir -p apps/web/public/images/{hero,services,ports,locations,warehouse,agricultural}

# Download images using curl or wget
# Example:
curl -o apps/web/public/images/hero/container-port.jpg \
  "https://plus.unsplash.com/premium_photo-1661963131307-f79ad259ccfc?w=1920"

# Convert to WebP
cwebp -q 80 apps/web/public/images/hero/container-port.jpg \
  -o apps/web/public/images/hero/container-port.webp
```

## Attribution (Optional)

While not required, we can optionally credit photographers:

- **Container Port Images**: Unsplash contributors
- **Truck Images**: Pexels contributors
- **Warehouse Images**: Unsplash contributors
- **Agricultural Images**: Pexels contributors

## License

All images are from:
- **Unsplash**: Free to use under the Unsplash License (https://unsplash.com/license)
- **Pexels**: Free to use under the Pexels License (https://www.pexels.com/license/)

Both licenses allow:
- ✅ Commercial use
- ✅ No attribution required
- ✅ Modification and distribution
- ❌ Selling unmodified images
- ❌ Compiling images into a stock photo service

---

*Last Updated: October 28, 2025*
*Maintained By: Southern Haulers Development Team*
