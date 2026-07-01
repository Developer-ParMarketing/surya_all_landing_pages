/* Surya Hospitals — minimal interactions
   The booking form posts to process.php (same backend as your live site).
   No JS submission handling needed; the server handles it. */

document.addEventListener('DOMContentLoaded', function () {
    // Dynamic copyright year
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    // Light front-end validation before the form posts to process.php
    var form = document.getElementById('leadForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                form.reportValidity();
            }
        });
    }
});

document.querySelectorAll(".tcard").forEach(card => {

    const text = card.querySelector(".testimonial-text");
    const btn = card.querySelector(".read-more-btn");

    if (!btn) return;

    // Hide button for short testimonials
    if (text.scrollHeight <= text.clientHeight + 5) {
        btn.style.display = "none";
        return;
    }

    btn.addEventListener("click", () => {

        text.classList.toggle("expanded");

        btn.textContent = text.classList.contains("expanded")
            ? "Read Less"
            : "Read More";

    });

});
const edd = document.getElementById("edd");

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

// Next 24 months
for (let i = 0; i < 24; i++) {
    const date = new Date(currentYear, currentMonth + i, 1);

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const option = document.createElement("option");
    option.value = `${year}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    option.textContent = `${month} ${year}`;

    edd.appendChild(option);
}
