document.addEventListener('DOMContentLoaded', function () {
    // تفعيل مكتبة الأنيميشن
    AOS.init({
        duration: 600, // مدة الأنيميشن
        once: true,    // لتشغيل الأنيميشن مرة واحدة فقط
    });
});
/* <!-- ======================= Add Alert ==================== --> */

document.addEventListener('DOMContentLoaded', function () {
    // تفعيل مكتبة الأنيميشن
    AOS.init({
        duration: 600,
        once: true,
    });

    // --- Modal Logic ---
    const addAlertCard = document.querySelector('.add-new-card');
    const modalOverlay = document.getElementById('add-alert-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // وظيفة فتح المودال
    function openModal() {
        if (modalOverlay) {
            modalOverlay.classList.add('active');
        }
    }

    // وظيفة إغلاق المودال
    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    }

    // ربط الأحداث
    if (addAlertCard) {
        addAlertCard.addEventListener('click', openModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // إغلاق المودال عند النقر على الخلفية
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }
});
// ===================================Delet-Allert============================== 
document.addEventListener('DOMContentLoaded', function () {
    // تفعيل مكتبة الأنيميشن
    AOS.init({
        duration: 600,
        once: true,
    });

    // --- Modal لإضافة تنبيه جديد ---
    const addAlertCard = document.querySelector('.add-new-card');
    const addAlertModal = document.getElementById('add-alert-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (addAlertCard) addAlertCard.addEventListener('click', () => addAlertModal.classList.add('active'));
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => addAlertModal.classList.remove('active'));
    if (addAlertModal) addAlertModal.addEventListener('click', (e) => {
        if (e.target === addAlertModal) addAlertModal.classList.remove('active');
    });

    // --- Alert لتأكيد الحذف (الكود الجديد) ---
    const deleteConfirmAlert = document.getElementById('delete-confirm-alert');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const allDeleteButtons = document.querySelectorAll('.btn-delete');
    let cardToDelete = null; // لتخزين البطاقة التي سيتم حذفها

    // وظيفة إظهار تنبيه الحذف
    function showDeleteAlert(card) {
        cardToDelete = card; // حفظ البطاقة المستهدفة
        deleteConfirmAlert.classList.add('active');
    }

    // وظيفة إخفاء تنبيه الحذف
    function hideDeleteAlert() {
        deleteConfirmAlert.classList.remove('active');
        cardToDelete = null;
    }

    // ربط كل أزرار الحذف في الصفحة بوظيفة إظهار التنبيه
    allDeleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.alert-card'); // الحصول على البطاقة الأب
            showDeleteAlert(card);
        });
    });

    // عند النقر على "إغلاق" في التنبيه
    cancelDeleteBtn.addEventListener('click', hideDeleteAlert);

    // عند النقر على "حذف" في التنبيه (الأهم)
    confirmDeleteBtn.addEventListener('click', function() {
        if (cardToDelete) {
            // 1. إضافة كلاس لبدء أنيميشن الاختفاء
            cardToDelete.classList.add('deleting');

            // 2. بعد انتهاء الأنيميشن، قم بإزالة العنصر من الصفحة
            cardToDelete.addEventListener('transitionend', () => {
                cardToDelete.remove();
            });

            // 3. إخفاء نافذة التنبيه
            hideDeleteAlert();
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // تفعيل AOS
    AOS.init({ duration: 600, once: true });

    // --- عناصر الواجهة ---
    const addModal = document.getElementById('add-alert-modal');
    const editModal = document.getElementById('edit-alert-modal'); // افترض وجوده
    const deleteAlert = document.getElementById('delete-confirm-alert');
    const toastContainer = document.getElementById('toast-container');

    // --- وظيفة إظهار الإشعارات (Toast) بشكل احترافي ---
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        // HTML الخاص بالأيقونة المتحركة
        const iconHtml = `
            <div class="toast-icon">
                <svg class="svg-success" viewBox="0 0 52 52">
                    <circle class="svg-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="svg-check" fill="none" stroke="#28a745" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
            </div>
        `;

        toast.innerHTML = `
            <div class="toast-content">
                ${iconHtml}
                <span class="toast-message">${message}</span>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove());
        }, 4000); // زيادة مدة العرض قليلاً
    }

    // --- ربط الأحداث (باقي الكود كما هو) ---
    const addCardBtn = document.querySelector('.add-new-card');
    const closeAddModalBtn = document.getElementById('close-modal-btn');
    const closeEditModalBtn = document.getElementById('close-edit-modal-btn'); // افترض وجوده
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    let cardToDelete = null;

    function openModal(modal) { if (modal) modal.classList.add('active'); }
    function closeModal(modal) { if (modal) modal.classList.remove('active'); }

    // مودال الإضافة
    if (addCardBtn) addCardBtn.addEventListener('click', () => openModal(addModal));
    if (closeAddModalBtn) closeAddModalBtn.addEventListener('click', () => closeModal(addModal));
    if (addModal) {
        addModal.addEventListener('click', (e) => { if (e.target === addModal) closeModal(addModal); });
        // عند تأكيد الإضافة
        const confirmAddBtn = addModal.querySelector('.btn-confirm');
        if(confirmAddBtn) confirmAddBtn.addEventListener('click', () => {
            closeModal(addModal);
            showToast('تمت الإضافة بنجاح!');
        });
    }

    // مودال التعديل
    if (closeEditModalBtn) closeEditModalBtn.addEventListener('click', () => closeModal(editModal));
    if (editModal) {
        editModal.addEventListener('click', (e) => { if (e.target === editModal) closeModal(editModal); });
        // عند تأكيد التعديل
        const confirmEditBtn = editModal.querySelector('.btn-confirm');
        if(confirmEditBtn) confirmEditBtn.addEventListener('click', () => {
            closeModal(editModal);
            showToast('تم التعديل بنجاح!');
        });
    }

    // تنبيه الحذف
    if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', () => closeModal(deleteAlert));
    if (confirmDeleteBtn) confirmDeleteBtn.addEventListener('click', () => {
        if (cardToDelete) {
            cardToDelete.classList.add('deleting');
            cardToDelete.addEventListener('transitionend', () => cardToDelete.remove());
            closeModal(deleteAlert);
            showToast('تم الحذف بنجاح!');
        }
    });

    // ربط الأزرار الديناميكية
    document.querySelector('.alerts-grid').addEventListener('click', function(e) {
        if (e.target.closest('.btn-edit')) { openModal(editModal); }
        if (e.target.closest('.btn-delete')) {
            cardToDelete = e.target.closest('.alert-card');
            openModal(deleteAlert);
        }
    });
    
    // كود الفلترة (كما هو)
    // ...
});
const tabs = document.querySelectorAll(".tab-btn");
const cards = document.querySelectorAll(".alert-card");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // إزالة active من كل التابات
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.getAttribute("data-filter");

    cards.forEach(card => {
      const type = card.getAttribute("data-type");
      if(filter === "all" || type === filter){
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
