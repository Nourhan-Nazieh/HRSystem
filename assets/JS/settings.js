document.addEventListener('DOMContentLoaded', () => {

    // ================= START TABS NAVIGATION =================
    const tabsContainer = document.querySelector('.settings-tabs');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabsContainer) {
        tabsContainer.addEventListener('click', (e) => {
            e.preventDefault();
            const clickedTab = e.target.closest('.tab-link');
            if (!clickedTab) return;

            // تحديث حالة التابات
            tabsContainer.querySelectorAll('.tab-link').forEach(tab => tab.classList.remove('active'));
            clickedTab.classList.add('active');

            // إخفاء كل المحتويات وإظهار المحتوى المرتبط
            const tabId = clickedTab.dataset.tab;
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    }
    // ================= END TABS NAVIGATION =================


    // ================= START LOGO UPLOADER =================
    const logoUploader = document.getElementById('logo-uploader');
    if (logoUploader) {
        const logoInput = document.getElementById('logo-input');
        const logoPreview = logoUploader.querySelector('.logo-preview');
        const uploadPlaceholder = logoUploader.querySelector('.upload-placeholder');

        logoUploader.addEventListener('click', () => logoInput.click());
        logoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    logoPreview.src = event.target.result;
                    logoPreview.style.opacity = '1';
                    uploadPlaceholder.style.opacity = '0';
                };
                reader.readAsDataURL(file);
            }
        });
    }
    // ================= END LOGO UPLOADER =================


    // ================= START LANGUAGE SWITCHER =================
    const langSwitchers = document.querySelectorAll('.language-switcher');
    langSwitchers.forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            if (e.target.classList.contains('lang-btn')) {
                switcher.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    });
    // ================= END LANGUAGE SWITCHER =================


    // ================= START COLOR PICKER =================
    const colorPickers = document.querySelectorAll('.color-picker');
    colorPickers.forEach(picker => {
        const firstColor = picker.querySelector('.color-option');
        if (firstColor) firstColor.classList.add('selected');

        picker.addEventListener('click', (e) => {
            if (e.target.classList.contains('color-option')) {
                picker.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
                e.target.classList.add('selected');
            }
        });
    });
    // ================= END COLOR PICKER =================

    
    // ================= START SAVE BUTTONS =================
    const saveBtns = document.querySelectorAll('.btn-save');
    saveBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('تم حفظ الإعدادات بنجاح! (هذه رسالة تجريبية)');
        });
    });
    // ================= END SAVE BUTTONS =================

});
    // ================= START MOBILE APP TAB INTERACTIVITY =================
    const interfaceGrid = document.querySelector('.interface-grid');
    if (interfaceGrid) {
        interfaceGrid.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const interfaceItem = e.target.closest('.interface-item');
                if (e.target.checked) {
                    interfaceItem.classList.add('active');
                } else {
                    interfaceItem.classList.remove('active');
                }
            }
        });

        // Set initial active state on page load
        interfaceGrid.querySelectorAll('.custom-checkbox input[type="checkbox"]').forEach(checkbox => {
            const interfaceItem = checkbox.closest('.interface-item');
            if (checkbox.checked) {
                interfaceItem.classList.add('active');
            } else {
                interfaceItem.classList.remove('active');
            }
        });
    }
    // ================= START DOCUMENTS TAB INTERACTIVITY (6) =================
    const documentsContainer = document.querySelector('.documents-list-container');
    const addDocBtn = document.querySelector('.add-new-doc-btn');
    
    // --- Edit Modal Elements ---
    const editModal = document.getElementById('edit-doc-modal');
    const editModalTitle = document.getElementById('edit-doc-modal-title');
    const editForm = document.getElementById('edit-doc-form');
    const editDocIdInput = document.getElementById('edit-doc-id');
    const issueDateInput = document.getElementById('issue-date');
    const expiryDateInput = document.getElementById('expiry-date');
    const cancelEditBtn = document.querySelector('.btn-modal-cancel');

    if (documentsContainer && addDocBtn && editModal) {
        // 1. البيانات الأولية
        let documents = [
            { id: 1, name: 'سجل تجاري', issueDate: '2025-07-13', expiryDate: '2025-07-13' }
        ];

        // --- Modal Functions ---
        const openEditModal = () => {
            editModal.style.display = 'flex';
            setTimeout(() => editModal.classList.add('show'), 10);
        };
        const closeEditModal = () => {
            editModal.classList.remove('show');
            setTimeout(() => editModal.style.display = 'none', 300);
        };

        // 2. دالة لإنشاء عنصر مستند
        const createDocumentElement = (doc) => {
            const item = document.createElement('div');
            item.className = 'document-item';
            item.dataset.id = doc.id;
            // Format date for display from YYYY-MM-DD to DD/MM/YYYY
            const displayIssueDate = doc.issueDate.split('-').reverse().join('/');
            const displayExpiryDate = doc.expiryDate.split('-').reverse().join('/');

            item.innerHTML = `
                <div class="doc-actions">
                    <button class="doc-action-btn download-btn" title="تحميل"><i class="fas fa-download"></i></button>
                    <button class="doc-action-btn edit-btn" title="تعديل"><i class="fas fa-edit"></i></button>
                    <button class="doc-action-btn delete-btn" title="حذف"><i class="fas fa-trash-alt"></i></button>
                </div>
                <span class="doc-name">${doc.name}</span>
                <span class="doc-date">تاريخ الاصدار: ${displayIssueDate}</span>
                <span class="doc-date">تاريخ الانتهاء: ${displayExpiryDate}</span>
            `;
            return item;
        };

        // 3. دالة لرسم المستندات
        const renderDocuments = () => {
            documentsContainer.innerHTML = '';
            documents.forEach(doc => {
                documentsContainer.appendChild(createDocumentElement(doc));
            });
        };

        // 4. الأحداث
        // --- إضافة مستند ---
        addDocBtn.addEventListener('click', () => {
            const docName = prompt('ادخل اسم المستند الجديد:');
            if (docName && docName.trim() !== '') {
                const newId = documents.length > 0 ? Math.max(...documents.map(d => d.id)) + 1 : 1;
                const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
                documents.push({ id: newId, name: docName.trim(), issueDate: today, expiryDate: today });
                renderDocuments();
            }
        });

        // --- فتح نموذج التعديل أو الحذف ---
        documentsContainer.addEventListener('click', (e) => {
            const docItem = e.target.closest('.document-item');
            if (!docItem) return;
            const docId = parseInt(docItem.dataset.id);
            const doc = documents.find(d => d.id === docId);

            if (e.target.closest('.edit-btn')) {
                editModalTitle.textContent = `تعديل: ${doc.name}`;
                editDocIdInput.value = doc.id;
                issueDateInput.value = doc.issueDate; // Expects YYYY-MM-DD
                expiryDateInput.value = doc.expiryDate; // Expects YYYY-MM-DD
                openEditModal();
            }

            if (e.target.closest('.delete-btn')) {
                if (confirm(`هل أنت متأكد من حذف مستند "${doc.name}"؟`)) {
                    documents = documents.filter(d => d.id !== docId);
                    renderDocuments();
                }
            }
        });

        // --- حفظ التعديلات من النموذج ---
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = parseInt(editDocIdInput.value);
            const doc = documents.find(d => d.id === id);
            if (doc) {
                doc.issueDate = issueDateInput.value;
                doc.expiryDate = expiryDateInput.value;
                renderDocuments();
            }
            closeEditModal();
        });

        // --- إغلاق النموذج ---
        cancelEditBtn.addEventListener('click', closeEditModal);
        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) closeEditModal();
        });

        // 5. العرض الأولي
        renderDocuments();
    }
    // ================= END DOCUMENTS TAB INTERACTIVITY (6) =================
    // ================= START COVENANTS TAB INTERACTIVITY (8) =================
    const covenantsListContainer = document.querySelector('.covenants-list');
    if (covenantsListContainer) {
        // 1. البيانات الأولية
        const covenantsData = [
            { id: 1, empId: 175, empName: 'ملك مبارك محمد السوداني', type: 'طابعة', statusClass: 'status-green', received: '12-5-2025', returned: '12-5-2025' },
            { id: 2, empId: 175, empName: 'ملك مبارك محمد السوداني', type: 'هاتف محمول', statusClass: 'status-green', received: '12-5-2025', returned: '12-5-2025' },
            { id: 3, empId: 175, empName: 'ملك مبارك محمد السوداني', type: 'شاشة عرض', statusClass: 'status-red', received: '12-5-2025', returned: '12-5-2025' },
            { id: 4, empId: 175, empName: 'جيب فورتشنر 2021 دي س 8720', type: 'سيارة', statusClass: 'status-yellow', received: '12-5-2025', returned: '12-5-2025' },
            { id: 5, empId: 175, empName: 'ملك مبارك محمد السوداني', type: 'شاشة عرض', statusClass: 'status-red', received: '12-5-2025', returned: '12-5-2025' },
            { id: 6, empId: 175, empName: 'ملك مبارك محمد السوداني', type: 'هاتف محمول', statusClass: 'status-green', received: '12-5-2025', returned: '12-5-2025' },
        ];

        // 2. دالة لرسم البيانات
        const renderCovenants = () => {
            // مسح أي بيانات قديمة باستثناء الهيدر
            covenantsListContainer.querySelectorAll('.covenant-item:not(.list-header)').forEach(item => item.remove());

            covenantsData.forEach(covenant => {
                const item = document.createElement('div');
                item.className = 'covenant-item';
                item.innerHTML = `
                    <span>${covenant.empId}</span>
                    <span>${covenant.empName}</span>
                    <span><div class="covenant-status ${covenant.statusClass}">${covenant.type}</div></span>
                    <span>${covenant.received}</span>
                    <span>${covenant.returned}</span>
                    <div style="text-align: left;"><button class="doc-action-btn delete-btn"  title="حذف"><i class="fas fa-trash-alt"></i></button></div>
                `;
                covenantsListContainer.appendChild(item);
            });
        };

        // 3. العرض الأولي
        renderCovenants();
    }
    // ================= END COVENANTS TAB INTERACTIVITY (8) =================
