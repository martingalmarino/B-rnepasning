#!/usr/bin/env node

/**
 * Sitemap Generator
 * Automatically generates sitemap.xml for the website
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DOMAIN = 'https://www.bornepasning.com';
const SITEMAP_PATH = path.join(__dirname, 'sitemap.xml');

// Municipality data (same as in generate-pages.js)
const municipalities = [
    { name: 'København', slug: 'koebenhavn', priority: 0.9 },
    { name: 'Frederiksberg', slug: 'frederiksberg', priority: 0.9 },
    { name: 'Aarhus', slug: 'aarhus', priority: 0.9 },
    { name: 'Odense', slug: 'odense', priority: 0.9 },
    { name: 'Aalborg', slug: 'aalborg', priority: 0.9 },
    { name: 'Esbjerg', slug: 'esbjerg', priority: 0.8 },
    { name: 'Roskilde', slug: 'roskilde', priority: 0.8 },
    { name: 'Herning', slug: 'herning', priority: 0.8 },
    { name: 'Sønderborg', slug: 'soenderborg', priority: 0.8 },
    { name: 'Vejle', slug: 'vejle', priority: 0.8 },
    { name: 'Randers', slug: 'randers', priority: 0.8 },
    { name: 'Kolding', slug: 'kolding', priority: 0.8 },
    { name: 'Horsens', slug: 'horsens', priority: 0.8 },
    { name: 'Holstebro', slug: 'holstebro', priority: 0.7 },
    { name: 'Næstved', slug: 'naestved', priority: 0.7 },
    { name: 'Slagelse', slug: 'slagelse', priority: 0.7 },
    { name: 'Hjørring', slug: 'hjoerring', priority: 0.7 },
    { name: 'Favrskov', slug: 'favrskov', priority: 0.7 },
    { name: 'Viborg', slug: 'viborg', priority: 0.7 },
    { name: 'Gladsaxe', slug: 'gladsaxe', priority: 0.8 }
];

/**
 * Generate sitemap.xml content
 */
function generateSitemap() {
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Home Page -->
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

    // Add municipality pages
    municipalities.forEach(municipality => {
        sitemap += `  
  <url>
    <loc>${DOMAIN}/kommuner/${municipality.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${municipality.priority}</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    return sitemap;
}

/**
 * Main function
 */
function main() {
    try {
        console.log('🗺️  Generating sitemap.xml...');
        
        const sitemapContent = generateSitemap();
        
        fs.writeFileSync(SITEMAP_PATH, sitemapContent, 'utf8');
        
        console.log(`✅ Sitemap generated successfully!`);
        console.log(`📁 Location: ${SITEMAP_PATH}`);
        console.log(`🌐 Domain: ${DOMAIN}`);
        console.log(`📄 Total URLs: ${municipalities.length + 1} (1 home + ${municipalities.length} municipalities)`);
        
        // Show some statistics
        const topMunicipalities = municipalities
            .filter(m => m.priority >= 0.9)
            .map(m => m.name)
            .join(', ');
        
        console.log(`🏆 High priority municipalities: ${topMunicipalities}`);
        
    } catch (error) {
        console.error('❌ Error generating sitemap:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { generateSitemap, municipalities };
