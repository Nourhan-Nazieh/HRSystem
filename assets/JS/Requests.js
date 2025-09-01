document.addEventListener('DOMContentLoaded', function () {
    // تفعيل مكتبة الأنيميشن
    AOS.init({
        duration: 600,
        once: true,
    });

    // --- Elements ---
    const tableBody = document.getElementById('requests-table-body');
    const filterType = document.getElementById('filter-request-type');
    const filterStatus = document.getElementById('filter-request-status');

    // --- Main Filter Function ---
    function filterTable() {
        const selectedType = filterType.value;
        const selectedStatus = filterStatus.value;
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const type = row.dataset.type;
            const status = row.dataset.status;

            const typeMatch = (selectedType === 'all') || (type === selectedType);
            const statusMatch = (selectedStatus === 'all') || (status === selectedStatus);

            if (typeMatch && statusMatch) {
                row.classList.remove('hidden');
                row.style.display = ''; // Reset display property
            } else {
                row.classList.add('hidden');
                // Hide completely after animation
                setTimeout(() => {
                    if (row.classList.contains('hidden')) {
                       row.style.display = 'none';
                    }
                }, 300); // Must match CSS transition duration
            }
        });
    }

    // --- Event Listeners for Filters ---
    if (filterType) filterType.addEventListener('change', filterTable);
    if (filterStatus) filterStatus.addEventListener('change', filterTable);

    // --- Table Interactivity Logic ---
    if (tableBody) {
        tableBody.addEventListener('click', function(event) {
            const target = event.target;

            // --- Logic for Accept/Reject Buttons ---
            if (target.closest('.action-icon')) {
                const button = target.closest('.action-icon');
                const cell = button.closest('.actions-cell');
                const allButtonsInCell = cell.querySelectorAll('.action-icon');
                const row = button.closest('tr');
                const statusTag = row.querySelector('.status-tag');
                
                allButtonsInCell.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                if (button.classList.contains('accept')) {
                    statusTag.textContent = 'موافق عليه';
                    statusTag.className = 'status-tag status-approved';
                    row.dataset.status = 'موافق عليه'; // Update data-attribute
                } else if (button.classList.contains('reject')) {
                    statusTag.textContent = 'مرفوضة';
                    statusTag.className = 'status-tag status-rejected';
                    row.dataset.status = 'مرفوضة'; // Update data-attribute
                }
                // Re-apply filters after status change
                filterTable();
            }

            // --- Logic for Delete Button ---
            if (target.closest('.btn-delete')) {
                const rowToDelete = target.closest('tr');
                if (confirm('هل أنت متأكد أنك تريد حذف هذا الطلب؟')) {
                    rowToDelete.classList.add('deleting');
                    rowToDelete.addEventListener('transitionend', () => rowToDelete.remove());
                }
            }
        });
    }
});
