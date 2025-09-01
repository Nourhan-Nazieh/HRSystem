document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Get the target tab ID from the data-tab attribute
            const targetId = link.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);

            // Deactivate all tabs and panes
            tabLinks.forEach(l => l.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Activate the clicked tab and corresponding pane
            link.classList.add('active');
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {

    // ================= START TAB SWITCHING LOGIC =================
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Get the target tab ID from the data-tab attribute
            const targetId = link.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);

            // Deactivate all tabs and panes
            tabLinks.forEach(l => l.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Activate the clicked tab and corresponding pane
            link.classList.add('active');
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });

    });
    // ================= END TAB SWITCHING LOGIC =================


    // ================= START ATTENDANCE TAB DATA =================
    const attendanceListContainer = document.getElementById('attendance-data-list');
    if (attendanceListContainer) {
        // 1. البيانات الأولية
        const attendanceData = [
            { date: '12-2-2025', day: 'السبت', checkIn: '17:00 AM', checkOut: '17:00 AM', late: '9 دقائق', early: '9 دقائق', overtime: '9 دقائق' },
            { date: '12-2-2025', day: 'الاحد', checkIn: '17:00 AM', checkOut: '17:00 AM', late: '9 دقائق', early: '9 دقائق', overtime: '9 دقائق' },
            { date: '12-2-2025', day: 'الاثنين', checkIn: '17:00 AM', checkOut: '17:00 AM', late: '9 دقائق', early: '9 دقائق', overtime: '9 دقائق' },
            { date: '12-2-2025', day: 'الثلاثاء', checkIn: '17:00 AM', checkOut: '17:00 AM', late: '9 دقائق', early: '9 دقائق', overtime: '9 دقائق' },
            { date: '12-2-2025', day: 'الاربعاء', checkIn: '17:00 AM', checkOut: '17:00 AM', late: '9 دقائق', early: '9 دقائق', overtime: '9 دقائق' },
        ];

        // 2. دالة لرسم البيانات
        const renderAttendance = () => {
            attendanceListContainer.innerHTML = ''; // مسح البيانات القديمة
            attendanceData.forEach(record => {
                const row = document.createElement('div');
                row.className = 'attendance-row';
                row.innerHTML = `
                    <span>${record.date}</span>
                    <span>${record.day}</span>
                    <span>${record.checkIn}</span>
                    <span>${record.checkOut}</span>
                    <span><div class="time-status status-late">${record.late}</div></span>
                    <span><div class="time-status status-early-leave">${record.early}</div></span>
                    <span><div class="time-status status-overtime">${record.overtime}</div></span>
                `;
                attendanceListContainer.appendChild(row);
            });
        };

        // 3. العرض الأولي
        renderAttendance();
    }
    // ================= END ATTENDANCE TAB DATA =================
        // ================= START LEAVE BALANCE TAB DATA =================
        const leaveBalanceListContainer = document.getElementById('leave-balance-data-list');
        if (leaveBalanceListContainer) {
            // 1. البيانات الأولية
            const leaveData = [
                { leaveDate: '7/10/2024', returnDate: '7/10/2024', days: 3, reason: 'مرضية', supervisor: 'احمد مازن', remaining: 0 },
                { leaveDate: '7/10/2024', returnDate: '7/10/2024', days: 5, reason: 'سفر', supervisor: 'احمد مازن', remaining: 19 },
                { leaveDate: '7/10/2024', returnDate: '7/10/2024', days: 3, reason: 'مرضية', supervisor: 'احمد مازن', remaining: 13 },
                { leaveDate: '7/10/2024', returnDate: '7/10/2024', days: 2, reason: 'مرضية', supervisor: 'احمد مازن', remaining: 11 },
                { leaveDate: '7/10/2024', returnDate: '7/10/2024', days: 1, reason: 'مرضية', supervisor: 'احمد مازن', remaining: 8 },
            ];
    
            // 2. دالة لرسم البيانات
            const renderLeaveBalance = () => {
                leaveBalanceListContainer.innerHTML = ''; // مسح البيانات القديمة
                leaveData.forEach(record => {
                    const row = document.createElement('div');
                    // Reusing the 'attendance-row' class for consistent styling
                    row.className = 'attendance-row'; 
                    row.innerHTML = `
                        <span>${record.leaveDate}</span>
                        <span>${record.returnDate}</span>
                        <span>${record.days}</span>
                        <span>${record.reason}</span>
                        <span>${record.supervisor}</span>
                        <span>${record.remaining}</span>
                    `;
                    leaveBalanceListContainer.appendChild(row);
                });
            };
    
            // 3. العرض الأولي
            renderLeaveBalance();
        }
        // ================= END LEAVE BALANCE TAB DATA =================
    

});
    // ================= START ADD CONTRACT MODAL LOGIC =================
    const addContractModal = document.getElementById('add-contract-modal');
    const openModalBtn = document.querySelector('.contract-card.add-new');
    const closeModalBtn = document.getElementById('cancel-add-contract');
    const contractForm = document.getElementById('add-contract-form');
    const fileInput = document.getElementById('contract-file-input');
    const fileNameDisplay = document.getElementById('file-name-display');

    if (addContractModal && openModalBtn && closeModalBtn) {
        // --- Function to open the modal ---
        const openModal = () => {
            addContractModal.style.display = 'flex';
            setTimeout(() => addContractModal.classList.add('show'), 10);
        };

        // --- Function to close the modal ---
        const closeModal = () => {
            addContractModal.classList.remove('show');
            setTimeout(() => {
                addContractModal.style.display = 'none';
                contractForm.reset(); // Reset form fields
                fileNameDisplay.textContent = ''; // Clear file name
            }, 300);
        };

        // --- Event Listeners ---
        openModalBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        
        // Close modal if clicking on the overlay
        addContractModal.addEventListener('click', (e) => {
            if (e.target === addContractModal) {
                closeModal();
            }
        });

        // Display the selected file name
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                fileNameDisplay.textContent = `الملف المختار: ${fileInput.files[0].name}`;
            } else {
                fileNameDisplay.textContent = '';
            }
        });

        // Handle form submission
        contractForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically handle the form data, e.g., upload the file
            alert('تم حفظ العقد بنجاح! (رسالة تجريبية)');
            closeModal();
        });
    }
    // ================= END ADD CONTRACT MODAL LOGIC =================
    // ================= START COVENANTS TAB INTERACTIVITY (8) =================
    const covenantsListContainer = document.querySelector('.covenants-list');
    
    // --- Edit Covenant Modal Elements ---
    const editCovenantModal = document.getElementById('edit-covenant-modal');
    const editCovenantForm = document.getElementById('edit-covenant-form');
    const cancelCovenantBtn = document.getElementById('cancel-edit-covenant');

    if (covenantsListContainer) {
        // 1. البيانات الأولية
        let covenantsData = [
            { id: 1, empId: 175, empName: 'ملك مبارك محمد السوداني', type: 'طابعة', statusClass: 'status-green', received: '12-5-2025', returned: '12-5-2025' },
            { id: 2, empId: 175, empName: 'ملك مبارك محمد السوداني', type: 'هاتف محمول', statusClass: 'status-green', received: '12-5-2025', returned: '12-5-2025' },
            { id: 3, empId: 175, empName: 'ملك مبارك محمد السوداني', type: 'شاشة عرض', statusClass: 'status-red', received: '12-5-2025', returned: '12-5-2025' },
            { id: 4, empId: 175, empName: 'جيب فورتشنر 2021 دي س 8720', type: 'سيارة', statusClass: 'status-yellow', received: '12-5-2025', returned: '12-5-2025' },
            { id: 5, empId: 175, empName: 'ملك مبارك محمد السوداني', type: 'شاشة عرض', statusClass: 'status-red', received: '12-5-2025', returned: '12-5-2025' },
            { id: 6, empId: 175, empName: 'ملك مبارك محمد السوداني', type: 'هاتف محمول', statusClass: 'status-green', received: '12-5-2025', returned: '12-5-2025' },
        ];

        // --- Modal Functions ---
        const openEditCovenantModal = () => {
            if(editCovenantModal) {
                editCovenantModal.style.display = 'flex';
                setTimeout(() => editCovenantModal.classList.add('show'), 10);
            }
        };
        const closeEditCovenantModal = () => {
            if(editCovenantModal) {
                editCovenantModal.classList.remove('show');
                setTimeout(() => editCovenantModal.style.display = 'none', 300);
            }
        };

        // 2. دالة لرسم البيانات
        const renderCovenants = () => {
            covenantsListContainer.querySelectorAll('.covenant-item:not(.list-header)').forEach(item => item.remove());
            covenantsData.forEach(covenant => {
                const item = document.createElement('div');
                item.className = 'covenant-item';
                item.dataset.id = covenant.id;
                item.innerHTML = `
                    <span>${covenant.empId}</span>
                    <span>${covenant.empName}</span>
                    <span><div class="covenant-status ${covenant.statusClass}">${covenant.type}</div></span>
                    <span>${covenant.received}</span>
                    <span>${covenant.returned}</span>
                    <div class="covenant-actions-group" style="display: flex; gap: 8px; justify-content: flex-end;">
                        <button class="action-icon edit" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="action-icon retrieve" title="استرجاع"><i class="fas fa-undo-alt"></i></button>
                    </div>
                `;
                covenantsListContainer.appendChild(item);
            });
        };

        // 3. التعامل مع الأحداث
        covenantsListContainer.addEventListener('click', (e) => {
            const editButton = e.target.closest('.action-icon.edit');
            if (editButton) {
                const covenantItem = e.target.closest('.covenant-item');
                const covenantId = parseInt(covenantItem.dataset.id);
                const data = covenantsData.find(c => c.id === covenantId);
                
                // Populate modal with data (example)
                document.getElementById('edit-covenant-id').value = data.id;
                document.getElementById('covenant-name').value = data.empName; // Assuming name is the covenant name for now
                document.getElementById('covenant-type').value = data.type;
                document.getElementById('covenant-employee').value = data.empName;
                // You might need to format the date for the date input
                // document.getElementById('covenant-date').value = formattedDate;

                openEditCovenantModal();
            }
        });

        // --- إغلاق النموذج ---
        if (cancelCovenantBtn) {
            cancelCovenantBtn.addEventListener('click', closeEditCovenantModal);
        }
        if (editCovenantModal) {
            editCovenantModal.addEventListener('click', (e) => {
                if (e.target === editCovenantModal) closeEditCovenantModal();
            });
            editCovenantForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('تم حفظ التعديلات! (رسالة تجريبية)');
                closeEditCovenantModal();
            });
        }

        // 4. العرض الأولي
        renderCovenants();
    }
    // ================= END COVENANTS TAB INTERACTIVITY (8) =================


    document.addEventListener('DOMContentLoaded', () => {

    // ================= TABS SWITCHING LOGIC =================
    const tabs = document.querySelectorAll('.tab-link');
    const panes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();

            // Deactivate all tabs and panes
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            // Activate clicked tab and corresponding pane
            tab.classList.add('active');
            const targetPane = document.getElementById(tab.dataset.tab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // ================= GENERAL SETTINGS TAB (1) =================
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
                    logoPreview.style.display = 'block';
                    uploadPlaceholder.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
    }
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.lang-btn.active').classList.remove('active');
            btn.classList.add('active');
        });
    });
    document.querySelectorAll('.color-option').forEach(color => {
        color.addEventListener('click', () => {
            document.querySelector('.color-option.active').classList.remove('active');
            color.classList.add('active');
        });
    });

    // ================= DOCUMENTS TAB (6) =================
    const documentsListContainer = document.querySelector('#documents .documents-list');
    const addDocBtn = document.getElementById('add-doc-btn');
    const newDocNameInput = document.getElementById('new-doc-name');
    const editDocModal = document.getElementById('edit-document-modal');
    const editDocForm = document.getElementById('edit-doc-form');
    const cancelEditDocBtn = document.getElementById('cancel-edit-doc');

    if (documentsListContainer) {
        let documentsData = [
            { id: 1, name: 'سجل تجاري', issueDate: '2025-07-13', expiryDate: '2025-07-13' },
        ];

        const openEditDocModal = () => {
            if(editDocModal) {
                editDocModal.style.display = 'flex';
                setTimeout(() => editDocModal.classList.add('show'), 10);
            }
        };
        const closeEditDocModal = () => {
            if(editDocModal) {
                editDocModal.classList.remove('show');
                setTimeout(() => editDocModal.style.display = 'none', 300);
            }
        };

        const renderDocuments = () => {
            documentsListContainer.innerHTML = `
                <div class="document-row list-header">
                    <span>اسم المستند</span>
                    <span>تاريخ الاصدار</span>
                    <span>تاريخ الانتهاء</span>
                    <span>التحكم</span>
                </div>
            `;
            documentsData.forEach(doc => {
                const row = document.createElement('div');
                row.className = 'document-row';
                row.dataset.id = doc.id;
                row.innerHTML = `
                    <span>${doc.name}</span>
                    <span>${doc.issueDate}</span>
                    <span>${doc.expiryDate}</span>
                    <div class="doc-actions">
                        <button class="action-icon edit" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="action-icon delete" title="حذف"><i class="fas fa-trash-alt"></i></button>
                    </div>
                `;
                documentsListContainer.appendChild(row);
            });
        };

        documentsListContainer.addEventListener('click', (e) => {
            const docId = e.target.closest('.document-row')?.dataset.id;
            if (!docId) return;

            if (e.target.closest('.action-icon.delete')) {
                if (confirm('هل أنت متأكد من حذف هذا المستند؟')) {
                    documentsData = documentsData.filter(d => d.id !== parseInt(docId));
                    renderDocuments();
                }
            } else if (e.target.closest('.action-icon.edit')) {
                const doc = documentsData.find(d => d.id === parseInt(docId));
                if (doc) {
                    document.getElementById('edit-doc-id').value = doc.id;
                    document.getElementById('issue-date').value = doc.issueDate;
                    document.getElementById('expiry-date').value = doc.expiryDate;
                    openEditDocModal();
                }
            }
        });

        addDocBtn.addEventListener('click', () => {
            const newName = newDocNameInput.value.trim();
            if (newName) {
                const newDoc = { id: Date.now(), name: newName, issueDate: '', expiryDate: '' };
                documentsData.push(newDoc);
                renderDocuments();
                newDocNameInput.value = '';
            }
        });

        if(editDocForm) {
            editDocForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const id = parseInt(document.getElementById('edit-doc-id').value);
                const issueDate = document.getElementById('issue-date').value;
                const expiryDate = document.getElementById('expiry-date').value;
                const docIndex = documentsData.findIndex(d => d.id === id);
                if (docIndex > -1) {
                    documentsData[docIndex].issueDate = issueDate;
                    documentsData[docIndex].expiryDate = expiryDate;
                }
                renderDocuments();
                closeEditDocModal();
            });
        }
        if(cancelEditDocBtn) cancelEditDocBtn.addEventListener('click', closeEditDocModal);
        if(editDocModal) editDocModal.addEventListener('click', (e) => { if(e.target === editDocModal) closeEditDocModal(); });

        renderDocuments();
    }

    // ================= COVENANTS TAB (8) =================
    const covenantsListContainer = document.querySelector('#covenants .covenants-list');
    const editCovenantModal = document.getElementById('edit-covenant-modal');
    const editCovenantForm = document.getElementById('edit-covenant-form');
    const cancelCovenantBtn = document.getElementById('cancel-edit-covenant');

    if (covenantsListContainer) {
        let covenantsData = [
            { id: 1, empId: 175, empName: 'ملك مبارك محمد السوداني', type: 'طابعة', statusClass: 'status-green', received: '2025-05-12', returned: '2025-05-12' },
            { id: 2, empId: 175, empName: 'ملك مبارك محمد السوداني', type: 'هاتف محمول', statusClass: 'status-green', received: '2025-05-12', returned: '2025-05-12' },
            { id: 3, empId: 175, empName: 'ملك مبارك محمد السوداني', type: 'شاشة عرض', statusClass: 'status-red', received: '2025-05-12', returned: '2025-05-12' },
            { id: 4, empId: 175, empName: 'جيب فورتشنر 2021', type: 'سيارة', statusClass: 'status-yellow', received: '2025-05-12', returned: '2025-05-12' },
        ];

        const openEditCovenantModal = () => {
            if(editCovenantModal) {
                editCovenantModal.style.display = 'flex';
                setTimeout(() => editCovenantModal.classList.add('show'), 10);
            }
        };
        const closeEditCovenantModal = () => {
            if(editCovenantModal) {
                editCovenantModal.classList.remove('show');
                setTimeout(() => editCovenantModal.style.display = 'none', 300);
            }
        };

        const renderCovenants = () => {
            covenantsListContainer.querySelectorAll('.covenant-item:not(.list-header)').forEach(item => item.remove());
            covenantsData.forEach(covenant => {
                const item = document.createElement('div');
                item.className = 'covenant-item';
                item.dataset.id = covenant.id;
                item.innerHTML = `
                    <span>${covenant.empId}</span>
                    <span>${covenant.empName}</span>
                    <span><div class="covenant-status ${covenant.statusClass}">${covenant.type}</div></span>
                    <span>${covenant.received}</span>
                    <span>${covenant.returned}</span>
                    <div class="covenant-actions-group">
                        <button class="action-icon edit" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="action-icon retrieve" title="استرجاع"><i class="fas fa-undo-alt"></i></button>
                    </div>
                `;
                covenantsListContainer.appendChild(item);
            });
        };

        covenantsListContainer.addEventListener('click', (e) => {
            const editButton = e.target.closest('.action-icon.edit');
            if (editButton) {
                const covenantItem = e.target.closest('.covenant-item');
                const covenantId = parseInt(covenantItem.dataset.id);
                const data = covenantsData.find(c => c.id === covenantId);
                
                if (data) {
                    document.getElementById('edit-covenant-id').value = data.id;
                    document.getElementById('covenant-name').value = data.empName;
                    document.getElementById('covenant-type').value = data.type;
                    document.getElementById('covenant-employee').value = data.empName;
                    document.getElementById('covenant-date').value = data.received;
                    openEditCovenantModal();
                }
            }
        });

        if (cancelCovenantBtn) cancelCovenantBtn.addEventListener('click', closeEditCovenantModal);
        if (editCovenantModal) {
            editCovenantModal.addEventListener('click', (e) => { if (e.target === editCovenantModal) closeEditCovenantModal(); });
            editCovenantForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('تم حفظ التعديلات! (رسالة تجريبية)');
                closeEditCovenantModal();
            });
        }

        renderCovenants();
    }
});
