// Global variable to store municipality data
let municipalityData = [];
let isLoadingData = true;

// Fallback data in case embedded data fails - using same data as data.js
const fallbackData = [
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

// Load municipality data from embedded data
function loadMunicipalityData() {
    console.log('Loading municipality data from embedded source...');
    
    try {
        // Use embedded data from data.js
        if (typeof MUNICIPALITY_DATA !== 'undefined' && MUNICIPALITY_DATA.length > 0) {
            municipalityData = MUNICIPALITY_DATA;
            console.log('Embedded municipality data loaded successfully:', municipalityData.length, 'municipalities');
            console.log('First municipality:', municipalityData[0]);
        } else {
            // Fallback to hardcoded data if embedded data is not available
            console.warn('Embedded data not available, using fallback data');
            municipalityData = fallbackData;
        }
        
        isLoadingData = false;
        hideLoadingIndicator();
        
        // Initialize UI components after data is loaded
        initializeCalculator();
        initializePriceTable();
        initializeMunicipalityPills();
        
    } catch (error) {
        console.error('Error loading municipality data:', error);
        
        // Use fallback data
        municipalityData = fallbackData;
        isLoadingData = false;
        hideLoadingIndicator();
        
        initializeCalculator();
        initializePriceTable();
        initializeMunicipalityPills();
    }
}

// Hide loading indicator
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

// Get municipality data by name
function getMunicipalityData(kommuneName) {
    return municipalityData.find(m => m.kommune === kommuneName);
}

// Format price with Danish number formatting
function formatPrice(price) {
    return new Intl.NumberFormat('da-DK').format(price);
}

// Create municipality slug for URL
function createMunicipalitySlug(municipalityName) {
    return municipalityName.toLowerCase()
        .replace(/ø/g, 'oe')
        .replace(/æ/g, 'ae')
        .replace(/å/g, 'aa')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '');
}

// Calculate price based on municipality data
function calculatePrice() {
    const form = document.getElementById('calculator-form');
    if (!form) return;
    
    const formData = new FormData(form);
    const kommune = formData.get('kommune');
    const alder = formData.get('barnets-alder');
    const madordning = formData.get('madordning') === 'on';
    const husstandsindkomst = parseInt(formData.get('husstandsindkomst')) || 0;
    
    if (!kommune || !alder || husstandsindkomst <= 0) {
        alert('Udfyld venligst alle felter korrekt.');
        return;
    }
    
    const municipalityInfo = getMunicipalityData(kommune);
    if (!municipalityInfo) {
        alert('Kommune ikke fundet.');
        return;
    }
    
    const baseRate = municipalityInfo[alder] || 0;
    const lunchCost = madordning ? (municipalityInfo.madordning || 0) : 0;
    
    // Calculate subsidy based on income (simplified logic)
    let subsidyFactor = 1;
    if (husstandsindkomst < 300000) {
        subsidyFactor = 0.3; // 70% subsidy
    } else if (husstandsindkomst < 500000) {
        subsidyFactor = 0.5; // 50% subsidy
    } else if (husstandsindkomst < 700000) {
        subsidyFactor = 0.7; // 30% subsidy
    }
    
    const finalPrice = Math.round((baseRate + lunchCost) * subsidyFactor);
    
    // Display result
    document.getElementById('price-amount').textContent = `${formatPrice(finalPrice)} DKK`;
    document.getElementById('result').style.display = 'block';
    
    // Scroll to result
    document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Handle form submission
function handleFormSubmit() {
    if (isLoadingData) {
        alert('Data indlæses stadig. Prøv igen om et øjeblik.');
        return;
    }
    calculatePrice();
}

// Make function globally available
window.handleFormSubmit = handleFormSubmit;

// Smooth scroll to calculator
function scrollToCalculator() {
    const calculator = document.getElementById('calculator');
    if (calculator) {
        calculator.scrollIntoView({ behavior: 'smooth' });
    }
}

// Make function globally available
window.scrollToCalculator = scrollToCalculator;

// Update lunch price label based on selected municipality
function updateLunchPriceLabel(municipalityInfo) {
    const madordningLabel = document.getElementById('madordning-label');
    if (madordningLabel && municipalityInfo && municipalityInfo.madordning) {
        madordningLabel.textContent = `Inkluder madordning (${formatPrice(municipalityInfo.madordning)} DKK/måned)`;
    } else if (madordningLabel) {
        madordningLabel.textContent = 'Inkluder madordning';
    }
}

// Initialize calculator with dynamic municipality data
function initializeCalculator() {
    const kommuneSelect = document.getElementById('kommune');
    if (!kommuneSelect) return;
    
    // Clear existing options except the first one
    kommuneSelect.innerHTML = '<option value="">Vælg kommune</option>';
    
    // Add municipalities from data
    municipalityData.forEach(municipality => {
        const option = document.createElement('option');
        option.value = municipality.kommune;
        option.textContent = municipality.kommune;
        kommuneSelect.appendChild(option);
    });
    
    // Add event listener to update lunch price label
    kommuneSelect.addEventListener('change', (e) => {
        const selectedKommune = e.target.value;
        if (selectedKommune) {
            const municipalityInfo = getMunicipalityData(selectedKommune);
            updateLunchPriceLabel(municipalityInfo);
        } else {
            updateLunchPriceLabel(null);
        }
    });
}

// Initialize price table with dynamic data
function initializePriceTable() {
    const tableBody = document.querySelector('.prices-table tbody');
    if (!tableBody) return;
    
    // Clear existing table rows
    tableBody.innerHTML = '';
    
    // Add rows for all municipalities
    const municipalitiesToShow = municipalityData;
    
    municipalitiesToShow.forEach(municipality => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="/kommuner/${createMunicipalitySlug(municipality.kommune)}" class="municipality-link">${municipality.kommune}</a></td>
            <td>${formatPrice(municipality.vuggestue)} DKK</td>
            <td>${formatPrice(municipality.boernehave)} DKK</td>
            <td>${formatPrice(municipality.sfo)} DKK</td>
            <td><a href="${municipality.kilde}" target="_blank" rel="noopener" class="detail-link">Se detaljer</a></td>
        `;
        tableBody.appendChild(row);
    });
    
    console.log('Price table initialized with', municipalitiesToShow.length, 'municipalities');
}

// Initialize municipality pills
function initializeMunicipalityPills() {
    const pillsContainer = document.getElementById('municipality-pills');
    if (!pillsContainer) return;
    
    // Clear existing pills
    pillsContainer.innerHTML = '';
    
    // Create pills for all municipalities
    municipalityData.forEach(municipality => {
        const pill = document.createElement('a');
        pill.href = `/kommuner/${createMunicipalitySlug(municipality.kommune)}`;
        pill.className = 'municipality-pill';
        
        // Calculate average price for display
        const averagePrice = Math.round((municipality.vuggestue + municipality.boernehave + municipality.sfo) / 3);
        
        pill.innerHTML = `
            <div class="pill-content">
                <div class="pill-name">${municipality.kommune}</div>
                <div class="pill-price">Fra ${formatPrice(averagePrice)} DKK/måned</div>
                <div class="pill-arrow">→</div>
            </div>
        `;
        
        pillsContainer.appendChild(pill);
    });
    
    console.log('Municipality pills initialized with', municipalityData.length, 'municipalities');
}

// Initialize FAQ accordion functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                    otherItem.querySelector('.faq-icon').textContent = '+';
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isOpen) {
                answer.style.display = 'none';
                icon.textContent = '+';
                item.classList.remove('active');
            } else {
                answer.style.display = 'block';
                icon.textContent = '−';
                item.classList.add('active');
            }
        });
    });
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
}

// Initialize calculator event listeners
function initializeCalculatorEvents() {
    const form = document.getElementById('calculator-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit();
        });
    }
}

// Initialize the application
function init() {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Load municipality data first
        loadMunicipalityData();
        
        // Initialize other UI components
        initializeFAQ();
        initializeMobileMenu();
        initializeCalculatorEvents();
    });
}

// Initialize when script loads
init();
