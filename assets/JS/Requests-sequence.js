document.addEventListener('DOMContentLoaded', function () {
    // تفعيل مكتبة الأنيميشن
    AOS.init({
        duration: 600,
        once: true,
    });

    // --- Search Filter Logic ---
    const searchInput = document.getElementById('search-input');
    const requestsGrid = document.getElementById('requests-grid');
    const cards = requestsGrid.querySelectorAll('.request-card');

    searchInput.addEventListener('keyup', function(event) {
        const searchTerm = event.target.value.toLowerCase();

        cards.forEach(card => {
            // البحث في عنوان الطلب وحالته
            const title = card.dataset.title.toLowerCase();
            const status = card.dataset.status.toLowerCase();

            if (title.includes(searchTerm) || status.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });

    // --- Delete Card Logic with SweetAlert2 ---
    requestsGrid.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-delete')) {
            const cardToDelete = event.target.closest('.request-card');

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
                    // Add deleting class for animation
                    cardToDelete.classList.add('deleting');
                    
                    // Remove the card from the DOM after the animation ends
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
