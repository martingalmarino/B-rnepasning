// Global variable to store municipality data
let municipalityData = [];
let isLoadingData = true;

// Fallback data in case embedded data fails
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
        
    } catch (error) {
        console.error('Error loading municipality data:', error);
        
        // Use fallback data
        municipalityData = fallbackData;
        isLoadingData = false;
        hideLoadingIndicator();
        
        initializeCalculator();
        initializePriceTable();
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

// Smooth scroll to calculator
function scrollToCalculator() {
    const calculator = document.getElementById('calculator');
    if (calculator) {
        calculator.scrollIntoView({ behavior: 'smooth' });
    }
}

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
    
    // Add rows for first 10 municipalities
    const municipalitiesToShow = municipalityData.slice(0, 10);
    
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

// Initialize the application
function init() {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Load municipality data first
        loadMunicipalityData();
        
        // Initialize other UI components
        initializeFAQ();
        initializeMobileMenu();
    });
}

// Initialize when script loads
init();
