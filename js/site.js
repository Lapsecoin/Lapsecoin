// Everything here is an enhancement: the pages read and link fine without it.

// 1. "On this page": highlight the entry for the section in view.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  if (!links.length || !("IntersectionObserver" in window)) return;
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
  var current = null;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var a = byId[e.target.id];
      if (!a) return;
      if (current) current.classList.remove("on");
      a.classList.add("on");
      current = a;
    });
  }, { rootMargin: "-72px 0px -70% 0px" });
  Object.keys(byId).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) io.observe(el);
  });
})();

// 2. Grouped navigation: click toggles, outside click or Escape closes.
(function () {
  var menus = Array.prototype.slice.call(document.querySelectorAll(".menu"));
  function close(m) {
    m.classList.remove("open");
    var b = m.querySelector(".menu-btn");
    if (b) b.setAttribute("aria-expanded", "false");
  }
  menus.forEach(function (m) {
    var b = m.querySelector(".menu-btn");
    if (!b) return;
    b.addEventListener("click", function () {
      var open = !m.classList.contains("open");
      menus.forEach(close);
      if (open) { m.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
    });
  });
  document.addEventListener("click", function (e) {
    menus.forEach(function (m) { if (!m.contains(e.target)) close(m); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    menus.forEach(function (m) {
      if (m.classList.contains("open")) { close(m); var b = m.querySelector(".menu-btn"); if (b) b.focus(); }
    });
  });
})();

// 3. Copy buttons: data-copy holds a selector for the element whose text to copy.
(function () {
  Array.prototype.forEach.call(document.querySelectorAll("[data-copy]"), function (btn) {
    btn.addEventListener("click", function () {
      var el = document.querySelector(btn.getAttribute("data-copy"));
      if (!el) return;
      var text = el.textContent.trim();
      var done = function () {
        var label = btn.textContent;
        btn.textContent = "Copied";
        btn.classList.add("done");
        setTimeout(function () { btn.textContent = label; btn.classList.remove("done"); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { select(el); });
      } else { select(el); }
    });
  });
  function select(el) {
    var r = document.createRange(); r.selectNodeContents(el);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }
})();
