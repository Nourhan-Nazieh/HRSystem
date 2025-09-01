// ========== Enhanced HR Dashboard JavaScript - Navigation Fixed Version ==========
// إصلاح مشكلة التنقل وضمان عمل جميع الوظائف بشكل صحيح

// ========== GLOBAL VARIABLES ==========
let currentActiveTab = 1;
let currentGroup = 1;
let maxGroups = 6;
let isNavigationInitialized = false;

// ========== DOCUMENT READY INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Enhanced HR Dashboard - Navigation Fixed Version Initialized');
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
    
    // Initialize all components
    initializeHeader();
    initializeStatisticsCards();
    initializeNavigationTabs();
    initializeContentPanels();
    initializeSearchFeatures();
    initializeDropdowns();
    initializeResponsiveFeatures();
    
    // Show home content by default
    showHomeContent();
    
    // Show welcome message
    setTimeout(() => {
        showNotification('تم تحميل لوحة التحكم بنجاح', 'success');
    }, 1000);
});

// ========== ENHANCED HEADER FUNCTIONALITY ==========
function initializeHeader() {
    console.log('🎯 Initializing Enhanced Header');
    
    // Scroll Effect with enhanced performance
    let ticking = false;
    
    function updateHeader() {
        const header = document.querySelector(".premium-header");
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
        ticking = false;
    }
    
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
    
    // Enhanced Profile Dropdown
    const profile = document.querySelector(".profile-section");
    if (profile) {
        profile.addEventListener("click", (e) => {
            e.stopPropagation();
            profile.classList.toggle("active");
        });
        
        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
            if (!profile.contains(e.target)) {
                profile.classList.remove("active");
            }
        });
    }
    
    // Enhanced Quick Actions Dropdown
    const quickDropdown = document.querySelector(".quick-actions-dropdown");
    if (quickDropdown) {
        const quickBtn = quickDropdown.querySelector(".quick-btn");
        if (quickBtn) {
            quickBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                quickDropdown.classList.toggle("active");
                
                // Close other dropdowns
                document.querySelectorAll('.reports-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
            if (!quickDropdown.contains(e.target)) {
                quickDropdown.classList.remove("active");
            }
        });
    }
    
    // Enhanced Reports Dropdown
    const reportsDropdown = document.querySelector(".reports-dropdown");
    if (reportsDropdown) {
        const reportsBtn = reportsDropdown.querySelector(".reports-btn");
        if (reportsBtn) {
            reportsBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                reportsDropdown.classList.toggle("active");
                
                // Close other dropdowns
                document.querySelectorAll('.quick-actions-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
            if (!reportsDropdown.contains(e.target)) {
                reportsDropdown.classList.remove("active");
            }
        });
    }
    
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
            showNotification('قائمة الجوال قيد التطوير', 'info');
        });
    }
}

// ========== ENHANCED STATISTICS CARDS ANIMATION ==========
function initializeStatisticsCards() {
    console.log('📊 Initializing Enhanced Statistics Cards');
    
    const statCards = document.querySelectorAll('.stat-card');
    
    // Enhanced number animation with better easing
    statCards.forEach((card, index) => {
        const numberElement = card.querySelector('.stat-number');
        if (!numberElement) return;
        
        const finalValue = parseFloat(numberElement.textContent);
        
        // Reset to 0 for animation
        numberElement.textContent = '0';
        
        // Animate with staggered delay
        setTimeout(() => {
            animateNumber(numberElement, 0, finalValue, 2000);
        }, index * 150);
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Add glow effect
            const icon = this.querySelector('.stat-icon');
            if (icon) {
                icon.style.boxShadow = '0 0 20px rgba(69, 177, 163, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Remove glow effect
            const icon = this.querySelector('.stat-icon');
            if (icon) {
                icon.style.boxShadow = 'none';
            }
        });
        
        // Enhanced click effect with ripple
        card.addEventListener('click', function(e) {
            const label = this.querySelector('.stat-label').textContent;
            createRippleEffect(e, this);
            showStatCardDetails(label);
        });
    });
}

// ========== ENHANCED NUMBER ANIMATION ==========
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const isDecimal = end % 1 !== 0;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Enhanced easing function (cubic-bezier)
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
            
            // Add completion effect
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// ========== ENHANCED NAVIGATION TABS - FIXED VERSION ==========
function initializeNavigationTabs() {
    console.log('🧭 Initializing Enhanced Navigation Tabs - Fixed Version');
    
    const tabsWrapper = document.getElementById('tabsWrapper');
    const leftArrow = document.getElementById('navLeft');
    const rightArrow = document.getElementById('navRight');
    const allTabs = document.querySelectorAll('.nav-tab-item');
    
    if (!tabsWrapper || !leftArrow || !rightArrow || allTabs.length === 0) {
        console.warn('Navigation elements not found');
        return;
    }
    
    // Function to show tabs for a specific group
    function showTabsForGroup(groupNumber) {
        console.log(`🔄 Switching to group ${groupNumber}`);
        
        // Hide all tabs first
        allTabs.forEach(tab => {
            tab.classList.remove('visible');
            tab.style.display = 'none';
        });
        
        // Show tabs for current group with staggered animation
        const groupTabs = Array.from(allTabs).filter(tab => 
            parseInt(tab.dataset.group) === groupNumber
        );
        
        console.log(`Found ${groupTabs.length} tabs for group ${groupNumber}`);
        
        groupTabs.forEach((tab, index) => {
            setTimeout(() => {
                tab.style.display = 'block';
                setTimeout(() => {
                    tab.classList.add('visible');
                }, 50);
            }, index * 100);
        });
        
        // Update arrow states
        leftArrow.disabled = groupNumber === 1;
        rightArrow.disabled = groupNumber === maxGroups;
        
        // Update arrow opacity
        leftArrow.style.opacity = groupNumber === 1 ? '0.5' : '1';
        rightArrow.style.opacity = groupNumber === maxGroups ? '0.5' : '1';
        
        // Update current group
        currentGroup = groupNumber;
    }
    
    // Enhanced arrow click handlers
    leftArrow.addEventListener('click', () => {
        if (currentGroup > 1) {
            showTabsForGroup(currentGroup - 1);
            
            // Add click animation
            leftArrow.style.transform = 'scale(0.9)';
            setTimeout(() => {
                leftArrow.style.transform = 'scale(1)';
            }, 150);
            
            showNotification(`انتقال إلى المجموعة ${currentGroup}`, 'info');
        }
    });
    
    rightArrow.addEventListener('click', () => {
        if (currentGroup < maxGroups) {
            showTabsForGroup(currentGroup + 1);
            
            // Add click animation
            rightArrow.style.transform = 'scale(0.9)';
            setTimeout(() => {
                rightArrow.style.transform = 'scale(1)';
            }, 150);
            
            showNotification(`انتقال إلى المجموعة ${currentGroup}`, 'info');
        }
    });
    
    // Enhanced tab click handlers - FIXED VERSION
    allTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            allTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Add click animation
            const content = this.querySelector('.nav-tab-content');
            if (content) {
                content.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    content.style.transform = 'scale(1)';
                }, 150);
            }
            
            // Get tab data and call appropriate function
            const tabData = this.dataset.tab;
            console.log(`🎯 Tab clicked: ${tabData}`);
            
            // Call the appropriate content function based on tab data
            switch(tabData) {
                case 'home':
                    showHomeContent();
                    break;
                case 'attendance':
                    showAttendanceContent();
                    break;
                case 'alerts':
                    showAlertsContent();
                    break;
                case 'leave-reports':
                    showLeaveReportsContent();
                    break;
                case 'requests':
                    showRequestsContent();
                    break;
                case 'recent-requests':
                    showRecentRequestsContent();
                    break;
                case 'all-requests':
                    showAllRequestsContent();
                    break;
                case 'approvals':
                    showApprovalsContent();
                    break;
                case 'performance':
                    showPerformanceContent();
                    break;
                case 'performance-requests':
                    showPerformanceRequestsContent();
                    break;
                case 'employees':
                    showEmployeesContent();
                    break;
                case 'employee-list':
                    showEmployeeListContent();
                    break;
                case 'new-employee':
                    showNewEmployeeContent();
                    break;
                case 'employee-info':
                    showEmployeeInfoContent();
                    break;
                case 'work-hours':
                    showWorkHoursContent();
                    break;
                case 'control':
                    showControlContent();
                    break;
                case 'permissions':
                    showPermissionsContent();
                    break;
                case 'settings':
                    showSettingsContent();
                    break;
                case 'reports':
                    showReportsContent();
                    break;
                default:
                    console.warn(`Unknown tab: ${tabData}`);
                    showGenericContent(tabData);
            }
            
            // Update breadcrumb
            updateBreadcrumb(this);
        });
    });
    
    // Initialize with first group
    showTabsForGroup(currentGroup);
    isNavigationInitialized = true;
    
    console.log('✅ Navigation tabs initialized successfully');
}

// ========== CONTENT PANELS MANAGEMENT ==========
function initializeContentPanels() {
    console.log('📄 Initializing Content Panels');
    
    // Hide all content panels except home
    const contentPanels = document.querySelectorAll('.content-panel');
    contentPanels.forEach(panel => {
        if (panel.id !== 'homeContent') {
            panel.classList.remove('active');
        }
    });
    
    // Ensure home content is visible
    const homeContent = document.getElementById('homeContent');
    if (homeContent) {
        homeContent.classList.add('active');
    }
}

// ========== CONTENT SWITCHING FUNCTIONS - FIXED VERSION ==========
function showContent(contentId) {
    console.log(`🔄 Switching to content: ${contentId}`);
    
    // Hide all content panels
    const contentPanels = document.querySelectorAll('.content-panel');
    contentPanels.forEach(panel => {
        panel.classList.remove('active');
        panel.style.display = 'none';
    });
    
    // Show selected content panel
    const targetPanel = document.getElementById(contentId);
    if (targetPanel) {
        targetPanel.style.display = 'block';
        setTimeout(() => {
            targetPanel.classList.add('active');
        }, 50);
        console.log(`✅ Content ${contentId} is now active`);
    } else {
        console.error(`❌ Content panel ${contentId} not found! Showing generic content.`);
        // Show generic content instead
        showGenericContentPanel(contentId);
    }
}

function showGenericContentPanel(contentType) {
    const genericPanel = document.getElementById('genericContent');
    if (genericPanel) {
        // Update generic content
        const title = document.getElementById('genericTitle');
        const description = document.getElementById('genericDescription');
        
        if (title) title.innerHTML = `<i class="fas fa-file me-2"></i>${getContentTitle(contentType)}`;
        if (description) description.textContent = getContentDescription(contentType);
        
        // Show generic panel
        genericPanel.style.display = 'block';
        setTimeout(() => {
            genericPanel.classList.add('active');
        }, 50);
        
        console.log(`✅ Generic content shown for: ${contentType}`);
    }
}

function getContentTitle(contentType) {
    const titles = {
        'requests': 'الطلبات',
        'recent-requests': 'الطلبات الحديثة',
        'all-requests': 'جميع الطلبات',
        'approvals': 'تسلسل الموافقات',
        'performance': 'تقييم الأداء',
        'performance-requests': 'طلبات التقييم',
        'employees': 'الموظفين',
        'employee-list': 'قائمة الموظفين',
        'new-employee': 'موظف جديد',
        'employee-info': 'معلومات الموظف',
        'work-hours': 'أوقات العمل',
        'control': 'التحكم',
        'permissions': 'الصلاحيات',
        'settings': 'الإعدادات',
        'reports': 'التقارير'
    };
    return titles[contentType] || 'محتوى الصفحة';
}

function getContentDescription(contentType) {
    const descriptions = {
        'requests': 'إدارة وعرض جميع الطلبات',
        'recent-requests': 'عرض الطلبات الحديثة',
        'all-requests': 'عرض جميع الطلبات في النظام',
        'approvals': 'إدارة تسلسل الموافقات',
        'performance': 'نظام تقييم الأداء',
        'performance-requests': 'طلبات تقييم الأداء',
        'employees': 'إدارة بيانات الموظفين',
        'employee-list': 'قائمة جميع الموظفين',
        'new-employee': 'إضافة موظف جديد',
        'employee-info': 'عرض معلومات الموظف',
        'work-hours': 'إدارة أوقات العمل',
        'control': 'لوحة التحكم الرئيسية',
        'permissions': 'إدارة صلاحيات المستخدمين',
        'settings': 'إعدادات النظام',
        'reports': 'التقارير والإحصائيات'
    };
    return descriptions[contentType] || 'وصف المحتوى';
}

// ========== INDIVIDUAL CONTENT FUNCTIONS ==========
function showHomeContent() {
    console.log('🏠 Showing Home Content');
    showContent('homeContent');
    updateBreadcrumbText('الرئيسية', 'لوحة التحكم');
    showNotification('تم عرض الصفحة الرئيسية', 'success');
}

function showAttendanceContent() {
    console.log('👥 Showing Attendance Content');
    showContent('attendanceContent');
    updateBreadcrumbText('الرئيسية', 'الحضور والانصراف');
    showNotification('تم عرض صفحة الحضور والانصراف', 'info');
}

function showAlertsContent() {
    console.log('🔔 Showing Alerts Content');
    showContent('alertsContent');
    updateBreadcrumbText('الرئيسية', 'التنبيهات والإنذارات');
    showNotification('تم عرض صفحة التنبيهات والإنذارات', 'info');
}

function showLeaveReportsContent() {
    console.log('📅 Showing Leave Reports Content');
    showContent('leaveReportsContent');
    updateBreadcrumbText('الرئيسية', 'تقارير الإجازات');
    showNotification('تم عرض صفحة تقارير الإجازات', 'info');
}

function showRequestsContent() {
    console.log('📋 Showing Requests Content');
    showGenericContentPanel('requests');
    updateBreadcrumbText('الرئيسية', 'الطلبات');
    showNotification('تم عرض صفحة الطلبات', 'info');
}

function showRecentRequestsContent() {
    console.log('🕒 Showing Recent Requests Content');
    showGenericContentPanel('recent-requests');
    updateBreadcrumbText('الرئيسية', 'الطلبات الحديثة');
    showNotification('تم عرض صفحة الطلبات الحديثة', 'info');
}

function showAllRequestsContent() {
    console.log('📝 Showing All Requests Content');
    showGenericContentPanel('all-requests');
    updateBreadcrumbText('الرئيسية', 'جميع الطلبات');
    showNotification('تم عرض صفحة جميع الطلبات', 'info');
}

function showApprovalsContent() {
    console.log('✅ Showing Approvals Content');
    showGenericContentPanel('approvals');
    updateBreadcrumbText('الرئيسية', 'تسلسل الموافقات');
    showNotification('تم عرض صفحة تسلسل الموافقات', 'info');
}

function showPerformanceContent() {
    console.log('📈 Showing Performance Content');
    showGenericContentPanel('performance');
    updateBreadcrumbText('الرئيسية', 'تقييم الأداء');
    showNotification('تم عرض صفحة تقييم الأداء', 'info');
}

function showPerformanceRequestsContent() {
    console.log('⭐ Showing Performance Requests Content');
    showGenericContentPanel('performance-requests');
    updateBreadcrumbText('الرئيسية', 'طلبات التقييم');
    showNotification('تم عرض صفحة طلبات التقييم', 'info');
}

function showEmployeesContent() {
    console.log('👥 Showing Employees Content');
    showGenericContentPanel('employees');
    updateBreadcrumbText('الرئيسية', 'الموظفين');
    showNotification('تم عرض صفحة الموظفين', 'info');
}

function showEmployeeListContent() {
    console.log('📋 Showing Employee List Content');
    showGenericContentPanel('employee-list');
    updateBreadcrumbText('الرئيسية', 'قائمة الموظفين');
    showNotification('تم عرض قائمة الموظفين', 'info');
}

function showNewEmployeeContent() {
    console.log('➕ Showing New Employee Content');
    showGenericContentPanel('new-employee');
    updateBreadcrumbText('الرئيسية', 'موظف جديد');
    showNotification('تم عرض صفحة موظف جديد', 'info');
}

function showEmployeeInfoContent() {
    console.log('🆔 Showing Employee Info Content');
    showGenericContentPanel('employee-info');
    updateBreadcrumbText('الرئيسية', 'معلومات الموظف');
    showNotification('تم عرض صفحة معلومات الموظف', 'info');
}

function showWorkHoursContent() {
    console.log('🕐 Showing Work Hours Content');
    showGenericContentPanel('work-hours');
    updateBreadcrumbText('الرئيسية', 'أوقات العمل');
    showNotification('تم عرض صفحة أوقات العمل', 'info');
}

function showControlContent() {
    console.log('⚙️ Showing Control Content');
    showGenericContentPanel('control');
    updateBreadcrumbText('الرئيسية', 'التحكم');
    showNotification('تم عرض صفحة التحكم', 'info');
}

function showPermissionsContent() {
    console.log('🔑 Showing Permissions Content');
    showGenericContentPanel('permissions');
    updateBreadcrumbText('الرئيسية', 'الصلاحيات');
    showNotification('تم عرض صفحة الصلاحيات', 'info');
}

function showSettingsContent() {
    console.log('⚙️ Showing Settings Content');
    showGenericContentPanel('settings');
    updateBreadcrumbText('الرئيسية', 'الإعدادات');
    showNotification('تم عرض صفحة الإعدادات', 'info');
}

function showReportsContent() {
    console.log('📊 Showing Reports Content');
    showGenericContentPanel('reports');
    updateBreadcrumbText('الرئيسية', 'التقارير');
    showNotification('تم عرض صفحة التقارير', 'info');
}

function showDailyReportContent() {
    console.log('📅 Showing Daily Report Content');
    showGenericContentPanel('daily-report');
    updateBreadcrumbText('الرئيسية', 'تقرير يومي');
    showNotification('تم عرض التقرير اليومي', 'info');
}

function showMonthlyReportContent() {
    console.log('📅 Showing Monthly Report Content');
    showGenericContentPanel('monthly-report');
    updateBreadcrumbText('الرئيسية', 'تقرير شهري');
    showNotification('تم عرض التقرير الشهري', 'info');
}

function showYearlyReportContent() {
    console.log('📅 Showing Yearly Report Content');
    showGenericContentPanel('yearly-report');
    updateBreadcrumbText('الرئيسية', 'تقرير سنوي');
    showNotification('تم عرض التقرير السنوي', 'info');
}

function showLeaveRequestContent() {
    console.log('📅 Showing Leave Request Content');
    showGenericContentPanel('leave-request');
    updateBreadcrumbText('الرئيسية', 'طلب إجازة');
    showNotification('تم عرض صفحة طلب إجازة', 'info');
}

function showNewReportContent() {
    console.log('📊 Showing New Report Content');
    showGenericContentPanel('new-report');
    updateBreadcrumbText('الرئيسية', 'تقرير جديد');
    showNotification('تم عرض صفحة تقرير جديد', 'info');
}

function showGenericContent(contentType) {
    console.log(`📄 Showing Generic Content for: ${contentType}`);
    showGenericContentPanel(contentType);
}

// ========== BREADCRUMB UPDATE FUNCTION ==========
function updateBreadcrumb(activeTab) {
    const breadcrumb = document.querySelector('.premium-breadcrumb');
    if (!breadcrumb || !activeTab) return;
    
    const tabText = activeTab.querySelector('.tab-text')?.textContent;
    if (!tabText) return;
    
    updateBreadcrumbText('الرئيسية', tabText);
}

function updateBreadcrumbText(firstItem, secondItem) {
    const breadcrumb = document.querySelector('.premium-breadcrumb');
    if (!breadcrumb) return;
    
    const breadcrumbItems = breadcrumb.querySelectorAll('.breadcrumb-item');
    if (breadcrumbItems.length >= 2) {
        const secondItemSpan = breadcrumbItems[1].querySelector('span');
        if (secondItemSpan) {
            secondItemSpan.textContent = secondItem;
        }
    }
}

// ========== ENHANCED SEARCH FEATURES ==========
function initializeSearchFeatures() {
    console.log('🔍 Initializing Enhanced Search Features');
    
    const searchInput = document.querySelector('.search-input');
    const searchSuggestions = document.querySelector('.search-suggestions');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length > 0) {
                searchTimeout = setTimeout(() => {
                    performSearch(query);
                }, 300);
            }
        });
        
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                if (query) {
                    performSearch(query);
                }
            }
        });
    }
    
    // Enhanced search suggestions
    if (searchSuggestions) {
        const suggestionItems = searchSuggestions.querySelectorAll('.suggestion-item');
        suggestionItems.forEach(item => {
            item.addEventListener('click', function() {
                const text = this.querySelector('span').textContent;
                if (searchInput) {
                    searchInput.value = text;
                    performSearch(text);
                }
            });
        });
    }
}

// ========== ENHANCED DROPDOWN FUNCTIONALITY ==========
function initializeDropdowns() {
    console.log('📋 Initializing Enhanced Dropdowns');
    
    // Close all dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        const dropdowns = document.querySelectorAll('.reports-dropdown, .quick-actions-dropdown, .profile-section');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close all dropdowns on Escape
            document.querySelectorAll('.reports-dropdown, .quick-actions-dropdown, .profile-section')
                .forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
}

// ========== ENHANCED RESPONSIVE FEATURES ==========
function initializeResponsiveFeatures() {
    console.log('📱 Initializing Enhanced Responsive Features');
    
    let resizeTimeout;
    
    function handleResize() {
        const width = window.innerWidth;
        
        if (width < 768) {
            adjustMobileLayout();
        } else if (width < 992) {
            adjustTabletLayout();
        } else {
            adjustDesktopLayout();
        }
        
        // Reinitialize navigation if needed
        if (isNavigationInitialized) {
            // Refresh navigation display
            const event = new Event('resize');
            window.dispatchEvent(event);
        }
    }
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });
    
    // Initial check
    handleResize();
}

function adjustMobileLayout() {
    console.log('📱 Adjusting for mobile layout');
    document.body.classList.add('mobile-layout');
    document.body.classList.remove('tablet-layout', 'desktop-layout');
}

function adjustTabletLayout() {
    console.log('📱 Adjusting for tablet layout');
    document.body.classList.add('tablet-layout');
    document.body.classList.remove('mobile-layout', 'desktop-layout');
}

function adjustDesktopLayout() {
    console.log('🖥️ Adjusting for desktop layout');
    document.body.classList.add('desktop-layout');
    document.body.classList.remove('mobile-layout', 'tablet-layout');
}

// ========== UTILITY FUNCTIONS ==========
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(69, 177, 163, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function performSearch(query) {
    console.log(`🔍 Performing search for: ${query}`);
    showNotification(`البحث عن: ${query}`, 'info');
    
    // Add loading state to search input
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.classList.add('loading');
        setTimeout(() => {
            searchInput.classList.remove('loading');
        }, 1000);
    }
}

function showNotification(message, type = 'info') {
    const container = document.querySelector('.notification-container') || createNotificationContainer();
    
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
    
    container.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 3000);
}

function createNotificationContainer() {
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
}

function showStatCardDetails(label) {
    showNotification(`عرض تفاصيل: ${label}`, 'info');
    console.log(`📊 Showing details for: ${label}`);
}

// ========== Keyframes for ripple effect ==========
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// ========== END OF SCRIPT ==========
console.log('✅ HR Dashboard JavaScript - Navigation Fixed Version Loaded Successfully');

