document.addEventListener('DOMContentLoaded', function () {
    AOS.init({ duration: 600, once: true });

    // --- DOM Elements ---
    const tableBody = document.getElementById('end-service-table-body');
    const searchInput = document.getElementById('end-service-search');
    const modalOverlay = document.getElementById('details-modal-overlay');
    const closeDetailsBtn = document.getElementById('close-details');
    const cancelDetailsBtn = document.getElementById('cancel-details');
    const modalContent = document.getElementById('modal-content');
    const printBtn = document.querySelector('.action-buttons-pro button:nth-child(1)');
    const exportBtn = document.querySelector('.action-buttons-pro button:nth-child(2)');
    const filterControls = document.querySelectorAll('.filter-control');

    // --- Sample Data for End of Service Bonus ---
    let endOfServiceData = [
        { 
            id: 175, 
            name: 'ملاك مبارك محمد السويداني', 
            startDate: '30-8-2024', 
            serviceDuration: '1 سنة', 
            bonus: 12000,
            department: 'قسم البرمجة',
            position: 'مهندس برمجيات',
            salary: 8000,
            totalService: '1 سنة و 2 شهر'
        },
        { 
            id: 176, 
            name: 'علي حسن الأحمد', 
            startDate: '30-8-2024', 
            serviceDuration: '1 سنة', 
            bonus: 1100,
            department: 'قسم البرمجة',
            position: 'مطور واجهات',
            salary: 6500,
            totalService: '1 سنة و 3 أشهر'
        },
        { 
            id: 177, 
            name: 'فاطمة خالد المصري', 
            startDate: '30-8-2024', 
            serviceDuration: '1 سنة', 
            bonus: 5500,
            department: 'قسم البرمجة',
            position: 'محللة أنظمة',
            salary: 7200,
            totalService: '1 سنة و 1 شهر'
        },
        { 
            id: 178, 
            name: 'يوسف إبراهيم الشمري', 
            startDate: '30-8-2024', 
            serviceDuration: '1 سنة', 
            bonus: 13500,
            department: 'قسم البرمجة',
            position: 'مدير مشاريع',
            salary: 9500,
            totalService: '1 سنة و 4 أشهر'
        },
        { 
            id: 179, 
            name: 'نورة عبد الله القحطاني', 
            startDate: '30-8-2024', 
            serviceDuration: '1 سنة', 
            bonus: 1000,
            department: 'قسم البرمجة',
            position: 'مصممة UI/UX',
            salary: 5800,
            totalService: '1 سنة'
        },
    ];

    let currentEmployee = null;

    // --- Main Render Function ---
    function renderTable(data) {
        tableBody.innerHTML = '';
        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 50px; color: var(--secondary-text);">لا توجد بيانات مطابقة للبحث</td></tr>';
            return;
        }
        data.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.dataset.id = row.id;
            tr.style.animationDelay = `${index * 0.1}s`;
            tr.innerHTML = `
                <td>${row.id}</td>
                <td>${row.name}</td>
                <td>${row.startDate}</td>
                <td class="service-duration">${row.serviceDuration}</td>
                <td class="bonus-amount">${row.bonus.toLocaleString('ar-SA')} ريال</td>
                <td>
                    <button class="details-btn" title="عرض التفاصيل" data-id="${row.id}">
                        <i class="fas fa-file-alt"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // --- Search Functionality ---
    searchInput.addEventListener('keyup', debounce(() => {
        const filter = searchInput.value.toLowerCase();
        const filteredData = endOfServiceData.filter(row => 
            Object.values(row).some(val => 
                String(val).toLowerCase().includes(filter)
            )
        );
        renderTable(filteredData);
    }, 300));

    // --- Filter Controls ---
    filterControls.forEach(control => {
        control.addEventListener('click', function() {
            const filterType = this.querySelector('label').textContent;
            showFilterModal(filterType);
        });
    });

    // --- Table Actions ---
    tableBody.addEventListener('click', function(e) {
        const button = e.target.closest('.details-btn');
        if (!button) return;

        const employeeId = parseInt(button.dataset.id);
        const employee = endOfServiceData.find(emp => emp.id === employeeId);

        if (employee) {
            showEmployeeDetails(employee);
        }
    });

    // --- Modal Functions ---
    closeDetailsBtn.addEventListener('click', closeModal);
    cancelDetailsBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });

    // --- Action Buttons ---
    printBtn.addEventListener('click', () => {
        showNotification('جاري تحضير التقرير للطباعة...', 'info');
        setTimeout(() => {
            window.print();
        }, 1000);
    });

    exportBtn.addEventListener('click', () => {
        exportToCSV(endOfServiceData);
        showNotification('تم تصدير البيانات بنجاح', 'success');
    });

    // --- Helper Functions ---
    function closeModal() {
        modalOverlay.classList.add('hidden');
        currentEmployee = null;
    }

    function showEmployeeDetails(employee) {
        currentEmployee = employee;
        
        const detailsHTML = `
            <div class="detail-row">
                <span class="detail-label">الرقم الوظيفي:</span>
                <span class="detail-value">${employee.id}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">الاسم الكامل:</span>
                <span class="detail-value">${employee.name}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">القسم:</span>
                <span class="detail-value">${employee.department}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">المسمى الوظيفي:</span>
                <span class="detail-value">${employee.position}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">تاريخ بداية العمل:</span>
                <span class="detail-value">${employee.startDate}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">إجمالي مدة الخدمة:</span>
                <span class="detail-value">${employee.totalService}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">الراتب الأساسي:</span>
                <span class="detail-value">${employee.salary.toLocaleString('ar-SA')} ريال</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">مكافأة نهاية الخدمة:</span>
                <span class="detail-value highlight">${employee.bonus.toLocaleString('ar-SA')} ريال</span>
            </div>
        `;
        
        modalContent.innerHTML = detailsHTML;
        modalOverlay.classList.remove('hidden');
    }

    // function showFilterModal(filterType) {
    //     showNotification(`فلتر ${filterType} قيد التطوير`, 'info');
    // }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 700;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-family: 'Almarai', sans-serif;
        `;
        
        switch(type) {
            case 'success':
                notification.style.backgroundColor = 'var(--accent-green)';
                break;
            case 'error':
                notification.style.backgroundColor = 'var(--accent-red)';
                break;
            default:
                notification.style.backgroundColor = 'var(--accent-blue)';
        }
        
        document.body.appendChild(notification);
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function exportToCSV(data) {
        const headers = ['الرقم الوظيفي', 'الاسم', 'تاريخ بداية العمل', 'مدة الخدمة', 'مكافأة نهاية الخدمة', 'القسم', 'المسمى الوظيفي'];
        const csvContent = [
            headers.join(','),
            ...data.map(row => [
                row.id, 
                row.name, 
                row.startDate, 
                row.serviceDuration, 
                row.bonus, 
                row.department, 
                row.position
            ].join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'end_of_service_bonus.csv';
        link.click();
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // --- Keyboard Shortcuts ---
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // --- Pagination Functionality ---
    const paginationLinks = document.querySelectorAll('.table-pagination-pro a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.table-pagination-pro li').forEach(li => {
                li.classList.remove('active');
            });
            
            // Add active class to clicked link's parent
            this.parentElement.classList.add('active');
            
            // Show notification for page change
            const pageNumber = this.textContent;
            if (!isNaN(pageNumber)) {
                showNotification(`تم الانتقال إلى الصفحة ${pageNumber}`, 'info');
            }
        });
    });

    // --- Initial Render ---
    renderTable(endOfServiceData);
    
    // Add loading animation on initial load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
});
// ============================
// التاريخ
const dateFilter = document.getElementById("date-filter");
const datePicker = document.getElementById("date-picker");
const selectedDate = document.getElementById("selected-date");

dateFilter.addEventListener("click", () => {
  datePicker.click(); // يفتح الكاليندر
});

datePicker.addEventListener("change", () => {
  selectedDate.textContent = datePicker.value; // يظهر الشهر اللي اختارتيه
});

// الأقسام + المواقع
document.querySelectorAll(".dropdown").forEach(drop => {
  const span = drop.querySelector("span");
  const menu = drop.querySelector(".dropdown-menu");

  drop.addEventListener("click", () => {
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
  });

  menu.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
      span.textContent = item.dataset.value; // يغير النص
      menu.style.display = "none"; // يقفل القائمة
    });
  });
});

// عشان يقفل المنيو لو دوستي بره
document.addEventListener("click", (e) => {
  document.querySelectorAll(".dropdown-menu").forEach(menu => {
    if (!menu.parentElement.contains(e.target)) {
      menu.style.display = "none";
    }
  });
});


