document.addEventListener('DOMContentLoaded', function () {
    // تفعيل مكتبة الأنيميشن
    AOS.init({
        duration: 600,
        once: true,
    });

    // --- Interactive Stars Logic ---
    const starsContainer = document.getElementById('interactive-stars');
    const ratingInput = document.getElementById('rating-value');
    const stars = starsContainer.querySelectorAll('i');

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            resetStars();
            const currentValue = this.dataset.value;
            highlightStars(currentValue);
        });

        star.addEventListener('mouseout', function() {
            resetStars();
            const selectedValue = ratingInput.value;
            if (selectedValue) {
                highlightStars(selectedValue);
            }
        });

        star.addEventListener('click', function() {
            const value = this.dataset.value;
            ratingInput.value = value;
            highlightStars(value, true);
        });
    });

    function resetStars() {
        stars.forEach(star => {
            star.classList.remove('hover', 'selected');
            star.classList.replace('fas', 'far');
        });
    }

    function highlightStars(value, isSelected = false) {
        for (let i = 0; i < value; i++) {
            stars[i].classList.add(isSelected ? 'selected' : 'hover');
            stars[i].classList.replace('far', 'fas');
        }
    }

    // --- Target List Toggling Logic ---
    const targetToggles = document.querySelectorAll('input[name="target-type"]');
    const departmentsList = document.getElementById('departments-list');
    const employeesList = document.getElementById('employees-list');

    targetToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            if (this.value === 'departments') {
                departmentsList.classList.remove('hidden');
                employeesList.classList.add('hidden');
            } else {
                employeesList.classList.remove('hidden');
                departmentsList.classList.add('hidden');
            }
        });
    });

    // --- "Select All" Checkbox Logic ---
    function setupSelectAll(allCheckboxId, listId) {
        const allCheckbox = document.getElementById(allCheckboxId);
        const list = document.getElementById(listId);
        const itemCheckboxes = list.querySelectorAll('input[type="checkbox"]:not([value="all-depts"]):not([value="all-emps"])');

        allCheckbox.addEventListener('change', function() {
            itemCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }

    setupSelectAll('check-all-depts', 'departments-list');
    setupSelectAll('check-all-emps', 'employees-list');
});
