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
// =========================
document.addEventListener('DOMContentLoaded', function ( ) {
    AOS.init({ duration: 600, once: true });

    // --- عناصر الواجهة ---
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.getElementById('filter-buttons');
    const appraisalsGrid = document.getElementById('appraisals-grid');
    const allCards = appraisalsGrid.querySelectorAll('.appraisal-card');
    const detailsModal = document.getElementById('details-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // --- 1. وظيفة رسم النجوم (تفعيل عرض التقييم) ---
    function renderStars() {
        document.querySelectorAll('.rating-stars').forEach(starContainer => {
            const rating = parseInt(starContainer.dataset.rating, 10);
            starContainer.innerHTML = ''; // Clear existing stars
            for (let i = 1; i <= 5; i++) {
                const starIcon = document.createElement('i');
                starIcon.className = `fas fa-star star ${i <= rating ? 'filled' : 'empty'}`;
                starContainer.appendChild(starIcon);
            }
        });
    }

    // --- 2. وظيفة الفلترة والبحث الشاملة ---
    function filterAndSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = filterButtons.querySelector('.active').dataset.filter;

        allCards.forEach(card => {
            const employee = card.dataset.employee.toLowerCase();
            const title = card.dataset.title.toLowerCase();
            const status = card.dataset.status;

            const searchMatch = employee.includes(searchTerm) || title.includes(searchTerm);
            const filterMatch = (activeFilter === 'all') || (status === activeFilter);

            card.style.display = (searchMatch && filterMatch) ? 'block' : 'none';
        });
    }

    // --- 3. وظائف المودال ---
    function openModal(card) {
        document.getElementById('modal-title').textContent = card.dataset.title;
        document.getElementById('modal-employee').textContent = card.dataset.employee;
        document.getElementById('modal-status').innerHTML = card.querySelector('.status-tag').outerHTML;
        document.getElementById('modal-rating').innerHTML = card.querySelector('.rating-stars').innerHTML;
        detailsModal.classList.add('active');
    }
    function closeModal() {
        detailsModal.classList.remove('active');
    }

    // --- ربط الأحداث ---
    renderStars(); // ارسم النجوم عند تحميل الصفحة
    searchInput.addEventListener('keyup', filterAndSearch);
    closeModalBtn.addEventListener('click', closeModal);
    detailsModal.addEventListener('click', (e) => { if(e.target === detailsModal) closeModal(); });

    filterButtons.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            filterButtons.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');
            filterAndSearch();
        }
    });

    appraisalsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.appraisal-card');
        if (card) {
            openModal(card);
        }
    });
});