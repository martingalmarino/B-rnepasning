// Municipality data embedded directly in JavaScript
// This eliminates the need for external JSON file loading and CORS issues

const MUNICIPALITY_DATA = [
  {
    "kommune": "København",
    "vuggestue": 3996,
    "boernehave": 2317,
    "sfo": 1800,
    "madordning": 650,
    "lat": 55.6758,
    "lng": 12.5683,
    "kilde": "https://www.kk.dk/borger/pasning-og-skole/priser-og-tilskud/priser-for-boernepasning"
  },
  {
    "kommune": "Frederiksberg",
    "vuggestue": 3745,
    "boernehave": 2034,
    "sfo": 1750,
    "madordning": 600,
    "lat": 55.6774,
    "lng": 12.5238,
    "kilde": "https://www.frederiksberg.dk/dagtilbud-og-skole/priser-og-tilskud-til-boernepasning/priser-boernepasning"
  },
  {
    "kommune": "Aarhus",
    "vuggestue": 3637,
    "boernehave": 2288,
    "sfo": 1600,
    "madordning": 620,
    "lat": 56.1629,
    "lng": 10.2039,
    "kilde": "https://aarhus.dk/borger/pasning-skole-og-uddannelse/pasning-0-6-aar/takster-tilskud-og-betaling/priser-og-betaling/hvad-koster-pasning-i-aarhus"
  },
  {
    "kommune": "Odense",
    "vuggestue": 3500,
    "boernehave": 2150,
    "sfo": 1500,
    "madordning": 600,
    "lat": 55.4038,
    "lng": 10.4024,
    "kilde": "https://www.odense.dk/borger/familie-boern-og-unge/dagtilbud/takster-tilskud-og-betaling/takster-og-betaling"
  },
  {
    "kommune": "Aalborg",
    "vuggestue": 3550,
    "boernehave": 2250,
    "sfo": 1550,
    "madordning": 580,
    "lat": 57.0488,
    "lng": 9.9217,
    "kilde": "https://www.aalborg.dk/mit-liv/mit-barn/boernepasning/priser-og-vilkaar-for-dagtilbud-og-dus"
  },
  {
    "kommune": "Esbjerg",
    "vuggestue": 3480,
    "boernehave": 2180,
    "sfo": 1500,
    "madordning": 580,
    "lat": 55.4669,
    "lng": 8.4596,
    "kilde": "https://boernepasning.esbjerg.dk/praktisk-information/priser-og-tilskud"
  },
  {
    "kommune": "Randers",
    "vuggestue": 3400,
    "boernehave": 2150,
    "sfo": 1500,
    "madordning": 570,
    "lat": 56.4606,
    "lng": 10.0363,
    "kilde": "https://www.randers.dk/borger/boern-unge-og-familie/dagtilbud-og-pasning/takster-tilskud-og-oekonomisk-friplads/takster/"
  },
  {
    "kommune": "Kolding",
    "vuggestue": 3450,
    "boernehave": 2200,
    "sfo": 1500,
    "madordning": 570,
    "lat": 55.4904,
    "lng": 9.4722,
    "kilde": "https://www.kolding.dk/om-kommunen/oekonomi/takster/takster-for-dagtilbud"
  },
  {
    "kommune": "Vejle",
    "vuggestue": 3450,
    "boernehave": 2180,
    "sfo": 1500,
    "madordning": 560,
    "lat": 55.7093,
    "lng": 9.5357,
    "kilde": "https://www.vejle.dk/da/service-og-selvbetjening/borger/boern-skole-og-familie/boernepasning-0-6-aar/priser-og-tilskud-til-boernepasning/"
  },
  {
    "kommune": "Roskilde",
    "vuggestue": 4022,
    "boernehave": 2600,
    "sfo": 1800,
    "madordning": 590,
    "lat": 55.6415,
    "lng": 12.0803,
    "kilde": "https://www.roskilde.dk/da-dk/service-og-selvbetjening/borger/familie-og-born/dagtilbud/hvad-koster-en-plads-i-dagtilbud-sfo-eller-klub/"
  },
  {
    "kommune": "Herning",
    "vuggestue": 3852,
    "boernehave": 2300,
    "sfo": 1600,
    "madordning": 570,
    "lat": 56.1362,
    "lng": 8.9766,
    "kilde": "https://www.herning.dk/borger/boern-og-unge/boernepasning/takster-for-boernepasning-2025"
  },
  {
    "kommune": "Horsens",
    "vuggestue": 3480,
    "boernehave": 2200,
    "sfo": 1500,
    "madordning": 560,
    "lat": 55.8607,
    "lng": 9.8840,
    "kilde": "https://horsens.dk/familie/oekonomiogstoette/taksterdagtilbudogsfo"
  },
  {
    "kommune": "Holstebro",
    "vuggestue": 3400,
    "boernehave": 2100,
    "sfo": 1480,
    "madordning": 550,
    "lat": 56.3600,
    "lng": 8.6161,
    "kilde": "https://www.holstebro.dk/priser-og-tilskud-til-boernepasning"
  },
  {
    "kommune": "Næstved",
    "vuggestue": 3450,
    "boernehave": 2150,
    "sfo": 1500,
    "madordning": 560,
    "lat": 55.2294,
    "lng": 11.7608,
    "kilde": "https://www.naestved.dk/boern/dagtilbud/betaling-og-tilskud"
  },
  {
    "kommune": "Slagelse",
    "vuggestue": 3450,
    "boernehave": 2200,
    "sfo": 1500,
    "madordning": 560,
    "lat": 55.4027,
    "lng": 11.3545,
    "kilde": "https://www.slagelse.dk/da/service-og-selvbetjening/dagtilbud-og-skole/dagtilbud-0-6-aar/priser-og-tilskud-til-boernepasning/"
  },
  {
    "kommune": "Hjørring",
    "vuggestue": 3400,
    "boernehave": 2100,
    "sfo": 1450,
    "madordning": 540,
    "lat": 57.4639,
    "lng": 9.9826,
    "kilde": "https://hjoerring.dk/borger/boern-unge-og-familie/pasningsmuligheder/kommunale-dagtilbud-0-6-aar/priser"
  },
  {
    "kommune": "Sønderborg",
    "vuggestue": 3260,
    "boernehave": 2100,
    "sfo": 1480,
    "madordning": 540,
    "lat": 54.9097,
    "lng": 9.7896,
    "kilde": "https://sonderborgkommune.dk/priser-pasning"
  },
  {
    "kommune": "Favrskov",
    "vuggestue": 3226,
    "boernehave": 2080,
    "sfo": 1450,
    "madordning": 540,
    "lat": 56.3083,
    "lng": 9.8167,
    "kilde": "https://favrskov.dk/takster/takster-boern-og-skole-omraadet"
  },
  {
    "kommune": "Viborg",
    "vuggestue": 3380,
    "boernehave": 2150,
    "sfo": 1500,
    "madordning": 540,
    "lat": 56.4532,
    "lng": 9.4020,
    "kilde": "https://viborg.dk/borger/boern-unge-og-familie/boernepasning-0-6-aar/priser-for-dagtilbud/"
  },
  {
    "kommune": "Gladsaxe",
    "vuggestue": 3600,
    "boernehave": 2200,
    "sfo": 1550,
    "madordning": 560,
    "lat": 55.7378,
    "lng": 12.4884,
    "kilde": "https://gladsaxe.dk/borger/boern-og-familie/boern-og-oekonomi/institutionstakster"
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MUNICIPALITY_DATA;
}
