// Auto-update the availability date for GitHub Pages / static hosting.
(function () {
  const target = document.getElementById("availability-date");
  if (!target) return;

  const today = new Date();
  target.textContent = today.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
})();
