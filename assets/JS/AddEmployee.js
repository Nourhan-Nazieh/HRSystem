

// ==============================
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({ duration: 600, once: true });

    const stepperItems = document.querySelectorAll('.stepper-item');
    const formSteps = document.querySelectorAll('.form-step');
    const prevBtn = document.querySelector('.btn-nav-prev');
    const nextBtn = document.querySelector('.btn-nav-next');
    const form = document.getElementById('add-employee-form');

    let currentStep = 1;

    // --- Event Listeners ---
    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < formSteps.length) {
                currentStep++;
                updateFormSteps();
                updateStepper();
            } else {
                form.submit(); 
                alert('تم إرسال النموذج بنجاح!');
            }
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateFormSteps();
            updateStepper();
        }
    });
    
    stepperItems.forEach(item => {
        item.addEventListener('click', () => {
            const step = parseInt(item.dataset.step);
            if (item.classList.contains('completed') || item.classList.contains('active')) {
                 currentStep = step;
                 updateFormSteps();
                 updateStepper();
            }
        });
    });

    // --- File Drop Area Logic ---
    const fileDropArea = document.querySelector('.file-drop-area');
    if (fileDropArea) {
        const fileInput = fileDropArea.querySelector('.file-drop-input');
        const fileMessage = fileDropArea.querySelector('.file-drop-message');
        const fileIcon = fileDropArea.querySelector('.file-drop-icon');

        fileDropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileDropArea.classList.add('dragover');
        });

        fileDropArea.addEventListener('dragleave', () => {
            fileDropArea.classList.remove('dragover');
        });

        fileDropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileDropArea.classList.remove('dragover');
            fileInput.files = e.dataTransfer.files;
            handleFileChange(fileInput, fileMessage, fileIcon);
        });

        fileInput.addEventListener('change', () => {
            handleFileChange(fileInput, fileMessage, fileIcon);
        });
    }

    function handleFileChange(input, messageEl, iconEl) {
        if (input.files.length > 0) {
            messageEl.innerHTML = `<span class="file-name">تم اختيار: ${input.files[0].name}</span>`;
            iconEl.innerHTML = `<i class="fas fa-check-circle" style="color: #27AE60;"></i>`;
        }
    }

    // --- Update Functions ---
    function updateFormSteps() { /* ... (same as before) ... */ }
    function updateStepper() { /* ... (same as before) ... */ }
    function updateNavButtons() { /* ... (same as before) ... */ }
    function validateStep(step) { /* ... (same as before) ... */ }

    // --- Initial Setup ---
    updateStepper();
});

// ======================================
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({ duration: 600, once: true });

    const stepperItems = document.querySelectorAll('.stepper-item');
    const formSteps = document.querySelectorAll('.form-step');
    const prevBtn = document.querySelector('.btn-nav-prev');
    const nextBtn = document.querySelector('.btn-nav-next');
    const form = document.getElementById('add-employee-form');

    let currentStep = 1;

    // --- Event Listeners ---
    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < formSteps.length) {
                currentStep++;
                updateFormSteps();
                updateStepper();
            } else {
                // Last step: Submit the form
                // In a real application, you would submit the form here.
                // form.submit(); 
                alert('تمت إضافة الموظف بنجاح!');
            }
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateFormSteps();
            updateStepper();
        }
    });
    
    stepperItems.forEach(item => {
        item.addEventListener('click', () => {
            const step = parseInt(item.dataset.step);
            if (item.classList.contains('completed') || item.classList.contains('active')) {
                 currentStep = step;
                 updateFormSteps();
                 updateStepper();
            }
        });
    });

    // --- File Drop Area Logic (from previous step) ---
    const fileDropArea = document.querySelector('.file-drop-area');
    if (fileDropArea) {
        // ... (The file drop logic remains the same)
    }

    // --- Update Functions ---
    function updateFormSteps() {
        formSteps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === currentStep) {
                step.classList.add('active');
            }
        });
    }

    function updateStepper() {
        stepperItems.forEach((item, index) => {
            const stepNum = index + 1;
            if (stepNum < currentStep) {
                item.classList.add('completed', 'active');
            } else if (stepNum === currentStep) {
                item.classList.remove('completed');
                item.classList.add('active');
            } else {
                item.classList.remove('completed', 'active');
            }
        });
        updateNavButtons();
    }

    function updateNavButtons() {
        prevBtn.classList.toggle('hidden', currentStep === 1);
        // Change button text on the last step
        nextBtn.textContent = (currentStep === formSteps.length) ? 'إضافة' : 'التالي';
    }

    // --- Validation ---
    function validateStep(step) {
        const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`);
        const inputs = currentFormStep.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            input.classList.remove('is-invalid');
            if (!input.value) {
                isValid = false;
                input.classList.add('is-invalid');
            }
        });

        if (!isValid) {
            alert('يرجى ملء جميع الحقول المطلوبة في هذه الخطوة.');
        }
        return isValid;
    }

    // --- Initial Setup ---
    updateStepper();
});
