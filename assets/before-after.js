/* before-after.js — drag-to-compare slider for bathroom remodel galleries.
 *
 * Progressive enhancement + graceful degradation:
 *   - Each [data-ba] pair starts hidden and is shown ONLY once both of its
 *     [data-ba-img] images successfully load. If either image is missing or
 *     fails, that pair stays hidden — so the gallery never ships broken
 *     image icons while real photos are still being added.
 *   - A [data-ba-section] wrapper is revealed only when it has at least one
 *     visible pair, and re-hidden when it has none.
 *   - The slider position is driven by a native <input type="range">, so
 *     keyboard (arrow keys) and touch work for free, including a11y.
 */
(function () {
  "use strict";

  function initSlider(pair) {
    var range = pair.querySelector(".ba-range");
    if (!range) return;
    function update() { pair.style.setProperty("--pos", range.value + "%"); }
    range.addEventListener("input", update);
    update();
  }

  function syncSections() {
    document.querySelectorAll("[data-ba-section]").forEach(function (section) {
      var hasVisiblePair = section.querySelector("[data-ba]:not([hidden])");
      if (hasVisiblePair) section.removeAttribute("hidden");
      else section.setAttribute("hidden", "");
    });
  }

  function initPair(pair) {
    var imgs = pair.querySelectorAll("[data-ba-img]");
    if (!imgs.length) return;
    pair.setAttribute("hidden", ""); // hidden until both images confirm
    var remaining = imgs.length;
    var ok = true;

    function settle() {
      remaining -= 1;
      if (remaining > 0) return;
      if (ok) pair.removeAttribute("hidden");
      syncSections();
    }

    imgs.forEach(function (img) {
      function loaded() { settle(); }
      function failed() { ok = false; settle(); }
      if (img.complete) {
        (img.naturalWidth > 0 ? loaded : failed)();
      } else {
        img.addEventListener("load", loaded, { once: true });
        img.addEventListener("error", failed, { once: true });
      }
    });

    initSlider(pair);
  }

  function boot() {
    document.querySelectorAll("[data-ba]").forEach(initPair);
    syncSections();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
