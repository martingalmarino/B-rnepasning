// Global variable to store municipality data
let municipalityData = [];
let isLoadingData = true;

// Fallback data in case JSON loading fails
const fallbackData = [
    {
        "kommune": "København",
        "vuggestue": 3996,
        "boernehave": 2317,
        "sfo": 1800,
        "madordning": 650,
        "kilde": "https://www.kk.dk/borger/pasning-og-skole/priser-og-tilskud/priser-for-boernepasning"
    },
    {
        "kommune": "Aarhus",
        "vuggestue": 3637,
        "boernehave": 2288,
        "sfo": 1600,
        "madordning": 620,
        "kilde": "https://aarhus.dk/borger/pasning-skole-og-uddannelse/pasning-0-6-aar/takster-tilskud-og-betaling/priser-og-betaling/hvad-koster-pasning-i-aarhus"
    },
    {
        "kommune": "Odense",
        "vuggestue": 3500,
        "boernehave": 2150,
        "sfo": 1500,
        "madordning": 600,
        "kilde": "https://www.odense.dk/borger/familie-boern-og-unge/dagtilbud/takster-tilskud-og-betaling/takster-og-betaling"
    }
];

// Check if running from file:// protocol
function isRunningFromFile() {
    return window.location.protocol === 'file:';
}

// Check if running in development/local environment
function isLocalDevelopment() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.protocol === 'file:';
}

// Function to load municipality data from JSON
async function loadMunicipalityData() {
    // Only use fallback for file:// protocol, not for localhost or Vercel
    if (isRunningFromFile()) {
        console.warn('Running from file:// protocol - CORS restrictions apply');
        console.log('Using fallback data due to file:// protocol');
        
        municipalityData = fallbackData;
        isLoadingData = false;
        hideLoadingIndicator();
        showDataLoadWarning();
        
        // Initialize UI components with fallback data
        initializeCalculator();
        initializePriceTable();
        return;
    }
    
    try {
        console.log('Starting to load municipality data...');
        console.log('Current URL:', window.location.href);
        
        // Try different paths for the JSON file
        const possiblePaths = [
            './priser2025.json',
            '/priser2025.json',
            'priser2025.json',
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
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        console.log('Response status:', response.status);
        console.log('Response statusText:', response.statusText);
        
        const responseText = await response.text();
        console.log('Response text length:', responseText.length);
        console.log('Response preview:', responseText.substring(0, 200));
        console.log('Response ends with:', responseText.substring(responseText.length - 50));
        
        // Validate JSON structure
        if (!responseText.trim().startsWith('[')) {
            throw new Error('JSON response does not start with array bracket');
        }
        
        const data = JSON.parse(responseText);
        console.log('JSON parsed successfully:', data.length, 'municipalities');
        console.log('First municipality:', data[0]);
        
        municipalityData = data;
        isLoadingData = false;
        console.log('Municipality data loaded successfully:', municipalityData.length, 'municipalities');
        
        // Hide loading indicator
        hideLoadingIndicator();
        
        // Initialize UI components after data is loaded
        initializeCalculator();
        initializePriceTable();
        
    } catch (error) {
        console.error('Error loading municipality data:', error);
        console.error('Error details:', error.message);
        
        // Only show warning for localhost, not for production (Vercel)
        if (isLocalDevelopment()) {
            console.log('Using fallback data for local development');
            showDataLoadWarning();
        } else {
            console.error('Critical error in production - data loading failed');
            // Show a more user-friendly error message for production
            showProductionError();
        }
        
        // Use fallback data
        municipalityData = fallbackData;
        isLoadingData = false;
        hideLoadingIndicator();
        
        // Initialize UI components with fallback data
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

// Function to show warning when using fallback data
function showDataLoadWarning() {
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
        const warningDiv = document.createElement('div');
        warningDiv.className = 'warning-message';
        warningDiv.innerHTML = `
            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 12px; padding: 2rem; text-align: center; margin: 2rem 0;">
                <h3 style="color: #92400e; margin-bottom: 1rem;">⚠️ Bruger begrænset data</h3>
                <p style="color: #78350f; margin-bottom: 1rem;">Kunne ikke indlæse fuld prisdatabase. Viser begrænset data for ${fallbackData.length} kommuner.</p>
                <p style="color: #78350f; font-weight: 600;">For fuld funktionalitet, kør en lokal server:</p>
                <code style="background: #f3f4f6; padding: 0.5rem; border-radius: 4px; display: block; margin: 1rem auto; max-width: 300px;">
                    python3 -m http.server 8000
                </code>
                <p style="color: #78350f;">Derefter åbn: <strong>http://localhost:8000</strong></p>
            </div>
        `;
        calculatorSection.insertBefore(warningDiv, calculatorSection.firstChild);
    }
}

// Show production error message
function showProductionError() {
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div style="background: #fef2f2; border: 1px solid #f87171; border-radius: 12px; padding: 2rem; text-align: center; margin: 2rem 0;">
                <h3 style="color: #dc2626; margin-bottom: 1rem;">❌ Fejl ved indlæsning af data</h3>
                <p style="color: #991b1b; margin-bottom: 1rem;">Der opstod en fejl ved indlæsning af prisdata. Prøv at genindlæse siden.</p>
                <button onclick="window.location.reload()" style="background: #dc2626; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 600;">
                    Genindlæs side
                </button>
            </div>
        `;
        calculatorSection.insertBefore(errorDiv, calculatorSection.firstChild);
    }
}

// Function to show error message when data fails to load
function showDataLoadError() {
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div style="background: #fee2e2; border: 1px solid #fca5a5; border-radius: 12px; padding: 2rem; text-align: center; margin: 2rem 0;">
                <h3 style="color: #dc2626; margin-bottom: 1rem;">Fejl ved indlæsning af data</h3>
                <p style="color: #7f1d1d; margin-bottom: 1rem;">Kunne ikke indlæse prisdatabase. Dette kan skyldes:</p>
                <ul style="color: #7f1d1d; text-align: left; max-width: 400px; margin: 0 auto;">
                    <li>Du åbner HTML-filen direkte i browseren</li>
                    <li>Serveren kører ikke</li>
                    <li>Filsti til JSON er forkert</li>
                </ul>
                <p style="color: #7f1d1d; margin-top: 1rem; font-weight: 600;">Løsning: Kør en lokal server med Python:</p>
                <code style="background: #f3f4f6; padding: 0.5rem; border-radius: 4px; display: block; margin: 1rem auto; max-width: 300px;">
                    python3 -m http.server 8000
                </code>
                <p style="color: #7f1d1d;">Derefter åbn: <strong>http://localhost:8000</strong></p>
            </div>
        `;
        calculatorSection.insertBefore(errorDiv, calculatorSection.firstChild);
    }
}

// Function to get municipality data by name
function getMunicipalityData(kommuneName) {
    return municipalityData.find(m => m.kommune === kommuneName);
}

// Subsidy factors based on household income
function getSubsidyFactor(income) {
    if (income < 250000) {
        return 0.6; // 40% subsidy
    } else if (income < 350000) {
        return 0.8; // 20% subsidy
    } else {
        return 1.0; // No subsidy
    }
}

// Calculate monthly price
function calculatePrice(kommune, ageGroup, includeLunch, householdIncome) {
    // Get municipality data
    const municipalityInfo = getMunicipalityData(kommune);
    
    if (!municipalityInfo) {
        throw new Error('Municipality not found in database');
    }
    
    // Get base rate for the selected age group
    const baseRate = municipalityInfo[ageGroup];
    
    if (!baseRate) {
        throw new Error('Invalid age group selected');
    }
    
    // Get subsidy factor based on income
    const subsidyFactor = getSubsidyFactor(householdIncome);
    
    // Calculate subsidized base price
    const subsidizedPrice = baseRate * subsidyFactor;
    
    // Add lunch cost if selected (use municipality-specific lunch cost)
    const lunchCost = municipalityInfo.madordning || 650;
    const totalPrice = includeLunch ? subsidizedPrice + lunchCost : subsidizedPrice;
    
    return Math.round(totalPrice);
}

// Format number with Danish locale
function formatPrice(price) {
    return new Intl.NumberFormat('da-DK').format(price);
}

// Scroll to calculator section
function scrollToCalculator() {
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
        calculatorSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Check if data is still loading
    if (isLoadingData) {
        alert('Data indlæses stadig. Vent venligst et øjeblik.');
        return;
    }
    
    // Get form values
    const kommune = document.getElementById('kommune').value;
    const ageGroup = document.getElementById('barnets-alder').value;
    const includeLunch = document.getElementById('madordning').checked;
    const householdIncome = parseInt(document.getElementById('husstandsindkomst').value);
    
    // Validate inputs
    if (!kommune || !ageGroup || !householdIncome) {
        alert('Venligst udfyld alle felter');
        return;
    }
    
    if (householdIncome < 0) {
        alert('Husstandsindkomst skal være et positivt tal');
        return;
    }
    
    try {
        // Calculate price
        const monthlyPrice = calculatePrice(kommune, ageGroup, includeLunch, householdIncome);
        
        // Display result
        displayResult(monthlyPrice, kommune, ageGroup, includeLunch, householdIncome);
        
    } catch (error) {
        console.error('Calculation error:', error);
        alert('Der opstod en fejl ved beregningen. Prøv igen.');
    }
}

// Display calculation result
function displayResult(price, kommune, ageGroup, includeLunch, householdIncome) {
    const resultBox = document.getElementById('result');
    const priceElement = document.getElementById('calculated-price');
    
    // Update price display
    priceElement.textContent = formatPrice(price);
    
    // Show result box with animation
    resultBox.classList.remove('hidden');
    resultBox.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
    });
    
    // Add visual feedback
    resultBox.style.animation = 'fadeIn 0.5s ease-in';
}

// Mobile menu toggle functionality
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const body = document.body;
    
    if (nav && toggleButton) {
        const isOpen = nav.classList.contains('mobile-nav-open');
        
        if (isOpen) {
            nav.classList.remove('mobile-nav-open');
            toggleButton.classList.remove('active');
            body.style.overflow = '';
        } else {
            nav.classList.add('mobile-nav-open');
            toggleButton.classList.add('active');
            body.style.overflow = 'hidden';
        }
    }
}

// Close mobile menu when clicking on nav links
function closeMobileMenu() {
    const nav = document.querySelector('.nav');
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const body = document.body;
    
    if (nav && toggleButton) {
        nav.classList.remove('mobile-nav-open');
        toggleButton.classList.remove('active');
        body.style.overflow = '';
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu after clicking a link
                closeMobileMenu();
            }
        });
    });
}

// Add input validation and formatting
function initInputValidation() {
    const incomeInput = document.getElementById('husstandsindkomst');
    
    if (incomeInput) {
        // Format number as user types
        incomeInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            if (value) {
                // Add thousand separators for better readability
                e.target.value = new Intl.NumberFormat('da-DK').format(parseInt(value));
            }
        });
        
        // Clean value for calculation
        incomeInput.addEventListener('blur', (e) => {
            const cleanValue = e.target.value.replace(/\D/g, '');
            e.target.value = cleanValue;
        });
    }
}

// Add FAQ accordion functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            // Initially hide answers
            answer.classList.add('hidden');
            
            // Add click handler to questions
            question.style.cursor = 'pointer';
            question.addEventListener('click', () => {
                const isOpen = !answer.classList.contains('hidden');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.classList.add('hidden');
                    }
                });
                
                // Toggle current item
                if (isOpen) {
                    answer.classList.add('hidden');
                } else {
                    answer.classList.remove('hidden');
                }
            });
        }
    });
}

// Add loading states and animations
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Beregner...';
    button.disabled = true;
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 500);
}

// Enhanced form submission with loading state
function handleFormSubmitWithLoading(event) {
    event.preventDefault();
    
    const submitButton = event.target.querySelector('.calculate-button');
    addLoadingState(submitButton);
    
    // Delay the actual calculation to show loading state
    setTimeout(() => {
        handleFormSubmit(event);
    }, 500);
}

// Initialize calculator with dynamic municipality options
function initializeCalculator() {
    const kommuneSelect = document.getElementById('kommune');
    if (!kommuneSelect) return;
    
    // Clear existing options except the first one
    kommuneSelect.innerHTML = '<option value="">Vælg kommune</option>';
    
    // Add municipality options from loaded data
    municipalityData.forEach(municipality => {
        const option = document.createElement('option');
        option.value = municipality.kommune;
        option.textContent = municipality.kommune;
        kommuneSelect.appendChild(option);
    });
    
    // Add event listener to update lunch price when municipality changes
    kommuneSelect.addEventListener('change', updateLunchPriceLabel);
    
    console.log('Calculator initialized with', municipalityData.length, 'municipalities');
}

// Update lunch price label based on selected municipality
function updateLunchPriceLabel() {
    const kommuneSelect = document.getElementById('kommune');
    const madordningLabel = document.getElementById('madordning-label');
    
    if (!kommuneSelect || !madordningLabel) return;
    
    const selectedKommune = kommuneSelect.value;
    if (selectedKommune) {
        const municipalityInfo = getMunicipalityData(selectedKommune);
        if (municipalityInfo) {
            const lunchPrice = municipalityInfo.madordning || 650;
            madordningLabel.textContent = `Inkluder madordning (+${formatPrice(lunchPrice)} DKK/måned)`;
        }
    } else {
        madordningLabel.textContent = 'Inkluder madordning';
    }
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


// Initialize the application
function init() {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Load municipality data first
        loadMunicipalityData();
        
        // Initialize form submission
        const calculatorForm = document.getElementById('priceCalculator');
        if (calculatorForm) {
            calculatorForm.addEventListener('submit', handleFormSubmitWithLoading);
        }
        
        // Initialize mobile menu
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const nav = document.querySelector('.nav');
            const toggleButton = document.querySelector('.mobile-menu-toggle');
            
            if (nav && nav.classList.contains('mobile-nav-open') && 
                !nav.contains(e.target) && 
                !toggleButton.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
        
        // Initialize smooth scrolling
        initSmoothScrolling();
        
        // Initialize input validation
        initInputValidation();
        
        // Initialize FAQ accordion
        initFAQAccordion();
        
        // Add scroll effect to header
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
        
        console.log('Børnepasning calculator initialized successfully');
    });
}

// CSS animations for better UX
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mobile-nav-open {
        display: flex !important;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.98);
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 2rem 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideInFromTop 0.3s ease-out;
    }
    
    @keyframes slideInFromTop {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .mobile-nav-open .nav-list {
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    
    .mobile-nav-open .nav-link {
        font-size: 1.2rem;
        padding: 1rem 2rem;
        border-radius: 12px;
        transition: all 0.3s ease;
        background: rgba(102, 126, 234, 0.1);
        color: #667eea;
        font-weight: 600;
        width: 100%;
        max-width: 280px;
        text-align: center;
    }
    
    .mobile-nav-open .nav-link:hover {
        background: rgba(102, 126, 234, 0.2);
        transform: translateY(-2px);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Start the application
init();
