document.addEventListener('DOMContentLoaded', function () {
    // تفعيل مكتبة الأنيميشن
    AOS.init({
        duration: 600,
        once: true,
    });

    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const fileNameDisplay = document.getElementById('file-name-display');
    const submitButton = document.getElementById('submit-button');

    // --- Event Listeners for Drop Zone ---

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
    });

    // Handle dropped files
    dropZone.addEventListener('drop', handleFiles, false);

    // Handle file selection from click
    fileInput.addEventListener('change', function() {
        handleFiles({ dataTransfer: this });
    });

    function handleFiles(event) {
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            // You can add validation here for file type (e.g., .xls, .xlsx)
            fileNameDisplay.textContent = `تم اختيار الملف: ${file.name}`;
            fileNameDisplay.style.color = '#388E3C';
        }
    }

    // --- Submit Button Logic ---
    submitButton.addEventListener('click', function() {
        if (fileInput.files.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'يرجى اختيار ملف أولاً قبل الإضافة!',
                confirmButtonColor: '#D32F2F'
            });
            return;
        }

        // Simulate upload process
        Swal.fire({
            title: 'جاري رفع الملف...',
            text: 'يرجى الانتظار.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'نجاح!',
                text: 'تمت إضافة الملف بنجاح.',
                confirmButtonColor: '#388E3C'
            }).then(() => {
                // Reset the form
                fileNameDisplay.textContent = '';
                fileInput.value = '';
            });
        }, 2000); // Simulate 2 seconds upload time
    });
});
