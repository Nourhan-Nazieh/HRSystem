    document.addEventListener('DOMContentLoaded', function () {
        AOS.init({ duration: 600, once: true });

        // --- DOM Elements ---
        const tableBody = document.getElementById('payroll-table-body');
        const searchInput = document.getElementById('payroll-search');
        const modalOverlay = document.getElementById('delete-modal-overlay');
        const confirmDeleteBtn = document.getElementById('confirm-delete');
        const cancelDeleteBtn = document.getElementById('cancel-delete');
        const printBtn = document.querySelector('.action-buttons-pro button:nth-child(1)');
        const exportBtn = document.querySelector('.action-buttons-pro button:nth-child(2)');
        const toggleButtons = document.querySelectorAll('.toggle-btn-pro');
        const filterControls = document.querySelectorAll('.filter-control');

        // --- Sample Data ---
        let payrollData = [
            { id: 175, name: 'ملاك مبارك محمد السويداني', title: 'مهندس مساحة', base: 3651, allowance: 0.0, deduction: 200, net: 3451 },
            { id: 176, name: 'علي حسن الأحمد', title: 'مسؤول المعدات والسيارات', base: 7020, allowance: 0.0, deduction: 1020, net: 6000 },
            { id: 177, name: 'فاطمة خالد المصري', title: 'مهندس طرق', base: 10240.50, allowance: 0.0, deduction: 240.50, net: 10000 },
            { id: 178, name: 'يوسف إبراهيم الشمري', title: 'مدير حسابات', base: 4740.60, allowance: 0.0, deduction: 320.10, net: 4520.50 },
            { id: 179, name: 'نورة عبد الله القحطاني', title: 'مدير امن', base: 4500, allowance: 0.0, deduction: 500, net: 3999.34 },
            { id: 180, name: 'أحمد محمود السيد', title: 'مدير امن', base: 4500, allowance: 0.0, deduction: 500, net: 3999.34 },
        ];

        let rowToDelete = null;
        let currentFilter = '';

        // --- Main Render Function ---
        function renderTable(data) {
            tableBody.innerHTML = '';
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding: 50px; color: var(--secondary-text);">لا توجد بيانات مطابقة للبحث</td></tr>';
                return;
            }
            data.forEach((row, index) => {
                const tr = document.createElement('tr');
                tr.dataset.id = row.id;
                tr.style.animationDelay = `${index * 0.1}s`;
                tr.innerHTML = `
                    <td>${row.id}</td>
                    <td>${row.name}</td>
                    <td>${row.title}</td>
                    <td>${row.base.toLocaleString('ar-SA', {minimumFractionDigits: 2})}</td>
                    <td>${row.allowance.toLocaleString('ar-SA', {minimumFractionDigits: 2})}</td>
                    <td class="amount-deduction">${row.deduction.toLocaleString('ar-SA', {minimumFractionDigits: 2})}</td>
                    <td class="amount-net">${row.net.toLocaleString('ar-SA', {minimumFractionDigits: 2})}</td>
                    <td>
                        <div class="control-icons-pro">
                            <div class="icon-btn view" title="عرض التفاصيل" data-id="${row.id}"><i class="fas fa-eye"></i></div>
                            <div class="icon-btn edit" title="تعديل" data-id="${row.id}"><i class="fas fa-edit"></i></div>
                            <div class="icon-btn delete" title="حذف" data-id="${row.id}"><i class="fas fa-trash"></i></div>
                        </div>
                    </td>
                `;
                tableBody.appendChild(tr);
            });
            
            // Update stats
            updateStats(data);
        }

        // --- Update Statistics ---
        function updateStats(data) {
            const totalSalaries = data.reduce((sum, row) => sum + row.net, 0);
            const totalDeductions = data.reduce((sum, row) => sum + row.deduction, 0);
            const totalAllowances = data.reduce((sum, row) => sum + row.allowance, 0);
            
            document.querySelector('.stat-card-pro:nth-child(1) span').textContent = totalSalaries.toLocaleString('ar-SA');
            document.querySelector('.stat-card-pro:nth-child(2) span').textContent = '1200';
            document.querySelector('.stat-card-pro:nth-child(3) span').textContent = '14500';
            document.querySelector('.stat-card-pro:nth-child(4) span').textContent = totalAllowances.toLocaleString('ar-SA', {minimumFractionDigits: 1});
        }

        // --- Search Functionality ---
        searchInput.addEventListener('keyup', debounce(() => {
            const filter = searchInput.value.toLowerCase();
            const filteredData = payrollData.filter(row => 
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
            const button = e.target.closest('.icon-btn');
            if (!button) return;

            const employeeId = parseInt(button.dataset.id);
            const employee = payrollData.find(emp => emp.id === employeeId);

            if (button.classList.contains('delete')) {
                rowToDelete = button.closest('tr');
                modalOverlay.classList.remove('hidden');
            } else if (button.classList.contains('view')) {
                showEmployeeDetails(employee);
            } else if (button.classList.contains('edit')) {
                showEditModal(employee);
            }
        });

        // --- Modal Functions ---
        confirmDeleteBtn.addEventListener('click', function() {
            if (rowToDelete) {
                const rowId = parseInt(rowToDelete.dataset.id);
                payrollData = payrollData.filter(row => row.id !== rowId);
                rowToDelete.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    renderTable(payrollData);
                    closeModal();
                    showNotification('تم حذف الموظف بنجاح', 'success');
                }, 300);
            }
        });

        cancelDeleteBtn.addEventListener('click', closeModal);
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
            exportToCSV(payrollData);
            showNotification('تم تصدير البيانات بنجاح', 'success');
        });

        // --- Toggle Buttons ---
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const viewType = this.textContent;
                showNotification(`تم تفعيل عرض: ${viewType}`, 'info');
                
                // Add animation effect
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });

        // --- Helper Functions ---
        function closeModal() {
            modalOverlay.classList.add('hidden');
            rowToDelete = null;
        }

        function showEmployeeDetails(employee) {
            const details = `
                <div style="text-align: right; padding: 20px;">
                    <h3>تفاصيل الموظف</h3>
                    <p><strong>الرقم الوظيفي:</strong> ${employee.id}</p>
                    <p><strong>الاسم:</strong> ${employee.name}</p>
                    <p><strong>المسمى الوظيفي:</strong> ${employee.title}</p>
                    <p><strong>الراتب الأساسي:</strong> ${employee.base.toLocaleString('ar-SA')} ريال</p>
                    <p><strong>البدلات:</strong> ${employee.allowance.toLocaleString('ar-SA')} ريال</p>
                    <p><strong>الاستقطاعات:</strong> ${employee.deduction.toLocaleString('ar-SA')} ريال</p>
                    <p><strong>صافي الراتب:</strong> ${employee.net.toLocaleString('ar-SA')} ريال</p>
                </div>
            `;
            showCustomModal('تفاصيل الموظف', details);
        }

        // function showEditModal(employee) {
        //     showNotification('وظيفة التعديل قيد التطوير', 'info');
        // }

        // function showFilterModal(filterType) {
        //     showNotification(`فلتر ${filterType} قيد التطوير`, 'info');
        // }

        function showCustomModal(title, content) {
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="delete-modal" style="max-width: 500px;">
                    <h3 style="margin-bottom: 20px; color: var(--primary-text);">${title}</h3>
                    ${content}
                    <button class="btn-modal-cancel" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                </div>
            `;
            document.body.appendChild(modal);
            setTimeout(() => modal.classList.remove('hidden'), 10);
        }

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
            const headers = ['الرقم الوظيفي', 'الاسم', 'المسمى الوظيفي', 'الراتب الأساسي', 'البدلات', 'الاستقطاعات', 'صافي الراتب'];
            const csvContent = [
                headers.join(','),
                ...data.map(row => [row.id, row.name, row.title, row.base, row.allowance, row.deduction, row.net].join(','))
            ].join('\n');
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'payroll_data.csv';
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

        // --- Initial Render ---
        renderTable(payrollData);
        
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

    // ========================================
    document.addEventListener('DOMContentLoaded', function () {
        AOS.init({ duration: 600, once: true });

        // --- Sample Data (from the new screenshot) ---
        const eosData = [
            { id: 175, name: 'ملاك مبارك محمد السويداني', startDate: '30-8-2024', serviceDuration: '1 سنة', gratuity: 12000 },
            { id: 175, name: 'ملاك مبارك محمد السويداني', startDate: '30-8-2024', serviceDuration: '1 سنة', gratuity: 1100 },
            { id: 175, name: 'ملاك مبارك محمد السويداني', startDate: '30-8-2024', serviceDuration: '1 سنة', gratuity: 5500 },
            { id: 175, name: 'ملاك مبارك محمد السويداني', startDate: '30-8-2024', serviceDuration: '1 سنة', gratuity: 13500 },
            { id: 175, name: 'ملاك مبارك محمد السويداني', startDate: '30-8-2024', serviceDuration: '1 سنة', gratuity: 1000 },
        ];

        const tableBody = document.getElementById('eos-table-body');
        const searchInput = document.getElementById('eos-search');

        // --- Main Render Function ---
        function renderTable(data) {
            tableBody.innerHTML = '';
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 50px;">لا توجد بيانات مطابقة للبحث</td></tr>';
                return;
            }
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id}</td>
                    <td>${row.name}</td>
                    <td>${row.startDate}</td>
                    <td>${row.serviceDuration}</td>
                    <td>${row.gratuity.toLocaleString()}</td>
                <td>
                    <button class="btn-table-control circle-btn">
                    <span class="custom-icon">
                        <i class="fas fa-search"></i>
                        <span class="lines"></span>
                    </span>
                    </button>
                </td>               `;
                tableBody.appendChild(tr);
            });
        }

        // --- Initial Render ---
        renderTable(eosData);

        // --- Live Search Functionality ---
        searchInput.addEventListener('keyup', function() {
            const filter = searchInput.value.toLowerCase();
            const filteredData = eosData.filter(row => {
                return Object.values(row).some(val => 
                    String(val).toLowerCase().includes(filter)
                );
            });
            renderTable(filteredData);
        });
    });
    // ===============================
    document.addEventListener('DOMContentLoaded', function () {
        AOS.init({ duration: 600, once: true });

        // --- Sample Data ---
        const eosData = [
            { id: 175, name: 'ملاك مبارك محمد السويداني', startDate: '30-8-2024', serviceDuration: '1 سنة', gratuity: 12000 },
            { id: 176, name: 'علي حسن الأحمد', startDate: '15-5-2023', serviceDuration: '2 سنة', gratuity: 25000 },
            { id: 177, name: 'فاطمة خالد المصري', startDate: '01-1-2022', serviceDuration: '3 سنوات', gratuity: 45000 },
        ];

        const tableBody = document.getElementById('eos-table-body');

        // --- Main Render Function ---
        function renderTable(data) {
            tableBody.innerHTML = '';
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id}</td>
                    <td>${row.name}</td>
                    <td>${row.startDate}</td>
                    <td>${row.serviceDuration}</td>
                    <td>${row.gratuity.toLocaleString()}</td>
                    <td><div class="details-icon-pro"><i class="fas fa-file-alt"></i></div></td>
                `;
                tableBody.appendChild(tr);
            });
        }

        // --- Filter Logic ---
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            const span = dropdown.querySelector('span');
            const menu = dropdown.querySelector('.dropdown-menu-pro');
            
            dropdown.addEventListener('click', (e) => {
                if (e.target.tagName !== 'LI') {
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                }
            });

            if (menu) {
                menu.addEventListener('click', (e) => {
                    if (e.target.tagName === 'LI') {
                        span.textContent = e.target.textContent;
                        menu.style.display = 'none';
                        // Add filtering logic here if needed
                    }
                });
            }
        });
        
        // Handle date picker
        const datePicker = document.querySelector('.date-picker-hidden');
        const dateValue = document.getElementById('date-value');
        datePicker.addEventListener('change', (e) => {
            dateValue.textContent = e.target.value;
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.querySelector('.dropdown-menu-pro').style.display = 'none';
                }
            });
        });

        // --- Initial Render ---
        renderTable(eosData);
    });


