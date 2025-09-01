document.addEventListener('DOMContentLoaded', function () {
    // تفعيل مكتبة الأنيميشن
    AOS.init({
        duration: 600,
        once: true,
    });

    // --- Generate Stars Dynamically ---
    const allRatingContainers = document.querySelectorAll('.rating-stars');
    allRatingContainers.forEach(container => {
        const rating = parseInt(container.dataset.rating, 10);
        container.innerHTML = ''; // Clear any existing content
        for (let i = 1; i <= 5; i++) {
            const starIcon = document.createElement('i');
            starIcon.classList.add('fas', 'fa-star', 'star');
            if (i <= rating) {
                starIcon.classList.add('filled');
            } else {
                starIcon.classList.add('empty');
            }
            container.appendChild(starIcon);
        }
    });

    // --- Filtering Logic ---
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const appraisalsGrid = document.getElementById('appraisals-grid');
    const cards = appraisalsGrid.querySelectorAll('.appraisal-card');

    function filterCards() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;

        cards.forEach(card => {
            const employeeName = card.dataset.employee.toLowerCase();
            const appraisalTitle = card.dataset.title.toLowerCase();
            const cardStatus = card.dataset.status;

            const searchMatch = employeeName.includes(searchTerm) || appraisalTitle.includes(searchTerm);
            const filterMatch = (activeFilter === 'all') || (cardStatus === activeFilter);

            if (searchMatch && filterMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Event listener for search input
    searchInput.addEventListener('keyup', filterCards);

    // Event listeners for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterCards();
        });
    });
});
