/* ============================================================
   SURYA HOSPITALS — Gynaecology Surgery landing page
   Requires Swiper (loaded before this file in the HTML).
   ============================================================ */
(function () {
    "use strict";

    // Footer year
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Guard: only init sliders if Swiper is present
    if (typeof Swiper === "undefined") return;

    // Testimonials slider
    if (document.querySelector(".testimonialSwiper")) {
        new Swiper(".testimonialSwiper", {
            loop: true,
            spaceBetween: 30,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: ".testimonialSwiper .swiper-pagination", clickable: true },
            navigation: {
                nextEl: ".testimonialSwiper .swiper-button-next",
                prevEl: ".testimonialSwiper .swiper-button-prev",
            },
        });
    }

    // "Trusted for every stage" image slider (fade)
    if (document.querySelector(".whySwiper")) {
        new Swiper(".whySwiper", {
            loop: true,
            effect: "fade",
            fadeEffect: { crossFade: true },
            speed: 1000,
            autoplay: { delay: 3500, disableOnInteraction: false },
            pagination: { el: ".why-pagination", clickable: true },
        });
    }
})();

/* Auto-scroll + drag for the trust stats */
(function () {
    var track = document.querySelector(".stats");
    if (!track) return;

    // Duplicate the items once so the loop is seamless
    track.innerHTML = track.innerHTML + track.innerHTML;

    var half = 0;
    function measure() { half = track.scrollWidth / 2; }
    measure();
    window.addEventListener("resize", measure);

    var speed = 0.5;          // px per frame — raise for faster
    var paused = false, down = false, startX = 0, startLeft = 0, moved = false;

    function loop() {
        if (!paused && !down && half > 0) {
            track.scrollLeft += speed;
            if (track.scrollLeft >= half) track.scrollLeft -= half;
        }
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    track.addEventListener("mouseenter", function () { paused = true; });
    track.addEventListener("mouseleave", function () { paused = false; });

    track.addEventListener("pointerdown", function (e) {
        down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
        track.setPointerCapture(e.pointerId); track.classList.add("is-dragging");
    });
    track.addEventListener("pointermove", function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > 3) moved = true;
        var x = startLeft - dx;
        if (x >= half) x -= half; if (x < 0) x += half;
        track.scrollLeft = x;
    });
    function end(e) {
        if (!down) return;
        down = false; track.classList.remove("is-dragging");
        try { track.releasePointerCapture(e.pointerId); } catch (_) { }
    }
    track.addEventListener("pointerup", end);
    track.addEventListener("pointercancel", end);
    // block accidental clicks after a drag
    track.addEventListener("click", function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
})();

document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.previousElementSibling;
        const expanded = text.classList.toggle('expanded');
        btn.textContent = expanded ? 'Read Less' : 'Read More';
    });
});