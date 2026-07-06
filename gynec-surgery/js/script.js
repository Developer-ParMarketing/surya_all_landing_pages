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

    // Expected Delivery Month — next 24 months
    var edd = document.getElementById('edd');
    if (edd) {
        var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var today = new Date();
        for (var i = 0; i < 24; i++) {
            var date = new Date(today.getFullYear(), today.getMonth() + i, 1);
            var option = document.createElement('option');
            option.value = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');
            option.textContent = monthNames[date.getMonth()] + ' ' + date.getFullYear();
            edd.appendChild(option);
        }
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