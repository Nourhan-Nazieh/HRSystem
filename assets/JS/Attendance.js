document.addEventListener('DOMContentLoaded', function() {
    // --- الكود الحالي الموجود في ملف script.js الخاص بك ---
    // ... (لصق كل الكود الموجود لديك هنا أولاً) ...

    // --- الكود الجديد لربط الصفحات ---
    const homeTab = document.querySelector('.nav-tab-item[data-tab="home"]');
    const attendanceTab = document.querySelector('.nav-tab-item[data-tab="attendance"]');

    // وظيفة للتحقق من اسم الصفحة الحالية
    function getCurrentPageName() {
        const path = window.location.pathname;
        const page = path.split("/").pop();
        return page === "" ? "index.html" : page; // اعتبار المسار الفارغ هو index.html
    }

    // ربط تاب الرئيسية
    if (homeTab) {
        homeTab.addEventListener('click', function(event) {
            event.preventDefault(); // منع السلوك الافتراضي
            if (getCurrentPageName() !== 'index.html') {
                console.log('Navigating to index.html');
                window.location.href = 'index.html';
            }
        });
    }

    // ربط تاب الحضور والانصراف
    if (attendanceTab) {
        attendanceTab.addEventListener('click', function(event) {
            event.preventDefault(); // منع السلوك الافتراضي
            if (getCurrentPageName() !== 'Attendance.html') {
                console.log('Navigating to Attendance.html');
                window.location.href = 'Attendance.html';
            }
        });
    }

    // --- تفعيل التاب الصحيح بناءً على الصفحة الحالية ---
    const currentPage = getCurrentPageName();
    const allTabs = document.querySelectorAll('.nav-tab-item');

    allTabs.forEach(tab => {
        tab.classList.remove('active');
        const tabData = tab.getAttribute('data-tab');

        if (currentPage === 'index.html' && tabData === 'home') {
            tab.classList.add('active');
        } else if (currentPage === 'Attendance.html' && tabData === 'attendance') {
            tab.classList.add('active');
        }
    });

});
