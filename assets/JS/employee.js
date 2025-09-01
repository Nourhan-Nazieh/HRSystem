document.addEventListener('DOMContentLoaded', function () {
    // تفعيل مكتبة الأنيميشن
    AOS.init({
        duration: 600,
        once: true,
    });

    // --- Live Search Filter Logic ---
    const searchInput = document.getElementById('search-input');
    const tableBody = document.getElementById('employees-table-body');
    const rows = tableBody.querySelectorAll('tr');

    searchInput.addEventListener('keyup', function(event) {
        const searchTerm = event.target.value.toLowerCase();

        rows.forEach(row => {
            // نجمع كل النصوص في الصف للبحث فيها
            const rowText = row.textContent.toLowerCase();
            
            if (rowText.includes(searchTerm)) {
                row.classList.remove('hidden');
            } else {
                row.classList.add('hidden');
            }
        });
    });

// --- Filter by Status (Active / Inactive in Arabic) ---
const filterBtn = document.getElementById('filter-btn');
let currentFilter = 'all'; // 'all', 'نشط', 'غير نشط'

filterBtn.addEventListener('click', function() {
    if (currentFilter === 'all') {
        currentFilter = 'نشط';
        filterBtn.innerHTML = '<i class="fas fa-check-circle"></i> النشطين ';
    } else if (currentFilter === 'نشط') {
        currentFilter = 'غير نشط';
        filterBtn.innerHTML = '<i class="fas fa-times-circle"></i> غير النشطين ';
    } else {
        currentFilter = 'all';
        filterBtn.innerHTML = '<i class="fas fa-sort-amount-down"></i> تصنيف';
    }

    rows.forEach(row => {
        const status = row.dataset.status;
        if (currentFilter === 'all' || status === currentFilter) {
            row.classList.remove('hidden');
        } else {
            row.classList.add('hidden');
        }
    });
});

});
