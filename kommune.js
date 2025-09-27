// Municipality-specific page functionality
// Handles routing, data loading, and dynamic content generation

// Global variables
let municipalityData = [];
let currentMunicipality = null;
let currentYear = new Date().getFullYear();

// Danish special character mapping for URL slugs
const slugMapping = {
    'ø': 'oe',
    'æ': 'ae', 
    'å': 'aa',
    'Ø': 'Oe',
    'Æ': 'Ae',
    'Å': 'Aa'
};

// Reverse mapping for display
const reverseSlugMapping = {
    'oe': 'ø',
    'ae': 'æ',
    'aa': 'å',
    'Oe': 'Ø',
    'Ae': 'Æ',
    'Aa': 'Å'
};

/**
 * Convert Danish municipality name to URL-friendly slug
 */
function createSlug(municipalityName) {
    let slug = municipalityName.toLowerCase();
    
    // Replace Danish special characters
    Object.keys(slugMapping).forEach(char => {
        slug = slug.replace(new RegExp(char, 'g'), slugMapping[char]);
    });
    
    // Replace spaces with hyphens and remove special characters
    slug = slug.replace(/\s+/g, '-')
              .replace(/[^a-z0-9\-]/g, '')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');
    
    return slug;
}

/**
 * Convert URL slug back to municipality name
 */
function slugToMunicipalityName(slug) {
    let name = slug.replace(/-/g, ' ');
    
    // Replace slug characters back to Danish characters
    Object.keys(reverseSlugMapping).forEach(slugChar => {
        name = name.replace(new RegExp(slugChar, 'gi'), reverseSlugMapping[slugChar]);
    });
    
    // Capitalize first letter of each word
    return name.replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Get municipality slug from URL
 */
function getMunicipalitySlug() {
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(part => part);
    
    // Handle different URL patterns:
    // /kommuner/koebenhavn
    // /kommune.html?kommune=koebenhavn
    // /koebenhavn
    
    if (pathParts.includes('kommuner') && pathParts.length > 1) {
        return pathParts[pathParts.length - 1];
    }
    
    // Check query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const kommuneParam = urlParams.get('kommune');
    if (kommuneParam) {
        return kommuneParam;
    }
    
    // Check if last path part looks like a municipality slug
    if (pathParts.length > 0) {
        const lastPart = pathParts[pathParts.length - 1];
        if (lastPart !== 'kommune.html' && lastPart !== 'index.html') {
            return lastPart;
        }
    }
    
    return null;
}

/**
 * Load municipality data from JSON
 */
async function loadMunicipalityData() {
    try {
        console.log('Loading municipality data...');
        
        // Try different paths for the JSON file
        const possiblePaths = [
            './data/priser2025.json',
            '/data/priser2025.json',
            'data/priser2025.json'
        ];
        
        let response = null;
        let usedPath = '';
        
        for (const path of possiblePaths) {
            try {
                console.log('Trying to fetch from:', path);
                response = await fetch(path);
                console.log('Fetch response for', path, ':', response.status, response.statusText);
                
                if (response.ok) {
                    usedPath = path;
                    break;
                }
            } catch (pathError) {
                console.log('Failed to fetch from', path, ':', pathError.message);
                continue;
            }
        }
        
        if (!response || !response.ok) {
            throw new Error(`Could not load JSON from any path. Last status: ${response?.status || 'no response'}`);
        }
        
        console.log('Successfully loaded from:', usedPath);
        const responseText = await response.text();
        const data = JSON.parse(responseText);
        
        municipalityData = data;
        console.log('Municipality data loaded successfully:', municipalityData.length, 'municipalities');
        
        return true;
    } catch (error) {
        console.error('Error loading municipality data:', error);
        return false;
    }
}

/**
 * Find municipality by slug
 */
function findMunicipalityBySlug(slug) {
    if (!slug || !municipalityData.length) return null;
    
    // Try exact slug match first
    let municipality = municipalityData.find(m => createSlug(m.kommune) === slug);
    
    if (municipality) return municipality;
    
    // Try to find by converting slug back to municipality name
    const municipalityName = slugToMunicipalityName(slug);
    municipality = municipalityData.find(m => m.kommune.toLowerCase() === municipalityName.toLowerCase());
    
    return municipality;
}

/**
 * Update page title and meta tags
 */
function updatePageMeta(municipality) {
    const kommuneName = municipality.kommune;
    const currentYear = new Date().getFullYear();
    
    // Update title
    const title = `Børnepasning i ${kommuneName} ${currentYear} – priser og beregner`;
    document.getElementById('page-title').textContent = title;
    document.getElementById('og-title').setAttribute('content', title);
    document.getElementById('twitter-title').setAttribute('content', title);
    
    // Update meta description
    const description = `Se de nyeste takster for børnepasning i ${kommuneName} ${currentYear}. Beregn din pris med vores værktøj.`;
    document.getElementById('page-description').setAttribute('content', description);
    document.getElementById('og-description').setAttribute('content', description);
    document.getElementById('twitter-description').setAttribute('content', description);
    
    // Update canonical URL
    const canonicalUrl = `${window.location.origin}/kommuner/${createSlug(kommuneName)}`;
    document.getElementById('canonical-url').setAttribute('href', canonicalUrl);
    document.getElementById('og-url').setAttribute('content', canonicalUrl);
    
    // Update current year in footer
    document.getElementById('current-year').textContent = currentYear;
}

/**
 * Update page content with municipality data
 */
function updatePageContent(municipality) {
    const kommuneName = municipality.kommune;
    
    // Update hero section
    document.getElementById('hero-title').textContent = `Børnepasning i ${kommuneName}`;
    document.querySelector('.hero-subtitle').textContent = `Se de nyeste priser og beregn din månedlige omkostning for børnepasning i ${kommuneName}.`;
    
    // Update municipality name in prices section
    document.getElementById('municipality-name').textContent = kommuneName;
    
    // Update prices table
    const pricesTable = document.getElementById('municipality-prices-table');
    pricesTable.innerHTML = `
        <tr>
            <td><strong>Vuggestue</strong></td>
            <td><strong>${formatPrice(municipality.vuggestue)} DKK</strong></td>
        </tr>
        <tr>
            <td><strong>Børnehave</strong></td>
            <td><strong>${formatPrice(municipality.boernehave)} DKK</strong></td>
        </tr>
        <tr>
            <td><strong>SFO</strong></td>
            <td><strong>${formatPrice(municipality.sfo)} DKK</strong></td>
        </tr>
        ${municipality.madordning ? `
        <tr>
            <td><strong>Madordning</strong></td>
            <td><strong>${formatPrice(municipality.madordning)} DKK</strong></td>
        </tr>
        ` : ''}
    `;
    
    // Update source link
    const sourceLink = document.getElementById('source-link');
    sourceLink.href = municipality.kilde;
    sourceLink.textContent = `Officielle priser - ${kommuneName}`;
    
    // Pre-select municipality in calculator
    const kommuneSelect = document.getElementById('kommune');
    kommuneSelect.innerHTML = `<option value="${kommuneName}" selected>${kommuneName}</option>`;
    
    // Update lunch price label
    updateLunchPriceLabel(municipality);
}

/**
 * Update lunch price label with municipality-specific price
 */
function updateLunchPriceLabel(municipality) {
    const madordningLabel = document.getElementById('madordning-label');
    if (municipality.madordning) {
        madordningLabel.textContent = `Inkluder madordning (${formatPrice(municipality.madordning)} DKK/måned)`;
    } else {
        madordningLabel.textContent = 'Inkluder madordning';
    }
}

/**
 * Initialize map for municipality
 */
function initializeMap(municipality) {
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        return;
    }
    
    if (!municipality.lat || !municipality.lng) {
        console.warn('No coordinates available for municipality:', municipality.kommune);
        return;
    }
    
    // Initialize map centered on municipality
    const map = L.map('mapid').setView([municipality.lat, municipality.lng], 12);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add marker for municipality
    const marker = L.marker([municipality.lat, municipality.lng]).addTo(map);
    
    // Create popup content
    const averagePrice = Math.round((municipality.vuggestue + municipality.boernehave + municipality.sfo) / 3);
    const popupContent = `
        <div style="min-width: 200px; font-family: 'Inter', sans-serif;">
            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px; font-weight: 600;">${municipality.kommune}</h3>
            <div style="margin-bottom: 8px;">
                <strong>Vuggestue:</strong> ${formatPrice(municipality.vuggestue)} DKK
            </div>
            <div style="margin-bottom: 8px;">
                <strong>Børnehave:</strong> ${formatPrice(municipality.boernehave)} DKK
            </div>
            <div style="margin-bottom: 8px;">
                <strong>SFO:</strong> ${formatPrice(municipality.sfo)} DKK
            </div>
            <div style="margin-bottom: 10px; padding: 8px; background: #f8f9fa; border-radius: 6px; font-size: 14px;">
                <strong>Gennemsnit:</strong> ${formatPrice(averagePrice)} DKK/måned
            </div>
            <a href="${municipality.kilde}" target="_blank" style="color: #667eea; text-decoration: none; font-size: 14px; font-weight: 500;">
                Se officielle priser →
            </a>
        </div>
    `;
    
    marker.bindPopup(popupContent).openPopup();
    
    console.log('Map initialized for municipality:', municipality.kommune);
    return map;
}

/**
 * Format price with Danish number formatting
 */
function formatPrice(price) {
    return new Intl.NumberFormat('da-DK').format(price);
}

/**
 * Show loading state
 */
function showLoading() {
    document.getElementById('loading-section').classList.remove('hidden');
    document.getElementById('error-section').classList.add('hidden');
    document.getElementById('municipality-content').classList.add('hidden');
}

/**
 * Show error state
 */
function showError() {
    document.getElementById('loading-section').classList.add('hidden');
    document.getElementById('error-section').classList.remove('hidden');
    document.getElementById('municipality-content').classList.add('hidden');
}

/**
 * Show municipality content
 */
function showMunicipalityContent() {
    document.getElementById('loading-section').classList.add('hidden');
    document.getElementById('error-section').classList.add('hidden');
    document.getElementById('municipality-content').classList.remove('hidden');
}

/**
 * Initialize FAQ accordion functionality
 */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            const isOpen = !answer.classList.contains('hidden');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.add('hidden');
                    otherItem.querySelector('.faq-icon').textContent = '+';
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isOpen) {
                answer.classList.add('hidden');
                icon.textContent = '+';
                item.classList.remove('active');
            } else {
                answer.classList.remove('hidden');
                icon.textContent = '−';
                item.classList.add('active');
            }
        });
    });
}

/**
 * Initialize mobile menu functionality
 */
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

/**
 * Main initialization function
 */
async function init() {
    console.log('Initializing municipality page...');
    
    // Show loading state
    showLoading();
    
    // Get municipality slug from URL
    const slug = getMunicipalitySlug();
    console.log('Municipality slug:', slug);
    
    if (!slug) {
        console.error('No municipality slug found in URL');
        showError();
        return;
    }
    
    // Load municipality data
    const dataLoaded = await loadMunicipalityData();
    if (!dataLoaded) {
        console.error('Failed to load municipality data');
        showError();
        return;
    }
    
    // Find municipality by slug
    const municipality = findMunicipalityBySlug(slug);
    console.log('Found municipality:', municipality);
    
    if (!municipality) {
        console.error('Municipality not found for slug:', slug);
        showError();
        return;
    }
    
    // Store current municipality globally
    currentMunicipality = municipality;
    
    // Update page content
    updatePageMeta(municipality);
    updatePageContent(municipality);
    
    // Initialize map
    initializeMap(municipality);
    
    // Initialize UI components
    initializeFAQ();
    initializeMobileMenu();
    
    // Show content
    showMunicipalityContent();
    
    console.log('Municipality page initialized successfully for:', municipality.kommune);
}

/**
 * Handle form submission for calculator
 */
function handleFormSubmit() {
    if (!currentMunicipality) {
        console.error('No municipality data available');
        return;
    }
    
    const form = document.querySelector('.calculator-form');
    const formData = new FormData(form);
    
    const kommune = formData.get('kommune');
    const alder = formData.get('barnets-alder');
    const madordning = formData.get('madordning') === 'on';
    const husstandsindkomst = parseInt(formData.get('husstandsindkomst')) || 0;
    
    if (!kommune || !alder || husstandsindkomst <= 0) {
        alert('Udfyld venligst alle felter korrekt.');
        return;
    }
    
    // Calculate price using the same logic as main page
    const municipalityInfo = currentMunicipality;
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
    document.getElementById('result').classList.remove('hidden');
    
    // Scroll to result
    document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
