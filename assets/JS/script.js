
// Scroll Effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".premium-header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


// Profile Dropdown
const profile = document.querySelector(".profile-section");
profile.addEventListener("click", () => {
  profile.classList.toggle("active");
});

// Quick Actions Dropdown
const quickDropdown = document.querySelector(".quick-actions-dropdown");
quickDropdown.addEventListener("click", () => {
  quickDropdown.classList.toggle("active");
});

// Mobile Menu Toggle
const mobileToggle = document.querySelector(".mobile-menu-toggle");
const mobileOverlay = document.querySelector(".mobile-overlay");
mobileToggle.addEventListener("click", () => {
  mobileOverlay.style.right = mobileOverlay.style.right === "0px" ? "-100%" : "0px";
});

// ========== GLOBAL VARIABLES ==========
let currentActiveTab = 1;
let currentSearchType = 'بحث';
let selectedLocation = 'مصر';
let selectedDepartment = 'قسم الموارد البشرية';
let selectedDateRange = 'اختار التاريخ من / إلى';



// Breadcrumb animation on load
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".breadcrumb-item");
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, index * 300); // delay لكل عنصر
    });
  });
  
// ========== DOCUMENT READY INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 HR Dashboard - Exact Match Initialized');
    
    // Initialize all components
    initializeStatisticsCards();
    initializeNavigationTabs();
    initializeSearchTypeButtons();
    initializeFilterDropdowns();
    initializeDatePicker();
    initializeResponsiveFeatures();
    
    // Show welcome message
    setTimeout(() => {
        showNotification('تم تحميل لوحة التحكم بنجاح', 'success');
    }, 1000);
});

// ========== STATISTICS CARDS ANIMATION ==========
function initializeStatisticsCards() {
    console.log('📊 Initializing Statistics Cards');
    
    const statCards = document.querySelectorAll('.stat-card');
    
    // Animate numbers on page load
    statCards.forEach((card, index) => {
        const numberElement = card.querySelector('.stat-number');
        const finalValue = parseFloat(numberElement.textContent);
        
        // Reset to 0 for animation
        numberElement.textContent = '0';
        
        // Animate with delay based on card index
        setTimeout(() => {
            animateNumber(numberElement, 0, finalValue, 1500);
        }, index * 200);
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            const label = this.querySelector('.stat-label').textContent;
            showStatCardDetails(label);
        });
    });
}

// ========== NUMBER ANIMATION FUNCTION ==========
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const isDecimal = end % 1 !== 0;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOutCubic;
        
        if (isDecimal) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = isDecimal ? end.toFixed(1) : end;
        }
    }
    
    requestAnimationFrame(updateNumber);
}


// ========== SEARCH TYPE BUTTONS FUNCTIONALITY ==========
function initializeSearchTypeButtons() {
    console.log('🔍 Initializing Search Type Buttons');
    
    const searchTypeButtons = document.querySelectorAll('.search-type-btn');
    
    searchTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            searchTypeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current search type
            currentSearchType = this.textContent.trim();
            
            // Update search view
            updateSearchView(currentSearchType);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            console.log(`🔍 Search type changed to: ${currentSearchType}`);
        });
    });
}

// ========== FILTER DROPDOWNS FUNCTIONALITY ==========
function initializeFilterDropdowns() {
    console.log('📋 Initializing Filter Dropdowns');
    
    const dropdowns = document.querySelectorAll('.dropdown-select');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', function() {
            const filterLabel = this.closest('.filter-dropdown').querySelector('.filter-label').textContent;
            const filterValue = this.value;
            const filterText = this.options[this.selectedIndex].text;
            
            // Update global variables
            switch(filterLabel) {
                case 'الموقع':
                    selectedLocation = filterText;
                    break;
                case 'القسم':
                    selectedDepartment = filterText;
                    break;
            }
            
            updateFilterData(filterLabel, filterText);
            
            // Add visual feedback
            this.style.borderColor = '#27ae60';
            setTimeout(() => {
                this.style.borderColor = '#e1e8ed';
            }, 1000);
            
            console.log(`📋 ${filterLabel} changed to: ${filterText}`);
        });
        
        // Add hover effect
        dropdown.addEventListener('mouseenter', function() {
            this.style.borderColor = '#3498db';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (this !== document.activeElement) {
                this.style.borderColor = '#e1e8ed';
            }
        });
    });
}

// ========== DATE PICKER FUNCTIONALITY ==========
function initializeDatePicker() {
    console.log('📅 Initializing Date Picker');
    
    const dateInput = document.querySelector('.date-input');
    
    if (dateInput) {
        dateInput.addEventListener('click', function() {
            showDatePicker();
        });
        
        dateInput.addEventListener('focus', function() {
            showDatePicker();
        });
    }
}

function showDatePicker() {
    // Simulate date picker opening
    // showNotification('فتح منتقي التاريخ', 'info');
    
    // Here you would integrate with a date picker library
    // For now, we'll simulate date selection
    setTimeout(() => {
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        const dateRange = `${today.toLocaleDateString('ar-EG')} - ${nextWeek.toLocaleDateString('ar-EG')}`;
        
        const dateInput = document.querySelector('.date-input');
        if (dateInput) {
            dateInput.value = dateRange;
            selectedDateRange = dateRange;
        }
        
        updateDateFilter(dateRange);
        // showNotification('تم تحديد نطاق التاريخ', 'success');
    }, 1500);
}

// ========== UPDATE FUNCTIONS ==========
function updateSearchView(searchType) {
    showNotification(`تم تغيير نوع البحث إلى: ${searchType}`, 'info');
    
    // Simulate data loading based on search type
    simulateDataLoading();
}

function updateFilterData(filterName, filterValue) {
    showNotification(`تم تحديث فلتر ${filterName} إلى: ${filterValue}`, 'success');
    
    // Simulate data loading based on filter
    simulateDataLoading();
}

function updateDateFilter(dateRange) {
    // showNotification(`تم تحديد التاريخ: ${dateRange}`, 'info');
    
    // Simulate data loading based on date
    simulateDataLoading();
}

// ========== UTILITY FUNCTIONS ==========
function showStatCardDetails(statType) {
    
    // Here you would show detailed view for the selected statistic
    console.log(`📊 Showing details for: ${statType}`);
}

function simulateDataLoading() {
    const tableContainer = document.querySelector('.table-placeholder');
    

    
    // Simulate loading time
    setTimeout(() => {
        const resultCount = Math.floor(Math.random() * 50) + 10;
        tableContainer.innerHTML = `
            <div class="placeholder-content">
                <div class="placeholder-icon">
                    <i class="fas fa-check-circle text-success"></i>
                </div>
                <h4 class="placeholder-title text-success">تم تحميل البيانات</h4>
                <p class="placeholder-text">تم العثور على ${resultCount} سجل</p>
                <div class="mt-4">
                    <button class="btn btn-success me-2" onclick="exportCurrentData()">
                        <i class="fas fa-download me-2"></i>
                        تصدير البيانات
                    </button>
                    <button class="btn btn-outline-success" onclick="refreshData()">
                        <i class="fas fa-sync me-2"></i>
                        تحديث
                    </button>
                </div>
            </div>
        `;
    }, 2000);
}

// ========== ACTION FUNCTIONS ==========
function exportReport(reportType) {
    showNotification(`جاري تصدير تقرير ${reportType}...`, 'info');
    
    setTimeout(() => {
        showNotification(`تم تصدير تقرير ${reportType} بنجاح`, 'success');
    }, 2000);
}

function printReport() {
    showNotification('جاري تحضير التقرير للطباعة...', 'info');
    
    setTimeout(() => {
        window.print();
    }, 1000);
}

function exportCurrentData() {
    showNotification('جاري تصدير البيانات الحالية...', 'info');
    
    setTimeout(() => {
        showNotification('تم تصدير البيانات بنجاح', 'success');
    }, 1500);
}

function refreshData() {
    // showNotification('جاري تحديث البيانات...', 'info');
    simulateDataLoading();
}

function generateReport() {
    showNotification('جاري إنشاء التقرير...', 'info');
    
    setTimeout(() => {
        showNotification('تم إنشاء التقرير بنجاح', 'success');
    }, 2000);
}

function markAttendance() {
    showNotification('فتح نموذج تسجيل الحضور', 'info');
}

function showDashboard() {
    showNotification('عرض لوحة التحكم الرئيسية', 'info');
}

function manageEmployees() {
    showNotification('فتح إدارة الموظفين', 'info');
}

// ========== RESPONSIVE FEATURES ==========
function initializeResponsiveFeatures() {
    console.log('📱 Initializing Responsive Features');
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const width = window.innerWidth;
        
        if (width < 768) {
            adjustMobileLayout();
        } else {
            adjustDesktopLayout();
        }
    });
    
    // Initial check
    if (window.innerWidth < 768) {
        adjustMobileLayout();
    }
}

function adjustMobileLayout() {
    console.log('📱 Adjusting for mobile layout');
    
    // Hide tab numbers on mobile
    const tabNumbers = document.querySelectorAll('.tab-number');
    tabNumbers.forEach(num => {
        num.style.display = 'none';
    });
}

function adjustDesktopLayout() {
    console.log('🖥️ Adjusting for desktop layout');
    
    // Show tab numbers on desktop
    const tabNumbers = document.querySelectorAll('.tab-number');
    tabNumbers.forEach(num => {
        num.style.display = 'flex';
    });
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px; 
        left: 20px; 
        z-index: 9999; 
        min-width: 300px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        border: none;
    `;
    
    let iconClass = '';
    switch(type) {
        case 'success': iconClass = 'fas fa-check-circle'; break;
        case 'info': iconClass = 'fas fa-info-circle'; break;
        case 'warning': iconClass = 'fas fa-exclamation-triangle'; break;
        case 'danger': iconClass = 'fas fa-times-circle'; break;
        default: iconClass = 'fas fa-info-circle';
    }
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="${iconClass} me-2"></i>
            <span>${message}</span>
        </div>
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + E for export
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportCurrentData();
    }
    
    // Ctrl/Cmd + R for refresh
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        refreshData();
    }
    
    // Ctrl/Cmd + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printReport();
    }
});

// ========== PERFORMANCE MONITORING ==========
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Dashboard loaded in ${Math.round(loadTime)}ms`);
    
    if (loadTime > 3000) {
        console.warn('⚠️ Dashboard took longer than expected to load');
    }
});


// ========== CONSOLE WELCOME MESSAGE ==========
console.log(`
🎯 HR Dashboard - Exact Match v1.0
📊 نظام إدارة الموارد البشرية
✨ تطابق دقيق مع التصميم المطلوب
🔧 تم التطوير بأحدث المعايير
`);

// ========== END OF SCRIPT ==========

// ======================== NAVIGATION ================================
document.addEventListener("DOMContentLoaded", () => {
    const NavigationAnimator = {
      // --- Configuration ---
      config: {
        selectors: {
          navTabs: ".nav-tab-item",
          navWrapper: ".nav-tabs-wrapper",
          navContainer: ".nav-tabs-container",
          navPrev: "#navLeft",
          navNext: "#navRight",
        },
        animation: {
          groups: [
            { count: 4, duration: 4000 }, // الرئيسية
            { count: 4, duration: 4000 }, // الطلبات
            { count: 2, duration: 3000 },
            { count: 5, duration: 5000 },
            { count: 5, duration: 5000 },
            { count: 5, duration: 5000 },
            { count: 3, duration: 4000 },
          ],
          transitionDuration: 600,
          staggerDelay: 100,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          userInteractionDelay: 12000,
        },
      },
  
      // --- State ---
      state: {
        currentGroupIndex: 0,
        animationTimer: null,
        isUserInteracting: false,
        isAnimating: false,
        totalTabs: 0,
      },
  
      // --- Elements ---
      elements: {},
  
      // --- Init ---
      init() {
        this.cacheDOMElements();
        if (!this.validateElements()) return;
  
        this.setupInitialState();
        this.bindEvents();
        this.scheduleNextAnimation(); // 👈 مش هننقل على طول، بس نحجز التايمر
      },
  
      cacheDOMElements() {
        this.elements.navTabs = document.querySelectorAll(this.config.selectors.navTabs);
        this.elements.navWrapper = document.querySelector(this.config.selectors.navWrapper);
        this.elements.navContainer = document.querySelector(this.config.selectors.navContainer);
        this.elements.navPrev = document.querySelector(this.config.selectors.navPrev);
        this.elements.navNext = document.querySelector(this.config.selectors.navNext);
      },
  
      validateElements() {
        if (!this.elements.navWrapper || !this.elements.navTabs.length) {
          console.warn("Navigation elements not found");
          return false;
        }
        this.state.totalTabs = this.elements.navTabs.length;
        return true;
      },
  
      setupInitialState() {
        const container = this.elements.navContainer;
        if (container) {
          container.style.overflow = "hidden";
          container.style.position = "relative";
        }
  
        const wrapper = this.elements.navWrapper;
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";
        wrapper.style.gap = "8px";
        wrapper.style.transition = `transform ${this.config.animation.transitionDuration}ms ${this.config.animation.easing}`;
  
        this.elements.navTabs.forEach((tab, index) => {
          tab.style.opacity = "0";
          tab.style.transform = "translateX(30px)";
          tab.style.transition = `all ${this.config.animation.transitionDuration}ms ${this.config.animation.easing}`;
          tab.style.pointerEvents = "none";
          tab.style.display = "none";
          tab.setAttribute("data-index", index);
        });
  
        this.showGroup(0); // 👈 إظهار الرئيسية فقط في البداية
      },
  
      bindEvents() {
        this.elements.navTabs.forEach((tab) => {
          tab.addEventListener("click", () => this.handleTabClick(tab));
        });
  
        this.elements.navContainer.addEventListener("mouseenter", () => this.pauseAnimation());
        this.elements.navContainer.addEventListener("mouseleave", () => {
          if (!this.state.isUserInteracting) this.resumeAnimation();
        });
  
        if (this.elements.navNext) this.elements.navNext.addEventListener("click", () => this.nextGroup());
        if (this.elements.navPrev) this.elements.navPrev.addEventListener("click", () => this.prevGroup());
      },
  
      // --- Animation ---
      scheduleNextAnimation() {
        const currentGroup = this.config.animation.groups[this.state.currentGroupIndex];
        this.state.animationTimer = setTimeout(() => this.animateToNextGroup(), currentGroup.duration);
      },
  
      pauseAnimation() {
        if (this.state.animationTimer) {
          clearTimeout(this.state.animationTimer);
          this.state.animationTimer = null;
        }
      },
  
      resumeAnimation() {
        if (!this.state.isUserInteracting && !this.state.isAnimating) {
          this.scheduleNextAnimation();
        }
      },
  
      animateToNextGroup() {
        if (this.state.isUserInteracting || this.state.isAnimating) return;
        this.state.isAnimating = true;
  
        const currentGroup = this.config.animation.groups[this.state.currentGroupIndex];
  
        this.hideCurrentGroup(() => {
          this.state.currentGroupIndex = (this.state.currentGroupIndex + 1) % this.config.animation.groups.length;
          this.showGroup(this.state.currentGroupIndex);
          this.state.isAnimating = false;
  
          if (!this.state.isUserInteracting) this.scheduleNextAnimation();
        });
      },
  
      // --- Groups ---
      showGroup(groupIndex) {
        const group = this.config.animation.groups[groupIndex];
        if (!group) return;
  
        let startIndex = 0;
        for (let i = 0; i < groupIndex; i++) startIndex += this.config.animation.groups[i].count;
  
        for (let i = 0; i < group.count; i++) {
          const tab = this.elements.navTabs[startIndex + i];
          if (!tab) continue;
  
          tab.style.display = "flex";
          setTimeout(() => {
            tab.style.opacity = "1";
            tab.style.transform = "translateX(0)";
            tab.style.pointerEvents = "auto";
            tab.classList.add("visible");
  
            tab.style.transform = "translateX(0) scale(1.05)";
            setTimeout(() => (tab.style.transform = "translateX(0) scale(1)"), 200);
          }, i * this.config.animation.staggerDelay);
        }
  
        this.setActiveTab(startIndex);
      },
  
      hideCurrentGroup(callback) {
        const currentGroup = this.config.animation.groups[this.state.currentGroupIndex];
        if (!currentGroup) return callback();
  
        let startIndex = 0;
        for (let i = 0; i < this.state.currentGroupIndex; i++) startIndex += this.config.animation.groups[i].count;
  
        let hiddenCount = 0;
        for (let i = 0; i < currentGroup.count; i++) {
          const tab = this.elements.navTabs[startIndex + i];
          if (!tab) { hiddenCount++; continue; }
  
          setTimeout(() => {
            tab.style.opacity = "0";
            tab.style.transform = "translateX(-30px) scale(0.95)";
            tab.style.pointerEvents = "none";
            tab.classList.remove("visible");
  
            setTimeout(() => {
              tab.style.display = "none";
              hiddenCount++;
              if (hiddenCount === currentGroup.count) callback();
            }, this.config.animation.transitionDuration);
          }, i * (this.config.animation.staggerDelay / 2));
        }
      },
  
      setActiveTab(tabIndex) {
        this.elements.navTabs.forEach((tab) => tab.classList.remove("active"));
        if (this.elements.navTabs[tabIndex]) this.elements.navTabs[tabIndex].classList.add("active");
      },
  
      // --- User ---
      handleTabClick(clickedTab) {
        this.state.isUserInteracting = true;
        this.pauseAnimation();
  
        this.elements.navTabs.forEach((tab) => tab.classList.remove("active"));
        clickedTab.classList.add("active");
  
        clickedTab.style.transform = "translateX(0) scale(0.95)";
        setTimeout(() => (clickedTab.style.transform = "translateX(0) scale(1)"), 150);
  
        setTimeout(() => {
          this.state.isUserInteracting = false;
          this.resumeAnimation();
        }, this.config.animation.userInteractionDelay);
      },
  
      // --- Public ---
      nextGroup() {
        this.goToGroup((this.state.currentGroupIndex + 1) % this.config.animation.groups.length);
      },
      prevGroup() {
        this.goToGroup((this.state.currentGroupIndex - 1 + this.config.animation.groups.length) % this.config.animation.groups.length);
      },
      goToGroup(groupIndex) {
        if (this.state.isAnimating) return;
        if (groupIndex < 0 || groupIndex >= this.config.animation.groups.length) return;
  
        this.state.isUserInteracting = true;
        this.pauseAnimation();
        this.state.isAnimating = true;
  
        this.hideCurrentGroup(() => {
          this.state.currentGroupIndex = groupIndex;
          this.showGroup(groupIndex);
  
          this.state.isAnimating = false;
          setTimeout(() => {
            this.state.isUserInteracting = false;
            this.resumeAnimation();
          }, this.config.animation.userInteractionDelay);
        });
      },
    };
  
    // تشغيل
    NavigationAnimator.init();
    window.NavigationAnimator = NavigationAnimator;
  });
  
// =============================================
document.addEventListener("DOMContentLoaded", () => {
    console.log('🚀 HR Dashboard Initialized');

    // --- Navbar and Dropdowns Activation ---
    
    // 1. Scroll Effect for Header
    const header = document.querySelector(".premium-header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 30) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // 2. Generic Dropdown Toggler
    const setupDropdown = (triggerSelector, containerSelector) => {
        const trigger = document.querySelector(triggerSelector);
        if (trigger) {
            const container = trigger.closest(containerSelector);
            trigger.addEventListener("click", (event) => {
                event.stopPropagation();
                // Close other active dropdowns first
                document.querySelectorAll('.profile-section.active, .quick-actions-dropdown.active, .reports-dropdown.active').forEach(d => {
                    if (d !== container) {
                        d.classList.remove('active');
                    }
                });
                container.classList.toggle("active");
            });
        }
    };
    
    // 3. Activate all dropdowns
    setupDropdown(".profile-wrapper", ".profile-section");
    setupDropdown(".quick-btn", ".quick-actions-dropdown");
    setupDropdown(".reports-btn", ".reports-dropdown");

    // Close dropdowns when clicking anywhere on the page
    window.addEventListener("click", () => {
        document.querySelectorAll('.profile-section.active, .quick-actions-dropdown.active, .reports-dropdown.active').forEach(d => {
            d.classList.remove('active');
        });
    });

  
    // Initialize the animator
    NavigationAnimator.init();
});
// ==========================================================
        // Professional-grade JavaScript functions for handling actions
        function handleExport() {
            console.log('Export action triggered');
            // In a real application, you would trigger a file download here.
            // For example: window.location.href = '/api/export/csv';
            alert('سيتم بدء عملية التصدير.');
        }

        function handlePrint() {
            console.log('Print action triggered');
            // Triggers the browser's print dialog
            window.print();
        }

        function handleFilter() {
            console.log('Filter action triggered');
            // In a real application, this would open a filter modal or sidebar.
            alert('سيتم فتح خيارات التصنيف.');
        }