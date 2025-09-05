document.addEventListener('DOMContentLoaded', function ( ) {
    // تفعيل AOS
    AOS.init({ duration: 800, once: true, offset: 50 });

    // منطق القائمة المنسدلة للفلترة
    const filterBtn = document.querySelector('.filter-btn');
    const filterMenu = document.querySelector('.filter-menu');
    if(filterBtn) {
      filterBtn.addEventListener('click', (e) => {
          e.stopPropagation(); // منع إغلاق القائمة فوراً
          filterMenu.classList.toggle('show');
      });
    }
    // إغلاق القائمة عند الضغط في أي مكان آخر
    document.addEventListener('click', () => {
      if(filterMenu && filterMenu.classList.contains('show')) {
          filterMenu.classList.remove('show');
      }
    });
  });