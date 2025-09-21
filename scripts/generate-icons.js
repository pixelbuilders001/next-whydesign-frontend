const fs = require('fs');
const path = require('path');

// Icon sizes needed for PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Generate SVG icons for each size
iconSizes.forEach(size => {
  const svgContent = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#d97706;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e11d48;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="url(#grad)"/>
  <text x="${size/2}" y="${size/2 + size*0.12}" font-family="Arial, sans-serif" font-size="${size*0.4}" font-weight="bold" text-anchor="middle" fill="white">W</text>
</svg>`;

  fs.writeFileSync(path.join(__dirname, '..', 'public', `icon-${size}x${size}.svg`), svgContent);
  console.log(`Generated icon-${size}x${size}.svg`);
});

console.log('\nTo convert SVG to PNG, you can use:');
console.log('1. Online converter like https://convertio.co/svg-png/');
console.log('2. ImageMagick: convert icon-192x192.svg icon-192x192.png');
console.log('3. Or use your existing logo.png and resize it to different sizes');