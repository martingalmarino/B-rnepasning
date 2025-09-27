// Script to generate municipality pages from template
const fs = require('fs');
const path = require('path');

// Municipality data (all 20)
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
        name: "Frederiksberg",
        slug: "frederiksberg",
        vuggestue: 3745,
        boernehave: 2034,
        sfo: 1750,
        madordning: 600,
        kilde: "https://www.frederiksberg.dk/dagtilbud-og-skole/priser-og-tilskud-til-boernepasning/priser-boernepasning"
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
        name: "Esbjerg",
        slug: "esbjerg",
        vuggestue: 3480,
        boernehave: 2180,
        sfo: 1500,
        madordning: 580,
        kilde: "https://boernepasning.esbjerg.dk/praktisk-information/priser-og-tilskud"
    },
    {
        name: "Roskilde",
        slug: "roskilde",
        vuggestue: 4022,
        boernehave: 2600,
        sfo: 1800,
        madordning: 590,
        kilde: "https://www.roskilde.dk/da-dk/service-og-selvbetjening/borger/familie-og-born/dagtilbud/hvad-koster-en-plads-i-dagtilbud-sfo-eller-klub/"
    },
    {
        name: "Herning",
        slug: "herning",
        vuggestue: 3852,
        boernehave: 2300,
        sfo: 1600,
        madordning: 570,
        kilde: "https://www.herning.dk/borger/boern-og-unge/boernepasning/takster-for-boernepasning-2025"
    },
    {
        name: "Sønderborg",
        slug: "soenderborg",
        vuggestue: 3260,
        boernehave: 2100,
        sfo: 1480,
        madordning: 540,
        kilde: "https://sonderborgkommune.dk/priser-pasning"
    },
    {
        name: "Vejle",
        slug: "vejle",
        vuggestue: 3450,
        boernehave: 2180,
        sfo: 1500,
        madordning: 560,
        kilde: "https://www.vejle.dk/da/service-og-selvbetjening/borger/boern-skole-og-familie/boernepasning-0-6-aar/priser-og-tilskud-til-boernepasning/"
    },
    {
        name: "Randers",
        slug: "randers",
        vuggestue: 3400,
        boernehave: 2150,
        sfo: 1500,
        madordning: 570,
        kilde: "https://www.randers.dk/borger/boern-unge-og-familie/dagtilbud-og-pasning/takster-tilskud-og-oekonomisk-friplads/takster/"
    },
    {
        name: "Kolding",
        slug: "kolding",
        vuggestue: 3450,
        boernehave: 2200,
        sfo: 1500,
        madordning: 570,
        kilde: "https://www.kolding.dk/om-kommunen/oekonomi/takster/takster-for-dagtilbud"
    },
    {
        name: "Horsens",
        slug: "horsens",
        vuggestue: 3480,
        boernehave: 2200,
        sfo: 1500,
        madordning: 560,
        kilde: "https://horsens.dk/familie/oekonomiogstoette/taksterdagtilbudogsfo"
    },
    {
        name: "Holstebro",
        slug: "holstebro",
        vuggestue: 3400,
        boernehave: 2100,
        sfo: 1480,
        madordning: 550,
        kilde: "https://www.holstebro.dk/priser-og-tilskud-til-boernepasning"
    },
    {
        name: "Næstved",
        slug: "naestved",
        vuggestue: 3450,
        boernehave: 2150,
        sfo: 1500,
        madordning: 560,
        kilde: "https://www.naestved.dk/boern/dagtilbud/betaling-og-tilskud"
    },
    {
        name: "Slagelse",
        slug: "slagelse",
        vuggestue: 3450,
        boernehave: 2200,
        sfo: 1500,
        madordning: 560,
        kilde: "https://www.slagelse.dk/da/service-og-selvbetjening/dagtilbud-og-skole/dagtilbud-0-6-aar/priser-og-tilskud-til-boernepasning/"
    },
    {
        name: "Hjørring",
        slug: "hjoerring",
        vuggestue: 3400,
        boernehave: 2100,
        sfo: 1450,
        madordning: 540,
        kilde: "https://hjoerring.dk/borger/boern-unge-og-familie/pasningsmuligheder/kommunale-dagtilbud-0-6-aar/priser"
    },
    {
        name: "Favrskov",
        slug: "favrskov",
        vuggestue: 3226,
        boernehave: 2080,
        sfo: 1450,
        madordning: 540,
        kilde: "https://favrskov.dk/takster/takster-boern-og-skole-omraadet"
    },
    {
        name: "Viborg",
        slug: "viborg",
        vuggestue: 3380,
        boernehave: 2150,
        sfo: 1500,
        madordning: 540,
        kilde: "https://viborg.dk/borger/boern-unge-og-familie/boernepasning-0-6-aar/priser-for-dagtilbud/"
    },
    {
        name: "Gladsaxe",
        slug: "gladsaxe",
        vuggestue: 3600,
        boernehave: 2200,
        sfo: 1550,
        madordning: 560,
        kilde: "https://gladsaxe.dk/borger/boern-og-familie/boern-og-oekonomi/institutionstakster"
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
        .replace(/{{KOMMUNE_SLUG}}/g, municipality.slug)
        .replace(/{{YEAR}}/g, currentYear)
        .replace(/{{VUGGESTUE_PRICE}}/g, municipality.vuggestue.toLocaleString('da-DK'))
        .replace(/{{BOERNEHAVE_PRICE}}/g, municipality.boernehave.toLocaleString('da-DK'))
        .replace(/{{SFO_PRICE}}/g, municipality.sfo.toLocaleString('da-DK'))
        .replace(/{{MADORDNING_PRICE}}/g, municipality.madordning.toLocaleString('da-DK'))
        .replace(/{{KILDE_URL}}/g, municipality.kilde)
        .replace(/{{CURRENT_YEAR}}/g, currentYear);

    // Write page
    const outputPath = path.join(__dirname, 'kommuner', `${municipality.slug}.html`);
    fs.writeFileSync(outputPath, page, 'utf8');
    
    console.log(`Generated: ${municipality.slug}.html`);
});

console.log(`\n✅ Generated all ${municipalities.length} municipality pages!`);
console.log('📁 Files created in /kommuner/ directory');
console.log('🌐 All pages now use the new title format: "Børnepasning i [Kommune] 2025 – priser og beregner"');
