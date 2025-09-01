document.addEventListener('DOMContentLoaded', function () {
    // تفعيل مكتبة الأنيميشن
    AOS.init({
        duration: 600, // مدة الأنيميشن
        once: true,    // لتشغيل الأنيميشن مرة واحدة فقط
    });
});
// ========================================================================
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

// =============================================================================
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
