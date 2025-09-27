// Global variable to store the dataset
let dataset = [];

// Function to load data from JSON
async function loadData() {
    try {
        const response = await fetch('./data/priser2025.json');
        dataset = await response.json();
        console.log('Dataset loaded successfully:', dataset.length, 'municipalities');
        populateKommuneSelect(dataset);
        populatePriceTable(dataset);
        hideLoadingIndicator();
    } catch (error) {
        console.error('Error loading dataset:', error);
        // Show error message to user
        const resultBox = document.getElementById('resultBox');
        if (resultBox) {
            resultBox.textContent = 'Fejl ved indlæsning af data. Prøv igen senere.';
            resultBox.style.display = 'block';
            resultBox.classList.remove('hidden');
        }
    }
}

// Function to populate kommune select dropdown
function populateKommuneSelect(data) {
    const kommuneSelect = document.getElementById('kommuneSelect');
    if (!kommuneSelect) {
        console.error('kommuneSelect element not found');
        return;
    }
    
    // Clear existing options
    kommuneSelect.innerHTML = '';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Vælg kommune';
    kommuneSelect.appendChild(defaultOption);
    
    // Add options for each municipality
    data.forEach(municipality => {
        const option = document.createElement('option');
        option.value = municipality.kommune;
        option.textContent = municipality.kommune;
        kommuneSelect.appendChild(option);
    });
    
    console.log('Kommune select populated with', data.length, 'options');
}

// Function to populate price table
function populatePriceTable(data) {
    const tableBody = document.querySelector('.prices-table tbody');
    if (!tableBody) {
        console.error('Price table tbody not found');
        return;
    }
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Add rows for each municipality
    data.forEach(municipality => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${municipality.kommune}</td>
            <td>${municipality.vuggestue.toLocaleString('da-DK')} DKK</td>
            <td>${municipality.boernehave.toLocaleString('da-DK')} DKK</td>
            <td>${municipality.sfo.toLocaleString('da-DK')} DKK</td>
            <td><a href="${municipality.kilde}" target="_blank" rel="noopener" class="detail-link">Se detaljer</a></td>
        `;
        tableBody.appendChild(row);
    });
    
    console.log('Price table populated with', data.length, 'rows');
}

// Function to hide loading indicator
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

// Function to calculate price
function calculatePrice() {
    console.log('calculatePrice function called');
    
    // Get form values
    const kommuneName = document.getElementById('kommuneSelect').value;
    const ageGroup = document.getElementById('alderSelect').value;
    const income = parseFloat(document.getElementById('incomeInput').value) || 0;
    const lunchChecked = document.getElementById('lunchCheckbox').checked;
    
    console.log('Form values:', {
        kommuneName,
        ageGroup,
        income,
        lunchChecked
    });
    
    const resultBox = document.getElementById('resultBox');
    
    // Validate inputs
    if (!kommuneName) {
        resultBox.textContent = 'Vælg venligst en kommune.';
        resultBox.style.display = 'block';
        resultBox.classList.remove('hidden');
        return;
    }
    
    if (!ageGroup) {
        resultBox.textContent = 'Vælg venligst barnets alder.';
        resultBox.style.display = 'block';
        resultBox.classList.remove('hidden');
        return;
    }
    
    if (income <= 0) {
        resultBox.textContent = 'Indtast venligst en gyldig husstandsindkomst.';
        resultBox.style.display = 'block';
        resultBox.classList.remove('hidden');
        return;
    }
    
    // Find the selected municipality in dataset
    const kommuneData = dataset.find(municipality => municipality.kommune === kommuneName);
    if (!kommuneData) {
        resultBox.textContent = 'Kommune ikke fundet i datasættet.';
        resultBox.style.display = 'block';
        resultBox.classList.remove('hidden');
        return;
    }
    
    // Get base rate for selected age group
    const baseRate = kommuneData[ageGroup];
    if (!baseRate) {
        resultBox.textContent = 'Pris ikke fundet for valgt aldersgruppe.';
        resultBox.style.display = 'block';
        resultBox.classList.remove('hidden');
        return;
    }
    
    // Calculate subsidy factor based on income
    let subsidyFactor = 1;
    if (income < 250000) {
        subsidyFactor = 0.6; // 40% subsidy
    } else if (income < 350000) {
        subsidyFactor = 0.8; // 20% subsidy
    }
    // Higher income = no subsidy (factor remains 1)
    
    // Calculate final price
    let price = baseRate * subsidyFactor;
    
    // Add lunch cost if checked
    if (lunchChecked) {
        price += kommuneData.madordning || 0;
    }
    
    // Round to nearest whole number
    price = Math.round(price);
    
    // Display result
    resultBox.textContent = `Forventet månedlig pris: ${price.toLocaleString('da-DK')} DKK`;
    resultBox.style.display = 'block';
    resultBox.classList.remove('hidden');
    
    console.log('Price calculated:', {
        kommune: kommuneName,
        ageGroup: ageGroup,
        income: income,
        baseRate: baseRate,
        subsidyFactor: subsidyFactor,
        lunch: lunchChecked,
        finalPrice: price
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing calculator...');
    
    // Check if all required elements exist
    const kommuneSelect = document.getElementById('kommuneSelect');
    const alderSelect = document.getElementById('alderSelect');
    const incomeInput = document.getElementById('incomeInput');
    const lunchCheckbox = document.getElementById('lunchCheckbox');
    const calcButton = document.getElementById('calcButton');
    const resultBox = document.getElementById('resultBox');
    
    console.log('Elements found:', {
        kommuneSelect: !!kommuneSelect,
        alderSelect: !!alderSelect,
        incomeInput: !!incomeInput,
        lunchCheckbox: !!lunchCheckbox,
        calcButton: !!calcButton,
        resultBox: !!resultBox
    });
    
    // Load data
    loadData();
    
    // Attach event listener to calculate button
    if (calcButton) {
        calcButton.addEventListener('click', function() {
            console.log('Calculate button clicked');
            calculatePrice();
        });
        console.log('Calculate button event listener attached');
    } else {
        console.error('calcButton element not found');
    }
});

// Smooth scroll to calculator function
function scrollToCalculator() {
    const calculator = document.getElementById('calculator');
    if (calculator) {
        calculator.scrollIntoView({ behavior: 'smooth' });
    }
}

// Make scrollToCalculator globally available for onclick
window.scrollToCalculator = scrollToCalculator;