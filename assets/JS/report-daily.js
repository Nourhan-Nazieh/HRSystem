// Chart data storage
const chartData = {
    departments: {
        'chart-1': [{ "color": "green", "value": 40 }, { "color": "blue", "value": 40 }, { "color": "red", "value": 20 }],
        'chart-2': [{ "color": "blue", "value": 100 }],
        'chart-3': [{ "color": "green", "value": 40 }, { "color": "red", "value": 60 }],
        'chart-4': [{ "color": "orange", "value": 33 }, { "color": "blue", "value": 55 }, { "color": "red", "value": 12 }],
        'chart-5': [{ "color": "orange", "value": 21 }, { "color": "green", "value": 30 }, { "color": "blue", "value": 34 }, { "color": "red", "value": 15 }],
        'chart-6': [{ "color": "green", "value": 45 }, { "color": "blue", "value": 35 }, { "color": "red", "value": 20 }],
        'chart-7': [{ "color": "blue", "value": 100 }],
        'chart-8': [{ "color": "green", "value": 35 }, { "color": "red", "value": 65 }],
        'chart-9': [{ "color": "orange", "value": 28 }, { "color": "blue", "value": 60 }, { "color": "red", "value": 12 }],
        'chart-10': [{ "color": "orange", "value": 18 }, { "color": "green", "value": 32 }, { "color": "blue", "value": 38 }, { "color": "red", "value": 12 }]
    },
    locations: {
        'chart-1': [{ "color": "green", "value": 40 }, { "color": "blue", "value": 40 }, { "color": "red", "value": 20 }],
        'chart-2': [{ "color": "blue", "value": 100 }],
        'chart-3': [{ "color": "green", "value": 40 }, { "color": "red", "value": 60 }],
        'chart-4': [{ "color": "orange", "value": 33 }, { "color": "blue", "value": 55 }, { "color": "red", "value": 12 }],
        'chart-5': [{ "color": "orange", "value": 21 }, { "color": "green", "value": 30 }, { "color": "blue", "value": 34 }, { "color": "red", "value": 15 }],
        'chart-6': [{ "color": "green", "value": 40 }, { "color": "blue", "value": 40 }, { "color": "red", "value": 20 }],
        'chart-7': [{ "color": "blue", "value": 100 }],
        'chart-8': [{ "color": "green", "value": 40 }, { "color": "red", "value": 60 }],
        'chart-9': [{ "color": "orange", "value": 33 }, { "color": "blue", "value": 55 }, { "color": "red", "value": 12 }],
        'chart-10': [{ "color": "orange", "value": 21 }, { "color": "green", "value": 30 }, { "color": "blue", "value": 34 }, { "color": "red", "value": 15 }]
    }
};

// Color mappings
const colorMap = {
    'blue': '#3b82f6',
    'green': '#10b981',
    'red': '#ef4444',
    'orange': '#f59e0b'
};

// Category to color mapping
const categoryToColor = {
    'leave': 'orange',      // اجازة - برتقالي
    'absent': 'red',        // لم يحضروا - أحمر
    'late': 'green',        // متأخرين - أخضر
    'regular': 'blue'       // منتظمين - أزرق
};

// Current state
let currentFilter = 'departments';
let activeCategories = ['leave', 'absent', 'late', 'regular']; // All active by default
let selectedLegendCategory = null; // To store the currently selected legend category

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    addEventListeners();
    initializeDatePicker();
    addAnimations();
});

function initializeDashboard() {
    // Set default filter
    const defaultFilter = document.querySelector('input[name="filter"][value="departments"]');
    if (defaultFilter) {
        defaultFilter.checked = true;
        updateFilterLabel(defaultFilter);
    }
    
    // Initialize chart animations
    setTimeout(() => {
        animateCharts();
    }, 300);
    
    console.log('🎯 Advanced Dashboard initialized!');
}

function addEventListeners() {
    // Filter change listeners
    const filterInputs = document.querySelectorAll('input[name="filter"]');
    filterInputs.forEach(input => {
        input.addEventListener('change', handleFilterChange);
    });
 
    
    // Chart hover effects
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        container.addEventListener('mouseenter', handleChartHover);
        container.addEventListener('mouseleave', handleChartLeave);
        container.addEventListener('click', handleChartClick);
    });
    
    // Legend item interactions
    const legendItems = document.querySelectorAll('.legend-item');
    legendItems.forEach(item => {
        item.addEventListener('click', handleLegendClick);
    });
}

function handleFilterChange(event) {
    const selectedFilter = event.target.value;
    currentFilter = selectedFilter;
    
    // Update visual feedback
    updateFilterLabel(event.target);
    
    // Update charts with animation
    updateChartsData(selectedFilter);
    
    console.log(`Filter changed to: ${selectedFilter}`);
}

function updateFilterLabel(selectedInput) {
    // Remove active class from all filters
    document.querySelectorAll('.filter-label').forEach(label => {
        label.classList.remove('active');
    });
    
    // Add active class to selected filter
    const filterLabel = selectedInput.closest('.filter-option').querySelector('.filter-label');
    filterLabel.classList.add('active');
}

function handleSearchClick() {
    const searchBtn = document.getElementById('searchBtn');
    
    // Add click animation
    searchBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        searchBtn.style.transform = 'scale(1)';
    }, 150);
    
    // Simulate search functionality
    showSearchAnimation();
    
    // Simulate data refresh after search
    setTimeout(() => {
        refreshAllCharts();
    }, 1500);
    
    console.log('Search initiated - refreshing data...');
}

function showSearchAnimation() {
    const charts = document.querySelectorAll('.chart-container');
    
    charts.forEach((chart, index) => {
        setTimeout(() => {
            chart.classList.add('loading');
            
            setTimeout(() => {
                chart.classList.remove('loading');
            }, 1000);
        }, index * 100);
    });
}

function handleDatePickerClick() {
    const datePicker = document.getElementById('datePicker');
    
    // Add click animation
    datePicker.style.transform = 'scale(0.98)';
    setTimeout(() => {
        datePicker.style.transform = 'scale(1)';
    }, 150);
    
    // Simulate date selection
    setTimeout(() => {
        updateDateDisplay();
        refreshAllCharts();
    }, 500);
    
    console.log('Date picker clicked - updating date range...');
}

function handleChartHover(event) {
    const chart = event.currentTarget;
    const donutChart = chart.querySelector('.donut-chart');
    
    // Enhanced hover effect
    donutChart.style.transform = 'scale(1.1)';
    donutChart.style.filter = 'brightness(1.1)';
}

function handleChartLeave(event) {
    const chart = event.currentTarget;
    const donutChart = chart.querySelector('.donut-chart');
    
    // Reset hover effect
    donutChart.style.transform = 'scale(1)';
    donutChart.style.filter = 'brightness(1)';
}

function handleChartClick(event) {
    const chart = event.currentTarget;
    const chartId = chart.dataset.chartId;
    
    // Add click animation
    chart.style.transform = 'scale(0.98)';
    setTimeout(() => {
        chart.style.transform = 'scale(1)';
    }, 150);
    
    // Simulate chart drill-down
    console.log(`Chart ${chartId} clicked - showing detailed view...`);
    
    // You could implement a modal or detailed view here
    showChartDetails(chartId);
}

function showChartDetails(chartId) {
    // This could open a modal with detailed information
    const chartData = getCurrentChartData(chartId);
    console.log(`Chart ${chartId} details:`, chartData);
}

function handleLegendClick(event) {
    const legendItem = event.currentTarget;
    const category = legendItem.dataset.category;

    // Reset all legend items to active state first
    document.querySelectorAll('.legend-item').forEach(item => {
        item.classList.remove('inactive');
    });

    if (selectedLegendCategory === category) {
        // If the same category is clicked again, deselect it (show all)
        selectedLegendCategory = null;
    } else {
        // Select the new category
        selectedLegendCategory = category;
        // Add inactive class to all other legend items
        document.querySelectorAll('.legend-item').forEach(item => {
            if (item.dataset.category !== category) {
                item.classList.add('inactive');
            }
        });
    }

    // Update charts based on the new selection
    updateChartsBasedOnCategories();

    console.log(`Legend item clicked: ${category}. Selected category: ${selectedLegendCategory}`);
}

function initializeDatePicker() {
    // Set current date range as placeholder
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    updateDateDisplayWithDates(lastWeek, today);
}

function updateDateDisplay() {
    const today = new Date();
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    updateDateDisplayWithDates(lastMonth, today);
    
    // Add update animation
    const dateText = document.querySelector('.date-text');
    if (dateText) {
        dateText.style.color = '#3b82f6';
        setTimeout(() => {
            dateText.style.color = '#6b7280';
        }, 1000);
    }
}

function updateDateDisplayWithDates(startDate, endDate) {
    const dateText = document.querySelector('.date-text');
    if (dateText) {
        const formatDate = (date) => {
            return date.toLocaleDateString('ar-SA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        };
        
        dateText.textContent = `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
}

function animateCharts() {
    const charts = document.querySelectorAll('.chart-container');
    
    charts.forEach((chart, index) => {
        // Add initial animation delay
        chart.style.opacity = '0';
        chart.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            chart.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            chart.style.opacity = '1';
            chart.style.transform = 'translateY(0)';
            chart.classList.add('animate-in');
        }, index * 100);
    });
}

function updateChartsData(filterType) {
    const charts = document.querySelectorAll('.chart-container');
    
    // Add loading animation
    charts.forEach(chart => {
        chart.classList.add('loading');
    });
    
    // Simulate data loading
    setTimeout(() => {
        charts.forEach(chart => {
            const chartId = chart.dataset.chartId;
            updateSingleChart(chartId, filterType);
            chart.classList.remove('loading');
        });
        
        // Update chart titles based on filter
        updateChartTitles(filterType);
        
    }, 800);
}

function updateSingleChart(chartId, filterType = currentFilter) {
    const chartContainer = document.querySelector(`[data-chart-id="${chartId}"]`);
    if (!chartContainer) return;
    
    const donutChart = chartContainer.querySelector('.donut-chart');
    const chartInner = chartContainer.querySelector('.chart-inner');
    
    // Get new data
    const newData = chartData[filterType][chartId];
    if (!newData) return;
    
    // Update chart background (conic-gradient) based on selectedLegendCategory
    const gradient = generateConicGradient(newData, selectedLegendCategory);
    donutChart.style.background = gradient;
    
    // Update percentages display based on selectedLegendCategory
    updatePercentagesDisplay(chartInner, newData, selectedLegendCategory);
    
    // Add update animation
    donutChart.classList.add('updating');
    setTimeout(() => {
        donutChart.classList.remove('updating');
    }, 400);
}

function generateConicGradient(segments, filterCategory = null) {
    let currentAngle = 0;
    const gradientStops = [];
    
    // Convert category to color if filterCategory is provided
    const filterColor = filterCategory ? categoryToColor[filterCategory] : null;
    
    segments.forEach((segment) => {
        const startAngle = currentAngle;
        const endAngle = currentAngle + (segment.value * 3.6); // Convert percentage to degrees
        
        let color = colorMap[segment.color];
        if (filterColor && segment.color !== filterColor) {
            color = 'transparent'; // Make other segments transparent
        }
        
        gradientStops.push(`${color} ${startAngle}deg ${endAngle}deg`);
        currentAngle = endAngle;
    });
    
    return `conic-gradient(${gradientStops.join(', ')})`;
}

function updatePercentagesDisplay(chartInner, segments, filterCategory = null) {
    // Clear existing percentages
    chartInner.innerHTML = '';
    
    // Convert category to color if filterCategory is provided
    const filterColor = filterCategory ? categoryToColor[filterCategory] : null;
    
    // Add new percentages
    segments.forEach(segment => {
        if (!filterColor || segment.color === filterColor) {
            const percentageSpan = document.createElement('span');
            percentageSpan.className = `percentage ${segment.color}`;
            percentageSpan.textContent = `${segment.value}%`;
            chartInner.appendChild(percentageSpan);
        }
    });
}

function updateChartTitles(filterType) {
    const chartTitles = document.querySelectorAll('.chart-title');
    
    if (filterType === 'departments') {
        chartTitles.forEach((title, index) => {
            if (index < 5) {
                title.innerHTML = 'قسم تقنية المعلومات - IT Department';
            } else {
                title.innerHTML = 'قسم الموارد البشرية - HR Department<br>الإدارة العامة - General Management';
            }
        });
    } else if (filterType === 'locations') {
        chartTitles.forEach((title, index) => {
            if (index < 5) {
                title.innerHTML = 'Workshop location - الرياض';
            } else {
                title.innerHTML = 'مشروع حمراء الاسد - Hamara<br>المدينة - Al-Asad Project';
            }
        });
    }
}

function updateChartsBasedOnCategories() {
    // This function now just triggers a full chart update based on selectedLegendCategory
    const charts = document.querySelectorAll('.chart-container');
    charts.forEach(chart => {
        const chartId = chart.dataset.chartId;
        updateSingleChart(chartId, currentFilter);
    });
}

function refreshAllCharts() {
    // Simulate data refresh with random variations
    Object.keys(chartData).forEach(filterType => {
        Object.keys(chartData[filterType]).forEach(chartId => {
            // Add small random variations to simulate real data updates
            chartData[filterType][chartId] = chartData[filterType][chartId].map(segment => ({
                ...segment,
                value: Math.max(5, Math.min(95, segment.value + (Math.random() - 0.5) * 10))
            }));
        });
    });
    
    // Update current view
    updateChartsData(currentFilter);
    
    console.log('All charts refreshed with new data');
}

function getCurrentChartData(chartId) {
    return chartData[currentFilter][chartId];
}

function addAnimations() {
    // Add scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe chart containers
    document.querySelectorAll('.chart-container').forEach(container => {
        observer.observe(container);
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Handle Enter key on date picker
    if (event.key === 'Enter' && event.target.closest('.date-input-group')) {
        handleDatePickerClick();
    }
    
    // Handle space key on legend items
    if (event.key === ' ' && event.target.closest('.legend-item')) {
        event.preventDefault();
        handleLegendClick({ currentTarget: event.target.closest('.legend-item') });
    }
    
    // Handle Enter key on search button
    if (event.key === 'Enter' && event.target.closest('.search-btn')) {
        handleSearchClick();
    }
});

// Console welcome message
console.log('🚀 Advanced Dynamic Dashboard loaded!');
console.log('📊 Features:');
console.log('  • Dynamic chart updates');
console.log('  • Interactive search functionality');
console.log('  • Real-time data simulation');
console.log('  • Advanced animations');
console.log('  • Category filtering');
console.log('  • Responsive design');
console.log('  • Accessibility support');

    