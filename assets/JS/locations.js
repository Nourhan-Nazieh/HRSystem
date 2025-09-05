// Sample data 
const sampleData = [
    { id: 1, name: "شركة الكهرباء - Electricity Company - الرياض", employees: 2, manager: "محمد علي", managerAvatar: "../assets/images/img-location.jpg" },
    { id: 2, name: "شركة الكهرباء - Electricity Company - جدة", employees: 5, manager: "أحمد سالم", managerAvatar: "../assets/images/img-location.jpg" },
    { id: 3, name: "شركة الكهرباء - Electricity Company - الدمام", employees: 3, manager: "فاطمة النور", managerAvatar: "../assets/images/img-location.jpg" },
    { id: 4, name: "شركة الكهرباء - Electricity Company - مكة", employees: 4, manager: "عبدالله محمد", managerAvatar: "../assets/images/img-location.jpg" },
    { id: 5, name: "شركة الكهرباء - Electricity Company - المدينة", employees: 6, manager: "سارة أحمد", managerAvatar: "../assets/images/img-location.jpg" },
    { id: 6, name: "شركة الكهرباء - Electricity Company - الطائف", employees: 2, manager: "خالد عبدالرحمن", managerAvatar: "../assets/images/img-location.jpg" },
    { id: 7, name: "شركة الكهرباء - Electricity Company - أبها", employees: 3, manager: "نورا سليم", managerAvatar: "../assets/images/img-location.jpg" },
    { id: 8, name: "شركة الكهرباء - Electricity Company - تبوك", employees: 4, manager: "يوسف الأحمد", managerAvatar: "../assets/images/img-location.jpg" },
    { id: 9, name: "شركة الكهرباء - Electricity Company - حائل", employees: 2, manager: "مريم العلي", managerAvatar: "../assets/images/img-location.jpg" },
    { id: 10, name: "شركة الكهرباء - Electricity Company - الجوف", employees: 3, manager: "عمر الحسن", managerAvatar: "../assets/images/img-location.jpg" },
    { id: 11, name: "شركة الكهرباء - Electricity Company - نجران", employees: 5, manager: "ليلى محمود", managerAvatar: "../assets/images/img-location.jpg" },
    { id: 12, name: "شركة الكهرباء - Electricity Company - جازان", employees: 4, manager: "حسام الدين", managerAvatar: "../assets/images/img-location.jpg" },
    { id: 13, name: "شركة الكهرباء - Electricity Company - الباحة", employees: 2, manager: "رانيا سعد", managerAvatar: "../assets/images/img-location.jpg" },
    { id: 14, name: "شركة الكهرباء - Electricity Company - عرعر", employees: 3, manager: "طارق الشمري", managerAvatar: "../assets/images/img-location.jpg" },
    { id: 15, name: "شركة الكهرباء - Electricity Company - سكاكا", employees: 6, manager: "هند الزهراني", managerAvatar: "../assets/images/img-location.jpg" }
];

// Global variables
let currentData = [...sampleData];
let filteredData = [...sampleData];
let currentPage = 1;
const itemsPerPage = 6;

// DOM elements
const searchInput = document.getElementById('searchInput');
const tableBody = document.getElementById('tableBody');
const paginationContainer = document.querySelector('.pagination-container');
const modal = document.getElementById('addLocationModal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderTable();
    renderPagination();
    setupEventListeners();
});

// Debounce function
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

// Setup all event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    document.querySelector('.search-btn').addEventListener('click', handleSearch);

    document.querySelector('.add-new-btn').addEventListener('click', openModal);
    modal.querySelector('.save-btn').addEventListener('click', saveNewLocation);
    modal.querySelector('.cancel-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            handleSearch();
            searchInput.blur();
        }
    });
}

// Handle search functionality
function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    filteredData = currentData.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.manager.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    renderTable();
    renderPagination();

    if (filteredData.length === 0 && searchTerm !== '') {
        showNotification('لم يتم العثور على نتائج مطابقة للبحث', 'warning');
    }
}

// Render table with current page data
function renderTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);

    tableBody.innerHTML = ''; 

    if (pageData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 40px; color: #6b7280;">
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <span>لا توجد بيانات للعرض</span>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    pageData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.dataset.id = item.id;
        row.style.animation = `fadeIn 0.3s ease-out forwards`;
        row.style.animationDelay = `${index * 0.05}s`;
        row.style.opacity = 0; 
        
        row.innerHTML = `
            <td>
                <div class="company-info">
                    <span class="company-name">${item.name}</span>
                </div>
            </td>
            <td>
                <div class="employee-count">
                    <span class="count">${item.employees}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
            </td>
            <td>
                <div class="manager-info">
                    <img src="${item.managerAvatar}" alt="${item.manager}" class="manager-avatar">
                    <span class="manager-name">${item.manager}</span>
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="dash-btn delete-btn" onclick="handleDelete(${item.id})">حذف</button>
                    <button class="dash-btn change-region-btn" onclick="handleChangeRegion(${item.id})">تبديل</button>
                    <button class="dash-btn edit-btn" onclick="handleEdit(${item.id})">تعديل</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Render pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    paginationContainer.innerHTML = ''; 

    if (totalPages <= 1) return;

    let paginationHTML = `<div class="pagination">`;
    
    paginationHTML += `
        <button class="pagination-btn prev-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15,18 9,12 15,6"></polyline></svg>
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="pagination-btn page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>
        `;
    }

    paginationHTML += `
        <button class="pagination-btn next-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,18 15,12 9,6"></polyline></svg>
        </button>
    `;
    
    paginationHTML += `</div>`;
    paginationContainer.innerHTML = paginationHTML;
}

// Change page function
function changePage(page) {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderTable();
    renderPagination();

    document.querySelector('.table-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Action handlers
function handleDelete(id) {
    const item = currentData.find(item => item.id === id);
    if (item && confirm(`هل أنت متأكد من حذف ${item.name}؟`)) {
        currentData = currentData.filter(d => d.id !== id);
        
        handleSearch();
        
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }
        
        renderTable();
        renderPagination();
        showNotification('تم حذف العنصر بنجاح', 'success');
    }
}

// Modal functions
function openModal() {
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.getElementById('locationName').value = '';
        document.getElementById('locationManager').value = '';
        document.getElementById('locationAddress').value = '';
    }, 300);
}

function saveNewLocation() {
    const name = document.getElementById('locationName').value.trim();
    const manager = document.getElementById('locationManager').value.trim();
    const address = document.getElementById('locationAddress').value.trim();

    if (!name || !manager || !address) {
        showNotification('يرجى ملء جميع الحقول', 'error');
        return;
    }

    const newId = currentData.length > 0 ? Math.max(...currentData.map(d => d.id)) + 1 : 1;
    const newLocation = {
        id: newId,
        name: `${name} - ${address}`,
        employees: 0,
        manager: manager,
        managerAvatar: "../assets/images/img-location.jpg",
        address: address
    };

    currentData.unshift(newLocation);
    searchInput.value = ''; 
    handleSearch(); 
    closeModal();
    showNotification('تمت إضافة الموقع بنجاح!', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>
    `;

    const styleId = 'notification-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .notification { position: fixed; top: 80px; left: 20px; z-index: 1000; max-width: 400px; padding: 16px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); animation: slideInLeft 0.3s ease-out; }
            .notification-info { background-color: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; }
            .notification-success { background-color: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
            .notification-warning { background-color: #fffbeb; border: 1px solid #fed7aa; color: #92400e; }
            .notification-error { background-color: #fef2f2; border: 1px solid #fecaca; color: #dc2626; }
            .notification-content { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
            .notification-close { background: none; border: none; cursor: pointer; padding: 4px; border-radius: 4px; opacity: 0.7; transition: opacity 0.2s ease; }
            .notification-close:hover { opacity: 1; }
            @keyframes slideInLeft { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes fadeOut { to { opacity: 0; } }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => notification.remove(), 500);
        }
    }, 5000);
}

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