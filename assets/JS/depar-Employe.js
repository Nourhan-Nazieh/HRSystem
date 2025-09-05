// Employee Departments Management System
class DepartmentManager {
    constructor() {
        this.currentPage = 1; // Let's start from page 1 for consistency
        this.itemsPerPage = 6;
        this.departments = this.generateSampleData();
        this.filteredDepartments = [...this.departments];
        
        this.initializeEventListeners();
        this.renderTable();
        this.updatePagination();
    }

    // Generate sample data matching the image
    generateSampleData() {
        const departments = [];
        const departmentNames = [
            'قسم إدارة الحركة والتشغيل والورشة', 'قسم الموارد البشرية والتطوير', 'قسم المالية والمحاسبة',
            'قسم تكنولوجيا المعلومات', 'قسم التسويق والمبيعات', 'قسم الجودة والتطوير',
            'قسم الأمن والسلامة', 'قسم الصيانة والدعم الفني', 'قسم العلاقات العامة',
            'قسم التخطيط الاستراتيجي', 'قسم البحث والتطوير', 'قسم خدمة العملاء',
            'قسم الإنتاج والعمليات', 'قسم اللوجستيات والتوريد', 'قسم التدريب والتأهيل',
            'قسم الشؤون القانونية', 'قسم المشتريات والمخازن', 'قسم التحليل والإحصاء',
            'قسم الاتصالات والشبكات', 'قسم إدارة المشاريع', 'قسم الطوارئ والأزمات',
            'قسم التطوير المؤسسي', 'قسم البيئة والاستدامة', 'قسم الابتكار والإبداع',
            'قسم الرقابة الداخلية', 'قسم التوثيق والأرشفة', 'قسم الخدمات العامة',
            'قسم التخطيط المالي', 'قسم إدارة المخاطر', 'قسم التطوير التقني'
        ];
        const managers = [
            'محمد علي', 'فاطمة أحمد', 'عبدالله محمود', 'نورا حسن', 'أحمد سالم',
            'مريم عبدالله', 'خالد يوسف', 'سارة محمد', 'عمر الحسن', 'ليلى إبراهيم'
        ];
        for (let i = 0; i < 30; i++) {
            departments.push({
                id: i + 1,
                name: departmentNames[i],
                employeeCount: Math.floor(Math.random() * 50) + 10,
                manager: managers[Math.floor(Math.random() * managers.length)],
                avatar: "../assets/images/img-location.jpg"            });
        }
        return departments;
    }

    // Initialize all event listeners
    initializeEventListeners() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => this.handleSearch(e.target.value));

        // --- MODAL & PAGINATION LISTENERS ---
        // Add department button opens the modal
        document.querySelector('.add-department-btn').addEventListener('click', () => this.openAddModal());

        // Modal buttons
        const modal = document.getElementById('addDepartmentModal');
        modal.querySelector('.save-btn').addEventListener('click', () => this.saveNewDepartment());
        modal.querySelector('.cancel-btn').addEventListener('click', () => this.closeAddModal());
        // Close modal if overlay is clicked
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeAddModal();
            }
        });

        // Pagination buttons
        document.getElementById('prevBtn').addEventListener('click', () => this.previousPage());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextPage());
    }
    
    // --- START: MODAL FUNCTIONS ---

    openAddModal() {
        const modal = document.getElementById('addDepartmentModal');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }

    closeAddModal() {
        const modal = document.getElementById('addDepartmentModal');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.getElementById('departmentName').value = '';
            document.getElementById('departmentManager').value = '';
        }, 300);
    }

    saveNewDepartment() {
        const nameInput = document.getElementById('departmentName');
        const managerInput = document.getElementById('departmentManager');
        const name = nameInput.value.trim();
        const manager = managerInput.value.trim();

        if (!name || !manager) {
            this.showCustomAlert('خطأ في الإدخال', 'يرجى ملء جميع الحقول.', 'error');
            return;
        }

        const newId = this.departments.length > 0 ? Math.max(...this.departments.map(d => d.id)) + 1 : 1;
        const newDepartment = {
            id: newId,
            name: name,
            employeeCount: 0,
            manager: manager,
            avatar: "../assets/images/img-location.jpg"            
        };

        this.departments.unshift(newDepartment);
        this.handleSearch(document.getElementById('searchInput').value);
        this.closeAddModal();
        this.showCustomAlert('تم الحفظ بنجاح!', `تمت إضافة قسم "${name}".`, 'success');
    }

    // --- END: MODAL FUNCTIONS ---

    // Handle search functionality
    handleSearch(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        this.filteredDepartments = this.departments.filter(dept => 
            dept.name.toLowerCase().includes(term) || 
            dept.manager.toLowerCase().includes(term)
        );
        this.currentPage = 1;
        this.renderTable();
        this.updatePagination();
    }

    // Render table with current data
    renderTable() {
        const tbody = document.getElementById('departmentsTableBody');
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const currentDepartments = this.filteredDepartments.slice(startIndex, endIndex);

        tbody.innerHTML = '';
        
        if (currentDepartments.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 40px;">لا توجد نتائج</td></tr>`;
            return;
        }

        currentDepartments.forEach((dept, index) => {
            const row = document.createElement('tr');
            row.style.opacity = '0';
            row.style.transform = 'translateY(20px)';
            
            row.innerHTML = `
                <td>${dept.name}</td>
                <td>
                    <div class="employee-count-container">
                        <span class="employee-count">${dept.employeeCount}</span>
                        <div class="employee-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="manager-info">
                        <div class="manager-avatar-container">
                            <img src="${dept.avatar}" alt="مدير" class="manager-avatar">
                        </div>
                        <span>${dept.manager}</span>
                    </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="edit-btn">تعديل</button>
                        <button class="delete-btn">حذف</button>
                    </div>
                </td>
            `;
            
            row.querySelector('.edit-btn').addEventListener('click', () => this.handleEdit(dept.id, event));
            row.querySelector('.delete-btn').addEventListener('click', () => this.handleDelete(dept.id, event));

            tbody.appendChild(row);

            setTimeout(() => {
                row.style.opacity = '1';
                row.style.transform = 'translateY(0)';
            }, index * 100);
        });

        this.addTableHoverEffects();
    }

    // Add hover effects to table rows
    addTableHoverEffects() {
        const rows = document.querySelectorAll('.departments-table tbody tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', () => row.style.transform = 'translateY(-2px)');
            row.addEventListener('mouseleave', () => row.style.transform = 'translateY(0)');
        });
    }

    // Handle edit button click
    handleEdit(departmentId) {
        const department = this.departments.find(dept => dept.id === departmentId);
        
        // Create a modern modal-like alert
        this.showCustomAlert(
            'تعديل القسم',
            `هل تريد تعديل قسم "${department.name}"؟\nمدير القسم: ${department.manager}\nعدد الموظفين: ${department.employeeCount}`,
            'info'
        );

        // Add button animation
        const editBtn = event.target;
        editBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            editBtn.style.transform = 'scale(1)';
        }, 150);
    }
        // Handle delete button click
        handleDelete(departmentId) {
            const department = this.departments.find(dept => dept.id === departmentId);
            
            // Show confirmation dialog
            const confirmed = this.showCustomConfirm(
                'حذف القسم',
                `هل أنت متأكد من حذف قسم "${department.name}"؟\nهذا الإجراء لا يمكن التراجع عنه.`
            );
    
            if (confirmed) {
                // Remove department with animation
                const row = event.target.closest('tr');
                row.style.transform = 'translateX(100%)';
                row.style.opacity = '0';
                
                setTimeout(() => {
                    this.departments = this.departments.filter(dept => dept.id !== departmentId);
                    this.filteredDepartments = this.filteredDepartments.filter(dept => dept.id !== departmentId);
                    this.renderTable();
                    this.updatePagination();
                    
                    this.showCustomAlert('تم الحذف', 'تم حذف القسم بنجاح', 'success');
                }, 300);
            }
    
            // Add button animation
            const deleteBtn = event.target;
            deleteBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                deleteBtn.style.transform = 'scale(1)';
            }, 150);
        }
    
        // Handle add department button
       
        // Custom alert function
        showCustomAlert(title, message, type = 'info') {
            // Create overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
    
            // Create modal
            const modal = document.createElement('div');
            const iconColor = type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#4A90E2';
            const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
            
            modal.style.cssText = `
                background: white;
                padding: 30px;
                border-radius: 12px;
                max-width: 400px;
                width: 90%;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                transform: scale(0.8);
                transition: transform 0.3s ease;
            `;
    
            modal.innerHTML = `
                <div style="color: ${iconColor}; font-size: 48px; margin-bottom: 15px;">${icon}</div>
                <h3 style="color: #333; margin-bottom: 15px; font-size: 18px;">${title}</h3>
                <p style="color: #666; margin-bottom: 25px; line-height: 1.5;">${message}</p>
                <button onclick="this.closest('.custom-overlay').remove()" 
                        style="background: ${iconColor}; color: white; border: none; padding: 10px 25px; 
                               border-radius: 6px; cursor: pointer; font-size: 14px; transition: all 0.3s ease;">
                    موافق
                </button>
            `;
    
            overlay.className = 'custom-overlay';
            overlay.appendChild(modal);
            document.body.appendChild(overlay);
    
            // Animate in
            setTimeout(() => {
                overlay.style.opacity = '1';
                modal.style.transform = 'scale(1)';
            }, 10);
    
            // Auto remove after 3 seconds for success messages
            if (type === 'success') {
                setTimeout(() => {
                    if (overlay.parentNode) {
                        overlay.remove();
                    }
                }, 3000);
            }
        }
    
        // Custom confirm function
        showCustomConfirm(title, message) {
            return confirm(`${title}\n\n${message}`);
        }
    
        // Pagination functions
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderTable();
                this.updatePagination();
                this.animatePagination('prev');
            }
        }
    
        nextPage() {
            const totalPages = Math.ceil(this.filteredDepartments.length / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderTable();
                this.updatePagination();
                this.animatePagination('next');
            }
        }
    
        goToPage(page) {
            const totalPages = Math.ceil(this.filteredDepartments.length / this.itemsPerPage);
            if (page >= 1 && page <= totalPages && page !== this.currentPage) {
                this.currentPage = page;
                this.renderTable();
                this.updatePagination();
                this.animatePagination('page');
            }
        }
    
    // Pagination functions
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderTable();
            this.updatePagination();
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.filteredDepartments.length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.renderTable();
            this.updatePagination();
        }
    }

    goToPage(page) {
        this.currentPage = page;
        this.renderTable();
        this.updatePagination();
    }

    // Update pagination display
    updatePagination() {
        const totalPages = Math.ceil(this.filteredDepartments.length / this.itemsPerPage);
        const paginationNumbers = document.querySelector('.pagination-numbers');
        paginationNumbers.innerHTML = '';

        let startPage = Math.max(1, this.currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        startPage = Math.max(1, endPage - 4);

        for (let i = startPage; i <= endPage; i++) {
            const btn = document.createElement('button');
            btn.className = `pagination-number ${i === this.currentPage ? 'active' : ''}`;
            btn.dataset.page = i;
            btn.textContent = i;
            btn.addEventListener('click', (e) => this.goToPage(parseInt(e.target.dataset.page)));
            paginationNumbers.appendChild(btn);
        }

        document.getElementById('prevBtn').disabled = this.currentPage === 1;
        document.getElementById('nextBtn').disabled = this.currentPage === totalPages || totalPages === 0;
    }
}

// Initialize the department manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Ensure the modal HTML is present before initializing
    if (document.getElementById('addDepartmentModal')) {
        window.departmentManager = new DepartmentManager();
    } else {
        console.error("Modal HTML not found! Cannot initialize DepartmentManager.");
    }
});
document.addEventListener('DOMContentLoaded', function ( ) {
    AOS.init({ duration: 600, once: true });

    // --- Dummy Data ---
    let locationsData = [
        { id: 1, name: 'الرياض - المكتب الرئيسي', employees: 50, manager: 'أحمد خالد' },
        { id: 2, name: 'جدة - فرع المنطقة الغربية', employees: 35, manager: 'سارة عبد الله' },
        { id: 3, name: 'مشروع نيوم', employees: 120, manager: 'علي الغامدي' },
    ];

    // --- عناصر الواجهة ---
    const tableBody = document.getElementById('table-body');
    const modal = document.getElementById('main-modal');
    const modalForm = document.getElementById('modal-form');
    const addNewBtn = document.getElementById('add-new-btn');
    const closeModalBtn = document.getElementById('modal-close-btn');

    // --- وظيفة عرض البيانات في الجدول ---
    function renderTable() {
        tableBody.innerHTML = '';
        locationsData.forEach(loc => {
            const row = `
                <tr data-id="${loc.id}">
                    <td>${loc.name}</td>
                    <td>${loc.employees}</td>
                    <td>${loc.manager}</td>
                    <td><div class="controls-cell"><button class="control-btn edit-btn"><i class="fas fa-pen"></i></button><button class="control-btn delete-btn"><i class="fas fa-trash-alt"></i></button></div></td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    // --- وظائف المودال ---
    const openModal = () => modal.classList.remove('hidden');
    const closeModal = () => modal.classList.add('hidden');

    addNewBtn.addEventListener('click', () => {
        modalForm.reset();
        document.getElementById('modal-title').textContent = 'إضافة موقع جديد';
        document.getElementById('modal-submit-btn').textContent = 'إضافة';
        modalForm.dataset.mode = 'add';
        openModal();
    });
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // --- منطق الجدول (تعديل وحذف) ---
    tableBody.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-btn');
        const deleteBtn = e.target.closest('.delete-btn');

        if (editBtn) {
            // منطق التعديل
        }

        if (deleteBtn) {
            Swal.fire({
                title: 'هل أنت متأكد؟', text: "لا يمكن التراجع عن هذا الإجراء!", icon: 'warning',
                showCancelButton: true, confirmButtonColor: '#dc3545', cancelButtonText: 'إلغاء', confirmButtonText: 'نعم، احذفه!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const row = deleteBtn.closest('tr');
                    const id = parseInt(row.dataset.id, 10);
                    locationsData = locationsData.filter(loc => loc.id !== id);
                    renderTable();
                    Swal.fire('تم الحذف!', 'تم حذف الموقع بنجاح.', 'success');
                }
            });
        }
    });

    // --- منطق إرسال الفورم ---
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // (هنا يمكنك إضافة منطق الإضافة أو التعديل الفعلي للبيانات)
        Swal.fire('تم!', 'تم حفظ البيانات بنجاح.', 'success');
        closeModal();
        renderTable(); // إعادة رسم الجدول بالبيانات الجديدة
    });

    // --- العرض الأولي للبيانات ---
    renderTable();
});