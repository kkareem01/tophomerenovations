/* lead-form.js — submits Hikmon lead forms to the notify service so the business
 * owner gets a text message. Drop this file into a site's assets/ folder and add,
 * before this script:
 *
 *   <script>window.HIKMON_NOTIFY = { site: "your-site-key" };</script>
 *   <script src="assets/lead-form.js"></script>
 *
 * The site key must match an entry in the notify service's sites.json.
 */
(function () {
  "use strict";

  // Update this once after the notify service is deployed to its final URL.
  var DEFAULT_ENDPOINT = "https://hikmon-notify-khatibkareem983-7689s-projects.vercel.app/api/notify";

  var config = window.HIKMON_NOTIFY || {};
  var endpoint = config.endpoint || DEFAULT_ENDPOINT;
  var site = config.site;

  if (!site) {
    console.error("lead-form: window.HIKMON_NOTIFY.site is not set — forms will not submit.");
    return;
  }

  var FIELDS = ["name", "phone", "service", "address", "email", "company"];

  function collect(form) {
    var payload = { site: site };
    FIELDS.forEach(function (name) {
      var field = form.elements[name];
      payload[name] = field ? String(field.value || "").trim() : "";
    });
    return payload;
  }

  function showMessage(form, state) {
    var success = form.querySelector("[data-form-success]");
    var error = form.querySelector("[data-form-error]");
    if (success) success.classList.toggle("hidden", state !== "success");
    if (error) error.classList.toggle("hidden", state !== "error");
  }

  function submit(form, button) {
    showMessage(form, "idle");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var originalLabel = button ? button.textContent : "";
    if (button) {
      button.disabled = true;
      button.textContent = "Sending…";
    }

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collect(form)),
    })
      .then(function (response) {
        return response.json().catch(function () {
          return { ok: false, error: "Bad response" };
        });
      })
      .then(function (result) {
        if (!result || !result.ok) {
          throw new Error((result && result.error) || "Request failed");
        }
        showMessage(form, "success");
        if (button) button.textContent = "Sent ✓";
      })
      .catch(function (err) {
        console.error("lead-form: submission failed —", err);
        showMessage(form, "error");
        if (button) {
          button.disabled = false;
          button.textContent = originalLabel;
        }
      });
  }

  document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      submit(form, form.querySelector('button[type="submit"]'));
    });
  });
})();
