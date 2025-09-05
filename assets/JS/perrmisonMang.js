document.addEventListener('DOMContentLoaded', () => {
    // --- البيانات ---
    let permissions = [
        { id: 1, name: 'مدير نظام' },
        { id: 2, name: 'مشرف' },
        { id: 3, name: 'مدير القسم' },
        { id: 4, name: 'موارد بشرية' }
    ];

    // --- عناصر الصفحة ---
    const permissionsListEl = document.querySelector('.permissions-list');
    const btnAddNew = document.querySelector('.btn-add-new');
    
    // --- عناصر النموذج (Modal) ---
    const modal = document.getElementById('permission-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalForm = document.getElementById('permission-form');
    const modalPermissionId = document.getElementById('modal-permission-id');
    const permissionNameInput = document.getElementById('permission-name');
    const btnCancel = document.querySelector('.modal-footer .btn-cancel');

    // --- دوال النموذج (Modal) ---
    const openModal = () => {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10); // لتفعيل تأثير الدخول
    };

    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            modalForm.reset(); // مسح بيانات النموذج عند الإغلاق
            modalPermissionId.value = '';
        }, 300); // انتظار انتهاء تأثير الخروج
    };

    // --- دالة عرض القائمة ---
    function renderPermissions() {
        permissionsListEl.innerHTML = `<div class="list-item list-header"><span class="item-name">الاسم</span></div>`;
        if (permissions.length === 0) {
            permissionsListEl.innerHTML += `<div class="list-item"><span class="item-name" style="color: #888;">لا توجد صلاحيات</span></div>`;
            return;
        }
        permissions.forEach(p => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.dataset.id = p.id;
            item.innerHTML = `
                <span class="item-name">${p.name}</span>
                <div class="item-actions">
                    <button class="btn-action btn-edit">تعديل</button>
                    <button class="btn-action btn-delete">حذف</button>
                </div>`;
            permissionsListEl.appendChild(item);
        });
    }

    // --- الأحداث ---

    // فتح النموذج لإضافة جديد
    btnAddNew.addEventListener('click', () => {
        modalTitle.textContent = 'اضافة مجموعة ادارية جديدة';
        openModal();
    });

    // التعامل مع القائمة (تعديل وحذف)
    permissionsListEl.addEventListener('click', (e) => {
        const id = parseInt(e.target.closest('.list-item')?.dataset.id);
        if (!id) return;

        // --- الحذف ---
        if (e.target.classList.contains('btn-delete')) {
            const p = permissions.find(p => p.id === id);
            if (confirm(`هل أنت متأكد من حذف صلاحية "${p.name}"؟`)) {
                permissions = permissions.filter(p => p.id !== id);
                renderPermissions();
            }
        }

        // --- التعديل ---
        if (e.target.classList.contains('btn-edit')) {
            const p = permissions.find(p => p.id === id);
            modalTitle.textContent = `تعديل: ${p.name}`;
            modalPermissionId.value = p.id;
            permissionNameInput.value = p.name;
            // هنا يمكنك أيضًا تحديد مربعات الاختيار المحفوظة لهذه الصلاحية
            openModal();
        }
    });

    // حفظ التغييرات (إضافة أو تعديل)
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = permissionNameInput.value.trim();
        const id = parseInt(modalPermissionId.value);

        if (!name) {
            alert('يرجى إدخال اسم للمجموعة.');
            return;
        }

        if (id) { // تعديل
            const p = permissions.find(p => p.id === id);
            p.name = name;
        } else { // إضافة
            const newId = permissions.length > 0 ? Math.max(...permissions.map(p => p.id)) + 1 : 1;
            permissions.push({ id: newId, name: name });
        }
        
        renderPermissions();
        closeModal();
    });

    // إغلاق النموذج
    modalCloseBtn.addEventListener('click', closeModal);
    btnCancel.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(); // إغلاق عند الضغط على الخلفية
    });

    // العرض الأولي
    renderPermissions();
});

// ============

document.addEventListener('DOMContentLoaded', function ( ) {
    AOS.init({ duration: 600, once: true });

    // --- Dummy Data ---
    let permissionsData = [
        { id: 1, name: 'مدير نظام' }, { id: 2, name: 'مشرف' },
        { id: 3, name: 'مدير القسم' }, { id: 4, name: 'موارد بشرية' }
    ];

    // --- عناصر الواجهة ---
    const listContainer = document.getElementById('permissions-list');
    const modal = document.getElementById('permission-modal');
    const addNewBtn = document.getElementById('add-new-btn');
    const closeModalBtn = modal.querySelector('.modal-close-btn');
    const cancelBtn = modal.querySelector('.btn-cancel');

    // --- وظيفة عرض البيانات ---
    function renderList() {
        const items = listContainer.querySelectorAll('.list-item:not(.list-header)');
        items.forEach(item => item.remove()); // Clear existing items
        permissionsData.forEach(perm => {
            const itemHTML = `
                <div class="list-item" data-id="${perm.id}">
                    <span class="item-name">${perm.name}</span>
                    <div class="item-actions">
                        <button class="btn-action btn-edit">تعديل</button>
                        <button class="btn-action btn-delete">حذف</button>
                    </div>
                </div>`;
            listContainer.insertAdjacentHTML('beforeend', itemHTML);
        });
    }

    // --- وظائف المودال ---
    const openModal = () => modal.classList.remove('hidden');
    const closeModal = () => modal.classList.add('hidden');

    addNewBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // --- منطق الحذف ---
    listContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-delete')) {
            Swal.fire({
                title: 'هل أنت متأكد؟', text: "لا يمكن التراجع عن هذا الإجراء!", icon: 'warning',
                showCancelButton: true, confirmButtonColor: '#dc3545', cancelButtonText: 'إلغاء', confirmButtonText: 'نعم، احذفه!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const item = e.target.closest('.list-item');
                    const id = parseInt(item.dataset.id, 10);
                    permissionsData = permissionsData.filter(p => p.id !== id);
                    renderList();
                    Swal.fire('تم الحذف!', 'تم حذف المجموعة بنجاح.', 'success');
                }
            });
        }
    });

    // --- العرض الأولي للبيانات ---
    renderList();
});
