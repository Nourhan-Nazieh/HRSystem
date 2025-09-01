


// ==========================Atendence Report==========================
document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) {
        console.error('Error: Calendar grid element not found!');
        return; 
    }

    // بيانات وهمية مطابقة للصورة
    const attendanceData = [
        { day: 'السبت', date: '01', status: 'green' }, { day: 'الأحد', date: '02', status: 'dark-red' },
        { day: 'الاثنين', date: '03', status: 'green' }, { day: 'الثلاثاء', date: '04', status: 'blue' },
        { day: 'الأربعاء', date: '05', status: 'green' }, { day: 'الخميس', date: '06', status: 'green' },
        { day: 'الجمعة', date: '07', status: 'black' }, { day: 'السبت', date: '08', status: 'green' },
        { day: 'الأحد', date: '09', status: 'red' }, { day: 'الاثنين', date: '10', status: 'green' },
        { day: 'الثلاثاء', date: '11', status: 'green' }, { day: 'الأربعاء', date: '12', status: 'green' },
        { day: 'الخميس', date: '13', status: 'green' }, { day: 'الجمعة', date: '14', status: 'black' },
        { day: 'السبت', date: '15', status: 'green' }, { day: 'الأحد', date: '16', status: 'green' },
        { day: 'الاثنين', date: '17', status: 'yellow', value: '20' }, { day: 'الثلاثاء', date: '18', status: 'green' },
        { day: 'الأربعاء', date: '19', status: 'red', value: '5' }, { day: 'الخميس', date: '20', status: 'green' },
        { day: 'الجمعة', date: '21', status: 'black' }, { day: 'السبت', date: '22', status: 'green' },
        { day: 'الأحد', date: '23', status: 'green' }, { day: 'الاثنين', date: '24', status: 'red', value: '15' },
        { day: 'الثلاثاء', date: '25', status: 'green' }, { day: 'الأربعاء', date: '26', status: 'green-num', value: '10' },
        { day: 'الخميس', date: '27', status: 'blue' }, { day: 'الجمعة', date: '28', status: 'black' },
    ];

    // مسح الشبكة قبل إضافة العناصر الجديدة
    calendarGrid.innerHTML = '';

    // إنشاء خلايا التقويم
    attendanceData.forEach(data => {
        const dayCell = document.createElement('div');
        // استخدام الكلاس الصحيح والمطابق لملف الـ CSS
        dayCell.className = 'pro-day-cell'; 

        const dayName = document.createElement('span');
        dayName.className = 'day-name';
        dayName.textContent = `${data.day} - ${data.date}`;

        const statusDot = document.createElement('span');
        statusDot.className = `status-dot ${data.status}`;
        if (data.value) {
            statusDot.textContent = data.value;
        }

        dayCell.appendChild(dayName);
        dayCell.appendChild(statusDot);
        calendarGrid.appendChild(dayCell);
    });
});
