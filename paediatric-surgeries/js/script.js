document.addEventListener('DOMContentLoaded', function () {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    var form = document.getElementById('leadForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            if (!form.checkValidity()) { e.preventDefault(); form.reportValidity(); }
        });
    }

    document.querySelectorAll('.js-scroll').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = link.getAttribute('href');
            if (href && href.charAt(0) === '#') {
                var target = document.querySelector(href);
                if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            }
        });
    });

    // Custom file upload trigger
    var fileTriggerBtn = document.getElementById('fileTriggerBtn');
    var reportsInput = document.getElementById('reportsInput');
    var fileNameLabel = document.getElementById('fileNameLabel');
    if (fileTriggerBtn && reportsInput) {
        fileTriggerBtn.addEventListener('click', function () { reportsInput.click(); });
        reportsInput.addEventListener('change', function () {
            if (reportsInput.files && reportsInput.files.length > 0) {
                fileNameLabel.textContent = reportsInput.files[0].name;
                fileNameLabel.classList.add('field-file__name--active');
            } else {
                fileNameLabel.textContent = 'Optional — no file chosen';
                fileNameLabel.classList.remove('field-file__name--active');
            }
        });
    }

});

/* FAQ accordion — only one open at a time */
document.querySelectorAll('.faq-flat-item').forEach(function (item) {
    item.addEventListener('toggle', function () {
        if (this.open) {
            document.querySelectorAll('.faq-flat-item').forEach(function (other) {
                if (other !== item) other.open = false;
            });
        }
    });
});