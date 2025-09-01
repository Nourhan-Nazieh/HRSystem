document.addEventListener('DOMContentLoaded', function() {
    // Sample data for the admin accounts
    let adminData = [
        { id: 1, name: 'أحمد ذياب ربيع مصطفى', role: 'مدير قسم', location: 'الكل', department: 'قسم المبيعات', status: 'نشط' },
        { id: 2, name: 'فؤاد بن علي بن محمد علي العتيبي', role: 'موارد بشرية', location: 'فرع النجمة', department: 'قسم البناء', status: 'نشط' },
        { id: 3, name: 'منتصر آل زهماني', role: 'موارد بشرية', location: 'فرع بلدان', department: 'قسم البرمجة', status: 'نشط' },
        { id: 4, name: 'هاني سمير', role: 'مدير حسابات', location: 'الكل', department: 'قسم المبيعات', status: 'نشط' },
        { id: 5, name: 'صالح محمد علي الخليل', role: 'محامي', location: 'الكل', department: 'قسم المبيعات', status: 'نشط' },
        { id: 6, name: 'أحمد محمد فتحي نور الدين', role: 'عامل', location: 'الكل', department: 'قسم المبيعات', status: 'نشط' }
    ];

    let currentPage = 1;
    let filteredData = [...adminData];

    // DOM Elements
    const searchInput = document.getElementById('search-input');
    const tableBody = document.querySelector('.admin-table tbody');
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const tableContainer = document.querySelector('.table-container');

    // Search functionality
    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            filteredData = [...adminData];
        } else {
            filteredData = adminData.filter(admin => 
                admin.name.toLowerCase().includes(searchTerm) ||
                admin.role.toLowerCase().includes(searchTerm) ||
                admin.department.toLowerCase().includes(searchTerm) ||
                admin.location.toLowerCase().includes(searchTerm)
            );
        }
        
        currentPage = 1;
        renderTable();
        updatePagination();
    }, 300));

    // Render table function
    function renderTable() {
        tableBody.innerHTML = '';
        
        if (filteredData.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px; color: #999;">
                        لا توجد نتائج مطابقة للبحث
                    </td>
                </tr>
            `;
            return;
        }

        filteredData.forEach((admin, index) => {
            const row = document.createElement('tr');
            row.style.animationDelay = `${index * 0.1}s`;
            row.innerHTML = `
                <td>${admin.name}</td>
                <td>${admin.role}</td>
                <td>${admin.location}</td>
                <td>${admin.department}</td>
                <td><span class="status-active">${admin.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="editAdmin(${admin.id})">تعديل</button>
                        <button class="btn-delete" onclick="deleteAdmin(${admin.id})">حذف</button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Pagination functionality
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('prev-btn')) {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                    simulatePageLoad();
                }
            } else if (this.classList.contains('next-btn')) {
                if (currentPage < 5) {
                    currentPage++;
                    updatePagination();
                    simulatePageLoad();
                }
            } else if (!isNaN(parseInt(this.textContent))) {
                currentPage = parseInt(this.textContent);
                updatePagination();
                simulatePageLoad();
            }
        });
    });

    // Update pagination active state
    function updatePagination() {
        paginationBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent == currentPage) {
                btn.classList.add('active');
            }
        });
    }

    // Simulate page loading
    function simulatePageLoad() {
        tableContainer.classList.add('loading');
        setTimeout(() => {
            tableContainer.classList.remove('loading');
            renderTable();
        }, 500);
    }

    // Button interactions
    window.editAdmin = function(id) {
        const admin = adminData.find(a => a.id === id);
        if (admin) {
            showNotification(`تم فتح نموذج تعديل الحساب: ${admin.name}`, 'info');
            // Here you would typically open an edit modal
        }
    };

    window.deleteAdmin = function(id) {
        const admin = adminData.find(a => a.id === id);
        if (admin && confirm(`هل أنت متأكد من حذف الحساب: ${admin.name}؟`)) {
            adminData = adminData.filter(a => a.id !== id);
            filteredData = filteredData.filter(a => a.id !== id);
            renderTable();
            showNotification('تم حذف الحساب بنجاح', 'success');
        }
    };

    // Header button interactions
    document.querySelector('.btn-primary').addEventListener('click', function() {
        showNotification('فتح نموذج إنشاء حساب إداري جديد', 'info');
        // Here you would typically open a create modal
    });

    document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text.includes('تصدير')) {
                exportData();
            } else if (text.includes('طباعة')) {
                printTable();
            } else if (text.includes('تصنيف')) {
                showNotification('فتح خيارات التصنيف', 'info');
            }
        });
    });

    // Export functionality
    function exportData() {
        const csvContent = [
            ['الاسم', 'الصلاحيات', 'المواقع والفروع', 'الأقسام', 'الحالة'],
            ...filteredData.map(admin => [
                admin.name,
                admin.role,
                admin.location,
                admin.department,
                admin.status
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'admin_accounts.csv';
        link.click();
        
        showNotification('تم تصدير البيانات بنجاح', 'success');
    }

    // Print functionality
    function printTable() {
        showNotification('جاري تحضير الجدول للطباعة...', 'info');
        setTimeout(() => {
            window.print();
        }, 1000);
    }

    // Notification system
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
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        switch(type) {
            case 'success':
                notification.style.backgroundColor = '#4caf50';
                break;
            case 'error':
                notification.style.backgroundColor = '#f44336';
                break;
            case 'warning':
                notification.style.backgroundColor = '#ff9800';
                break;
            default:
                notification.style.backgroundColor = '#2196f3';
        }
        
        document.body.appendChild(notification);
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Debounce function for search
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

    // Row hover effects
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.admin-table tbody tr')) {
            e.target.closest('tr').style.transform = 'scale(1.01)';
        }
    });

    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.admin-table tbody tr')) {
            e.target.closest('tr').style.transform = 'scale(1)';
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        }
    });

    // Initial render
    renderTable();
    updatePagination();

    // Add loading animation on initial load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
});

// ============================================
//  Modal Functionality for Add Admin Form
// ============================================
const modal = document.getElementById('add-admin-modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.querySelector('.modal .close-btn');
const cancelBtn = document.querySelector('.modal .btn-cancel');

function openModal() { if (modal) modal.style.display = 'flex'; }
function closeModal() { if (modal) modal.style.display = 'none'; }

if (openModalBtn) openModalBtn.addEventListener('click', openModal);
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => { if (event.target == modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display === 'flex') closeModal(); });
