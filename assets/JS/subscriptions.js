document.addEventListener('DOMContentLoaded', () => {
    const subscriptionsList = document.getElementById('subscriptions-list');

    // 1. البيانات الأولية (يمكن جلبها من قاعدة بيانات)
    const subscriptionsData = [
        { id: 'MA-2950756', date: '15/7/2025', price: '729', status: 'نشط' },
        { id: 'MA-2950756', date: '15/7/2025', price: '729.50', status: 'نشط' },
        { id: 'MA-2950756', date: '15/7/2025', price: '729', status: 'نشط' },
        { id: 'MA-2950756', date: '15/7/2025', price: '729', status: 'نشط' },
        { id: 'MA-2950756', date: '15/7/2025', price: '729', status: 'نشط' },
        { id: 'MA-2950756', date: '15/7/2025', price: '729', status: 'نشط' },
    ];

    // 2. دالة لرسم البيانات
    const renderSubscriptions = () => {
        subscriptionsList.innerHTML = ''; // مسح أي بيانات قديمة

        subscriptionsData.forEach(sub => {
            const item = document.createElement('div');
            item.className = 'sub-table-row';
            item.innerHTML = `
                <span>${sub.id}</span>
                <span>${sub.date}</span>
                <span>${sub.price}</span>
                <span><div class="sub-status">${sub.status}</div></span>
                <div class="sub-actions">
                    <button class="sub-action-btn btn-view">عرض</button>
                    <button class="sub-action-btn btn-delete">حذف</button>
                </div>
            `;
            subscriptionsList.appendChild(item);
        });
    };

    // 3. العرض الأولي عند تحميل الصفحة
    renderSubscriptions();
});


document.addEventListener('DOMContentLoaded', function ( ) {
    AOS.init({ duration: 600, once: true });

    // --- Dummy Data ---
    const subsData = [
        { id: 1, offerNo: 'ORD-001', date: '2024-07-15', price: 500, status: 'مدفوع' },
        { id: 2, offerNo: 'ORD-002', date: '2024-08-15', price: 500, status: 'في الانتظار' },
    ];

    // --- عناصر الواجهة ---
    const listContainer = document.getElementById('subscriptions-list');
    const renewBtn = document.getElementById('renew-btn');
    const renewalModal = document.getElementById('renewal-modal');

    // --- وظيفة عرض البيانات ---
    function renderList() {
        listContainer.innerHTML = '';
        subsData.forEach(sub => {
            const itemHTML = `
                <div class="sub-table-row" data-id="${sub.id}">
                    <span>${sub.offerNo}</span>
                    <span>${sub.date}</span>
                    <span>${sub.price} ريال</span>
                    <td><span class="sub-status">${sub.status}</span></td>
                    <td><div class="sub-actions"><button class="sub-action-btn btn-view">عرض</button><button class="sub-action-btn btn-delete">حذف</button></div></td>
                </div>`;
            listContainer.insertAdjacentHTML('beforeend', itemHTML);
        });
    }

    // --- وظائف المودال ---
    renewBtn.addEventListener('click', () => renewalModal.classList.remove('hidden'));
    renewalModal.querySelector('.modal-close-btn').addEventListener('click', () => renewalModal.classList.add('hidden'));

    // --- منطق الحذف ---
    listContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-delete')) {
            Swal.fire({
                title: 'هل أنت متأكد؟', text: "لا يمكن التراجع عن هذا الإجراء!", icon: 'warning',
                showCancelButton: true, confirmButtonColor: '#dc3545', cancelButtonText: 'إلغاء', confirmButtonText: 'نعم، احذفه!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // (هنا يمكنك إضافة منطق الحذف الفعلي)
                    Swal.fire('تم الحذف!', 'تم حذف الاشتراك بنجاح.', 'success');
                }
            });
        }
    });

    // --- العرض الأولي للبيانات ---
    renderList();
});
