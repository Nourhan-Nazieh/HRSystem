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
