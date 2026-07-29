(() => {
  const IN_TEST_CLASS = "regula-status-in-test";

  const updateInTestStatuses = (root = document) => {
    root.querySelectorAll("td.status").forEach((statusCell) => {
      const status = statusCell.textContent.trim().toLowerCase();
      statusCell.classList.toggle(IN_TEST_CLASS, status === "in test");
    });
  };

  const start = () => {
    updateInTestStatuses();

    const observer = new MutationObserver(() => updateInTestStatuses());
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
