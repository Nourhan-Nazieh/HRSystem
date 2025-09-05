document.addEventListener('DOMContentLoaded', function () {
    // تفعيل مكتبة الأنيميشن
    AOS.init({ duration: 600, once: true });

    // --- Search Filter Logic ---
    const searchInput = document.getElementById('search-input');
    const requestsGrid = document.getElementById('requests-grid');
    const cards = requestsGrid.querySelectorAll('.request-card');

    searchInput.addEventListener('keyup', function(event) {
        const searchTerm = event.target.value.toLowerCase();

        cards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            const status = card.dataset.status.toLowerCase();

            if (title.includes(searchTerm) || status.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });

    // --- Filtering Logic with Pills ---
    const filterPills = document.getElementById('filter-pills-status');
    filterPills.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-pill')) {
            this.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');
            const filterValue = e.target.dataset.filter;
            
            requestsGrid.querySelectorAll('.request-card').forEach(card => {
                const cardStatus = card.dataset.status;
                card.style.display = (filterValue === 'all' || filterValue === cardStatus) ? 'block' : 'none';
            });
        }
    });

    // --- Delete Card Logic with SweetAlert2 Modal ---
    requestsGrid.addEventListener('click', function(e) {
        const deleteBtn = e.target.closest('.btn-delete');
        if (deleteBtn) {
            const cardToDelete = deleteBtn.closest('.request-card');

            Swal.fire({
                title: 'هل أنت متأكد؟',
                text: "لن تتمكن من التراجع عن هذا الإجراء!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#D32F2F',
                cancelButtonColor: '#1E88E5',
                confirmButtonText: 'نعم، احذفه!',
                cancelButtonText: 'إلغاء'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Add deleting class for animation (اختياري لو عندك CSS للـ animation)
                    cardToDelete.classList.add('deleting');

                    // إزالة الكارد بعد انتهاء أنيميشن (أو مباشرة)
                    cardToDelete.addEventListener('transitionend', () => {
                        cardToDelete.remove();
                        Swal.fire(
                            'تم الحذف!',
                            'لقد تم حذف الطلب بنجاح.',
                            'success'
                        );
                    });
                }
            });
        }
    });
});
