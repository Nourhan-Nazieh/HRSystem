// ======================LOADER===================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.8s ease";
    setTimeout(() => loader.style.display = "none", 800);
  }, 2500); // يختفي بعد 2.5 ثانية
});



// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // ================= Sidebar Toggle (Desktop & Mobile) =================
    const toggleBtn = document.getElementById("sidebarToggle");
    const body = document.body;
  
    // Create backdrop if not exist
    let backdrop = document.querySelector(".sidebar-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "sidebar-backdrop";
      document.body.appendChild(backdrop);
    }
  
    function openMobileSidebar() {
      body.classList.add("sidebar-open");
      document.documentElement.style.overflow = "hidden";
    }
  
    function closeMobileSidebar() {
      body.classList.remove("sidebar-open");
      document.documentElement.style.overflow = "";
    }
  
    function toggleSidebar() {
      if (window.innerWidth >= 992) {
        body.classList.toggle("sidebar-collapsed");
        closeMobileSidebar();
      } else {
        if (body.classList.contains("sidebar-open")) {
          closeMobileSidebar();
        } else {
          openMobileSidebar();
        }
      }
  
      // Fix charts resize on toggle
      setTimeout(() => {
        if (window.Chart) {
          Object.values(Chart.instances).forEach((chart) => {
            chart.resize();
            chart.update();
          });
        }
        const grid = document.querySelector(".charts-grid-final");
        if (grid) {
          grid.style.display = "none";
          void grid.offsetWidth; 
          grid.style.display = "grid";
        }
      }, 400);
    }
  
    if (toggleBtn) toggleBtn.addEventListener("click", toggleSidebar);
    backdrop.addEventListener("click", closeMobileSidebar);
  
    // Close with ESC
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeMobileSidebar();
    });
  
    // Reset state on resize
    let lastIsDesktop = window.innerWidth >= 992;
    window.addEventListener("resize", () => {
      const nowIsDesktop = window.innerWidth >= 992;
      if (nowIsDesktop && !lastIsDesktop) {
        closeMobileSidebar();
      }
      lastIsDesktop = nowIsDesktop;
    });
  
    // ================= Sidebar Dropdown =================
    
    document.querySelectorAll(".nav-item.has-submenu > a").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const parent = link.parentElement;
        parent.classList.toggle("open");
  
        const submenu = parent.querySelector(".submenu");
        if (submenu) {
          submenu.style.maxHeight = parent.classList.contains("open")
            ? submenu.scrollHeight + "px"
            : null;
        }
      });
    });

    
  
    // ================= Charts =================
    const fontFamily = "'Almarai', sans-serif";
    const textColor = '#64748b';
    const sidebarMain = '#1e293b';
    const accentColor = '#f59e0b';
  
    // Salary Chart
    const salaryCtx = document.getElementById('salaryChart');
    if (salaryCtx) {
      new Chart(salaryCtx, {
        type: 'bar',
        data: {
          labels: ['فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
          datasets: [
            { label: 'رواتب', data: [50, 60, 55, 70, 65], backgroundColor: sidebarMain, borderRadius: 4, barPercentage: 0.5 },
            { label: 'مكافآت', data: [30, 45, 35, 50, 40], backgroundColor: '#a0aec0', borderRadius: 4, barPercentage: 0.5 }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { fontFamily, color: textColor, usePointStyle: true, boxWidth: 6 } } }, scales: { y: { grid: { drawBorder: false }, ticks: { stepSize: 30, color: textColor, fontFamily } }, x: { grid: { display: false }, ticks: { color: textColor, fontFamily } } } }
      });
    }
  
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
      new Chart(revenueCtx, {
        type: 'doughnut',
        data: { datasets: [{ data: [82, 18], backgroundColor: [accentColor, '#e2e8f0'], borderWidth: 0, cutout: '75%' }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } }
      });
    }
  
    // Balance Chart
    const balanceCtx = document.getElementById('balanceChart');
    if (balanceCtx) {
      new Chart(balanceCtx, {
        type: 'line',
        data: {
          labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],
          datasets: [{ data: [30, 40, 50, 35, 45, 65, 55], borderColor: sidebarMain, backgroundColor: 'rgba(30, 41, 59, 0.1)', fill: true, tension: 0.4, pointRadius: 0 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { display: false } } }
      });
    }
  
    // Products Chart
    const productsCtx = document.getElementById('productsChart');
    if (productsCtx) {
      new Chart(productsCtx, {
        type: 'bar',
        data: {
          labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
          datasets: [
            {
              type: 'line',
              label: 'المنتج 2',
              data: [440, 510, 410, 677, 230, 510, 420],
              borderColor: '#00b09b',
              backgroundColor: 'rgba(138, 176, 0, 0.1)',
              tension: 0.4,
              fill: true,
            },
            {
              type: 'bar',
              label: 'المنتج 1',
              data: [400, 450, 380, 620, 200, 480, 390],
              backgroundColor: 'rgba(32, 121, 72, 0.8)',
              borderRadius: 4,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }
  
    // Profit Chart
    const profitCtx = document.getElementById('profitChart');
    if (profitCtx) {
      new Chart(profitCtx, {
        type: 'line',
        data: {
          labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
          datasets: [
            {
              label: 'المشروع 1',
              data: [30, 32, 28, 35, 45, 55, 60],
              borderColor: '#8e2de2',
              backgroundColor: 'rgba(45, 226, 166, 0.2)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'المشروع 2',
              data: [15, 25, 35, 30, 25, 40, 50],
              borderColor: '#f12711',
              backgroundColor: 'rgba(241, 39, 17, 0.2)',
              fill: true,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }
  
  });
  
  // ================= Navigation Animator =================
  document.addEventListener("DOMContentLoaded", () => {
    const NavigationAnimator = {
      config: {
        selectors: {
          navTabs: ".nav-tab-item",
          navWrapper: ".nav-tabs-wrapper",
          navContainer: ".nav-tabs-container",
          navPrev: "#navLeft",
          navNext: "#navRight",
        },
        animation: {
          groups: [
            { count: 4, duration: 5000 },
            { count: 4, duration: 5000 },
            { count: 2, duration: 5000 },
            { count: 5, duration: 5000 },
            { count: 5, duration: 5000 },
            { count: 5, duration: 5000 },
            { count: 3, duration: 5000 },
          ],
          transitionDuration: 700,
          staggerDelay: 150,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          userInteractionDelay: 12000,
        },
      },
      state: { currentGroupIndex: 0, animationTimer: null, isUserInteracting: false, isAnimating: false, totalTabs: 0 },
      elements: {},
      init() {
        this.cacheDOMElements();
        if (!this.validateElements()) return;
        this.setupInitialState();
        this.bindEvents();
        this.scheduleNextAnimation();
      },
      cacheDOMElements() {
        this.elements.navTabs = document.querySelectorAll(this.config.selectors.navTabs);
        this.elements.navWrapper = document.querySelector(this.config.selectors.navWrapper);
        this.elements.navContainer = document.querySelector(this.config.selectors.navContainer);
        this.elements.navPrev = document.querySelector(this.config.selectors.navPrev);
        this.elements.navNext = document.querySelector(this.config.selectors.navNext);
      },
      validateElements() {
        if (!this.elements.navWrapper || !this.elements.navTabs.length) return false;
        this.state.totalTabs = this.elements.navTabs.length;
        return true;
      },
      setupInitialState() {
        const container = this.elements.navContainer;
        if (container) {
          container.style.overflow = "hidden";
          container.style.position = "relative";
        }
        const wrapper = this.elements.navWrapper;
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";
        wrapper.style.gap = "8px";
        wrapper.style.transition = `transform ${this.config.animation.transitionDuration}ms ${this.config.animation.easing}`;
        this.elements.navTabs.forEach((tab, index) => {
          tab.style.opacity = "0";
          tab.style.transform = "translateX(30px)";
          tab.style.transition = `all ${this.config.animation.transitionDuration}ms ${this.config.animation.easing}`;
          tab.style.pointerEvents = "none";
          tab.style.display = "none";
          tab.setAttribute("data-index", index);
        });
        this.showGroup(0);
      },
      bindEvents() {
        this.elements.navTabs.forEach((tab) => tab.addEventListener("click", () => this.handleTabClick(tab)));
        this.elements.navContainer.addEventListener("mouseenter", () => this.pauseAnimation());
        this.elements.navContainer.addEventListener("mouseleave", () => { if (!this.state.isUserInteracting) this.resumeAnimation(); });
        if (this.elements.navNext) this.elements.navNext.addEventListener("click", () => this.nextGroup());
        if (this.elements.navPrev) this.elements.navPrev.addEventListener("click", () => this.prevGroup());
      },
      scheduleNextAnimation() {
        const currentGroup = this.config.animation.groups[this.state.currentGroupIndex];
        this.state.animationTimer = setTimeout(() => this.animateToNextGroup(), currentGroup.duration);
      },
      pauseAnimation() {
        if (this.state.animationTimer) {
          clearTimeout(this.state.animationTimer);
          this.state.animationTimer = null;
        }
      },
      resumeAnimation() {
        if (!this.state.isUserInteracting && !this.state.isAnimating) {
          this.scheduleNextAnimation();
        }
      },
      animateToNextGroup() {
        if (this.state.isUserInteracting || this.state.isAnimating) return;
        this.state.isAnimating = true;
        this.hideCurrentGroup(() => {
          this.state.currentGroupIndex = (this.state.currentGroupIndex + 1) % this.config.animation.groups.length;
          this.showGroup(this.state.currentGroupIndex);
          this.state.isAnimating = false;
          if (!this.state.isUserInteracting) this.scheduleNextAnimation();
        });
      },
      showGroup(groupIndex) {
        const group = this.config.animation.groups[groupIndex];
        if (!group) return;
        let startIndex = 0;
        for (let i = 0; i < groupIndex; i++) startIndex += this.config.animation.groups[i].count;
        for (let i = 0; i < group.count; i++) {
          const tab = this.elements.navTabs[startIndex + i];
          if (!tab) continue;
          tab.style.display = "flex";
          setTimeout(() => {
            tab.style.opacity = "1";
            tab.style.transform = "translateX(0)";
            tab.style.pointerEvents = "auto";
            tab.classList.add("visible");
            tab.style.transform = "translateX(0) scale(1.05)";
            setTimeout(() => (tab.style.transform = "translateX(0) scale(1)"), 200);
          }, i * this.config.animation.staggerDelay);
        }
        this.setActiveTab(startIndex);
      },
      hideCurrentGroup(callback) {
        const currentGroup = this.config.animation.groups[this.state.currentGroupIndex];
        if (!currentGroup) return callback();
        let startIndex = 0;
        for (let i = 0; i < this.state.currentGroupIndex; i++) startIndex += this.config.animation.groups[i].count;
        let hiddenCount = 0;
        for (let i = 0; i < currentGroup.count; i++) {
          const tab = this.elements.navTabs[startIndex + i];
          if (!tab) { hiddenCount++; continue; }
          setTimeout(() => {
            tab.style.opacity = "0";
            tab.style.transform = "translateX(-30px) scale(0.95)";
            tab.style.pointerEvents = "none";
            tab.classList.remove("visible");
            setTimeout(() => {
              tab.style.display = "none";
              hiddenCount++;
              if (hiddenCount === currentGroup.count) callback();
            }, this.config.animation.transitionDuration);
          }, i * (this.config.animation.staggerDelay / 2));
        }
      },
      setActiveTab(tabIndex) {
        this.elements.navTabs.forEach((tab) => tab.classList.remove("active"));
        if (this.elements.navTabs[tabIndex]) this.elements.navTabs[tabIndex].classList.add("active");
      },
      handleTabClick(clickedTab) {
        this.state.isUserInteracting = true;
        this.pauseAnimation();
        this.elements.navTabs.forEach((tab) => tab.classList.remove("active"));
        clickedTab.classList.add("active");
        clickedTab.style.transform = "translateX(0) scale(0.95)";
        setTimeout(() => (clickedTab.style.transform = "translateX(0) scale(1)"), 150);
        setTimeout(() => {
          this.state.isUserInteracting = false;
          this.resumeAnimation();
        }, this.config.animation.userInteractionDelay);
      },
      nextGroup() {
        this.goToGroup((this.state.currentGroupIndex + 1) % this.config.animation.groups.length);
      },
      prevGroup() {
        this.goToGroup((this.state.currentGroupIndex - 1 + this.config.animation.groups.length) % this.config.animation.groups.length);
      },
      goToGroup(groupIndex) {
        if (this.state.isAnimating) return;
        if (groupIndex < 0 || groupIndex >= this.config.animation.groups.length) return;
        this.state.isUserInteracting = true;
        this.pauseAnimation();
        this.state.isAnimating = true;
        this.hideCurrentGroup(() => {
          this.state.currentGroupIndex = groupIndex;
          this.showGroup(groupIndex);
          this.state.isAnimating = false;
          setTimeout(() => {
            this.state.isUserInteracting = false;
            this.resumeAnimation();
          }, this.config.animation.userInteractionDelay);
        });
      },
    };
    NavigationAnimator.init();
    window.NavigationAnimator = NavigationAnimator;
  });
// =======================  
// زرار التوجل في الميني سايد بار (Desktop toggle)
const toggleMainSidebar = document.getElementById("toggleMainSidebar");
const body = document.body;

if (toggleMainSidebar) {
  toggleMainSidebar.addEventListener("click", () => {
    body.classList.toggle("sidebar-collapsed");

    // تغيير اتجاه الأيقونة
    const icon = toggleMainSidebar.querySelector("i");
    if (body.classList.contains("sidebar-collapsed")) {
      icon.classList.remove("fa-angle-double-left");
      icon.classList.add("fa-angle-double-right");
    } else {
      icon.classList.remove("fa-angle-double-right");
      icon.classList.add("fa-angle-double-left");
    }

    // Fix charts resize
    setTimeout(() => {
      if (window.Chart) {
        Object.values(Chart.instances).forEach((chart) => {
          chart.resize();
          chart.update();
        });
      }
    }, 400);
  });
}
// ===================================
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.split("/").pop(); // اسم الملف الحالي
    const miniLinks = document.querySelectorAll(".mini-nav li a");
  
    miniLinks.forEach(link => {
      const linkPath = link.getAttribute("href");
      if (linkPath.includes(currentPath) && currentPath !== "") {
        link.classList.add("active");
      }
    });
  });
const miniLinks = document.querySelectorAll(".mini-nav li a");

miniLinks.forEach(link => {
  link.addEventListener("click", () => {
    miniLinks.forEach(l => l.classList.remove("active")); // شيل الأكتف من الكل
    link.classList.add("active"); // ضيفه للي اتداس
  });
});
  
// ===========================================

// النصوص
const titleText = "أهلاً بكِ في لوحة التحكم!";
const titleEl = document.getElementById("welcome-title");
const paragraphEl = document.getElementById("welcome-text");

const typingSpeed = 30; // سرعة الكتابة انسيابية أكثر

// Typewriter انسيابي من اليمين لليسار
function typeWriter(el, text, i=0, callback=null){
  if(i < text.length){
    el.textContent = text.slice(text.length - i -1); // كتابة من اليمين لليسار
    setTimeout(()=> typeWriter(el, text, i+1, callback), typingSpeed);
  } else if(callback){
    callback();
  }
}

// FadeIn للكلمات
function fadeInParagraph(){
  const words = paragraphEl.textContent.split(" ");
  paragraphEl.innerHTML = "";
  words.forEach((word, idx)=>{
    const span = document.createElement("span");
    span.className = "word";
    span.style.animationDelay = `${idx*0.2}s`;
    span.textContent = word + " ";
    paragraphEl.appendChild(span);
  });
}

// Loop الكتابة
function startAnimation(){
  titleEl.textContent = "";
  fadeInParagraph();
  typeWriter(titleEl,titleText,0,()=>{
    setTimeout(startAnimation,3000);
  });
}

startAnimation();
// ===============AOS===================
document.addEventListener('DOMContentLoaded', function ( ) {
  AOS.init({
    duration: 1000,   // سرعة الحركة
    once: true,       // يشتغل مرة واحدة بس
    offset: 50        // يبدأ الحركة قبل ما العنصر يدخل الشاشة بشوي
  });
});

document.getElementById("open-search").addEventListener("click", function(e) {
  e.preventDefault();
  // افتح مودال البحث هنا
  document.getElementById("search-modal").classList.remove("hidden");
});
