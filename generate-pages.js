// Script to generate municipality pages from template
const fs = require('fs');
const path = require('path');

// Municipality data (first 5)
const municipalities = [
    {
        name: "København",
        slug: "koebenhavn",
        vuggestue: 3996,
        boernehave: 2317,
        sfo: 1800,
        madordning: 650,
        kilde: "https://www.kk.dk/borger/pasning-og-skole/priser-og-tilskud/priser-for-boernepasning"
    },
    {
        name: "Aarhus",
        slug: "aarhus",
        vuggestue: 3637,
        boernehave: 2288,
        sfo: 1600,
        madordning: 620,
        kilde: "https://aarhus.dk/borger/pasning-skole-og-uddannelse/pasning-0-6-aar/takster-tilskud-og-betaling/priser-og-betaling/hvad-koster-pasning-i-aarhus"
    },
    {
        name: "Odense",
        slug: "odense",
        vuggestue: 3500,
        boernehave: 2150,
        sfo: 1500,
        madordning: 600,
        kilde: "https://www.odense.dk/borger/familie-boern-og-unge/dagtilbud/takster-tilskud-og-betaling/takster-og-betaling"
    },
    {
        name: "Aalborg",
        slug: "aalborg",
        vuggestue: 3550,
        boernehave: 2250,
        sfo: 1550,
        madordning: 580,
        kilde: "https://www.aalborg.dk/mit-liv/mit-barn/boernepasning/priser-og-vilkaar-for-dagtilbud-og-dus"
    },
    {
        name: "Frederiksberg",
        slug: "frederiksberg",
        vuggestue: 3745,
        boernehave: 2034,
        sfo: 1750,
        madordning: 600,
        kilde: "https://www.frederiksberg.dk/dagtilbud-og-skole/priser-og-tilskud-til-boernepasning/priser-boernepasning"
    }
];

// Read template
const templatePath = path.join(__dirname, 'kommuner', 'template.html');
const template = fs.readFileSync(templatePath, 'utf8');

// Generate current year
const currentYear = new Date().getFullYear();

// Generate pages
municipalities.forEach(municipality => {
    let page = template
        .replace(/{{KOMMUNE_NAME}}/g, municipality.name)
        .replace(/{{YEAR}}/g, currentYear)
        .replace(/{{VUGGESTUE_PRICE}}/g, municipality.vuggestue.toLocaleString('da-DK'))
        .replace(/{{BOERNHAVE_PRICE}}/g, municipality.boernehave.toLocaleString('da-DK'))
        .replace(/{{SFO_PRICE}}/g, municipality.sfo.toLocaleString('da-DK'))
        .replace(/{{MADORDNING_PRICE}}/g, municipality.madordning.toLocaleString('da-DK'))
        .replace(/{{KILDE_URL}}/g, municipality.kilde)
        .replace(/{{VUGGESTUE_PRICE}}/g, municipality.vuggestue.toLocaleString('da-DK'))
        .replace(/{{BOERNHAVE_PRICE}}/g, municipality.boernehave.toLocaleString('da-DK'))
        .replace(/{{SFO_PRICE}}/g, municipality.sfo.toLocaleString('da-DK'))
        .replace(/{{MADORDNING_PRICE}}/g, municipality.madordning.toLocaleString('da-DK'));

    // Write page
    const outputPath = path.join(__dirname, 'kommuner', `${municipality.slug}.html`);
    fs.writeFileSync(outputPath, page, 'utf8');
    
    console.log(`Generated: ${municipality.slug}.html`);
});

console.log(`\n✅ Generated ${municipalities.length} municipality pages!`);
console.log('📁 Files created in /kommuner/ directory');
