document.addEventListener('DOMContentLoaded', function () {
    AOS.init({ duration: 600, once: true });

    const searchInput = document.getElementById('search-input');
    const tableBody = document.getElementById('work-times-table-body');
    const mainModal = document.getElementById('main-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // --- Dummy Data ---
    let workTimesData = [
        { id: 1, name: 'فترة عمل - سعوديين - مكتب', employees: 2, start: '09:00 AM', end: '05:00 PM', late_limit: '10 دقائق' },
        { id: 2, name: 'فترة عمل مرنه 8 ساعات', employees: 3, start: '11:00 AM', end: '07:00 PM', late_limit: '12 دقيقة' },
        { id: 3, name: 'فترة عمل معدات - الوقت الصيفي', employees: 132, start: '08:00 AM', end: '04:00 PM', late_limit: '12 دقيقة' },
        { id: 4, name: 'فترة عمل مقاولات - مشروع نمار - نهار', employees: 12, start: '10:00 AM', end: '06:00 PM', late_limit: '12 دقيقة' },
        { id: 5, name: 'فترة عمل المقاولات صباحا مشروع نمار', employees: 35, start: '12:00 AM', end: '08:00 PM', late_limit: '12 دقيقة' },
    ];

    // --- Render Table ---
    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.dataset.id = item.id;
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.employees}</td>
                <td>${item.start}</td>
                <td>${item.end}</td>
                <td>${item.late_limit}</td>
                <td>
                    <div class="controls-cell">
                        <button class="control-btn edit-btn"><i class="fas fa-pen"></i></button>
                        <button class="control-btn delete-btn"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // --- Live Search ---
    searchInput.addEventListener('keyup', function () {
        const searchTerm = this.value.toLowerCase();
        const filteredData = workTimesData.filter(item => 
            Object.values(item).join(' ').toLowerCase().includes(searchTerm)
        );
        renderTable(filteredData);
    });

    // --- Modal Handling ---
    function openModal() { mainModal.classList.remove('hidden'); }
    function closeModal() { mainModal.classList.add('hidden'); }
    modalCloseBtn.addEventListener('click', closeModal);
    mainModal.addEventListener('click', (e) => { if (e.target === mainModal) closeModal(); });

    // --- Add/Edit/Filter Forms ---
    function showEditForm(item) {
        modalTitle.textContent = 'تعديل وقت العمل';
        modalContent.innerHTML = `
            <div class="modal-form-group">
                <label>اسم الفترة</label>
                <input type="text" class="form-control" value="${item.name}">
            </div>
            <div class="row">
                <div class="col-md-6"><div class="modal-form-group"><label>وقت الحضور</label><input type="text" class="form-control" value="${item.start}"></div></div>
                <div class="col-md-6"><div class="modal-form-group"><label>وقت الانصراف</label><input type="text" class="form-control" value="${item.end}"></div></div>
            </div>
            <button class="btn btn-primary mt-3">حفظ التعديلات</button>
        `;
        openModal();
    }
    
    function showAddForm() {
        modalTitle.textContent = 'إضافة وقت عمل جديد';
        modalContent.innerHTML = `
            <div class="modal-form-group">
                <label>اسم الفترة</label>
                <input type="text" class="form-control" placeholder="مثال: فترة مسائية">
            </div>
             <div class="row">
                <div class="col-md-6"><div class="modal-form-group"><label>وقت الحضور</label><input type="text" class="form-control" placeholder="08:00 PM"></div></div>
                <div class="col-md-6"><div class="modal-form-group"><label>وقت الانصراف</label><input type="text" class="form-control" placeholder="04:00 AM"></div></div>
            </div>
            <button class="btn btn-primary mt-3">إضافة</button>
        `;
        openModal();
    }

    function showFilterForm() {
        modalTitle.textContent = 'تصنيف أوقات العمل';
        modalContent.innerHTML = `
            <div class="modal-form-group">
                <label>ترتيب حسب عدد الموظفين</label>
                <select class="form-control" id="sort-select">
                    <option value="default">افتراضي</option>
                    <option value="most">من الأكثر للأقل</option>
                    <option value="least">من الأقل للأكثر</option>
                </select>
            </div>
        `;
        openModal();

        document.getElementById('sort-select').addEventListener('change', function() {
            const sortValue = this.value;
            let sortedData = [...workTimesData];
            if (sortValue === 'most') {
                sortedData.sort((a, b) => b.employees - a.employees);
            } else if (sortValue === 'least') {
                sortedData.sort((a, b) => a.employees - b.employees);
            }
            renderTable(sortedData);
            closeModal();
        });
    }

    // --- Event Delegation for Table Actions ---
    tableBody.addEventListener('click', function (e) {
        const editBtn = e.target.closest('.edit-btn');
        const deleteBtn = e.target.closest('.delete-btn');
        
        if (editBtn) {
            const rowId = editBtn.closest('tr').dataset.id;
            const item = workTimesData.find(d => d.id == rowId);
            showEditForm(item);
        }

        if (deleteBtn) {
            const row = deleteBtn.closest('tr');
            const workTimeName = row.cells[0].textContent;
            Swal.fire({
                title: 'هل أنت متأكد؟',
                text: `سيتم حذف "${workTimeName}" نهائياً!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#D32F2F',
                cancelButtonColor: '#8A909D',
                confirmButtonText: 'نعم، قم بالحذف!',
                cancelButtonText: 'إلغاء'
            }).then((result) => {
                if (result.isConfirmed) {
                    row.style.transition = 'opacity 0.5s ease';
                    row.style.opacity = '0';
                    setTimeout(() => {
                        workTimesData = workTimesData.filter(item => item.id != row.dataset.id);
                        renderTable(workTimesData);
                        Swal.fire('تم الحذف!', 'تم حذف فترة العمل بنجاح.', 'success');
                    }, 500);
                }
            });
        }
    });

    document.getElementById('add-new-btn').addEventListener('click', showAddForm);
    document.getElementById('filter-btn').addEventListener('click', showFilterForm);

    // --- Initial Render ---
    renderTable(workTimesData);
});

// ===================================
document.addEventListener('DOMContentLoaded', function ( ) {
    AOS.init({ duration: 600, once: true });

    // --- عناصر الواجهة ---
    const modal = document.getElementById('main-modal');
    const modalForm = document.getElementById('modal-form');
    const addNewBtn = document.getElementById('add-new-btn');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const tableBody = document.getElementById('work-times-table-body');

    // --- تفعيل flatpickr لاختيار الوقت ---
    flatpickr(".time-picker", { enableTime: true, noCalendar: true, dateFormat: "h:i K" });

    // --- وظيفة فتح وإغلاق المودال ---
    const openModal = () => modal.classList.remove('hidden');
    const closeModal = () => modal.classList.add('hidden');

    addNewBtn.addEventListener('click', () => {
        modalForm.reset();
        document.getElementById('modal-title').textContent = 'إضافة وقت عمل جديد';
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
            // منطق التعديل (يملأ الفورم ببيانات الصف الحالي)
            document.getElementById('modal-title').textContent = 'تعديل وقت العمل';
            document.getElementById('modal-submit-btn').textContent = 'حفظ التعديلات';
            modalForm.dataset.mode = 'edit';
            // (هنا يمكنك إضافة كود لجلب البيانات من الصف وتعبئة الفورم)
            openModal();
        }

        if (deleteBtn) {
            Swal.fire({
                title: 'هل أنت متأكد؟', text: "لا يمكن التراجع عن هذا الإجراء!", icon: 'warning',
                showCancelButton: true, confirmButtonColor: '#dc3545', cancelButtonText: 'إلغاء', confirmButtonText: 'نعم، احذفه!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteBtn.closest('tr').remove();
                    Swal.fire('تم الحذف!', 'تم حذف وقت العمل بنجاح.', 'success');
                }
            });
        }
    });

    // --- منطق إرسال الفورم ---
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const mode = modalForm.dataset.mode;
        const message = mode === 'add' ? 'تمت الإضافة بنجاح!' : 'تم التعديل بنجاح!';
        Swal.fire('تم!', message, 'success');
        closeModal();
    });
});