// Reveal on scroll
(function () {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        items.forEach(function (el) { el.classList.add("visible"); });
        return;
    }
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    items.forEach(function (el) { observer.observe(el); });
})();

// Copy email to clipboard
(function () {
    var btn = document.getElementById("copyEmail");
    if (!btn) { return; }
    var valueEl = btn.querySelector(".contact-value");
    var original = valueEl.textContent;
    btn.addEventListener("click", function () {
        var email = "liuqiyue2024@hotmail.com";
        function done() {
            valueEl.textContent = "已复制 ✓ " + email;
            setTimeout(function () { valueEl.textContent = original; }, 1800);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(done).catch(function () { fallback(); });
        } else {
            fallback();
        }
        function fallback() {
            var tmp = document.createElement("input");
            tmp.value = email;
            document.body.appendChild(tmp);
            tmp.select();
            try { document.execCommand("copy"); done(); } catch (e) { /* noop */ }
            document.body.removeChild(tmp);
        }
    });
})();
