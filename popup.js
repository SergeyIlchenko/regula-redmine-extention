document.addEventListener("DOMContentLoaded", () => {
  const statusDiv = document.getElementById("status");
  const domainInput = document.getElementById("domain");
  const saveBtn = document.getElementById("save");
  window.chrome.storage.sync.get(["targetDomain"], (result) => {
    if (result.targetDomain) {
      domainInput.value = result.targetDomain;
    }
  });

  window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = new URL(tabs[0].url);
    const currentDomain = currentUrl.hostname;

    window.chrome.storage.sync.get(["targetDomain"], (result) => {
      const targetDomain = result.targetDomain || "yourdomain.com";

      if (currentDomain.includes(targetDomain)) {
        statusDiv.textContent = "CSS активен на этой странице";
        statusDiv.className = "status active";
      } else {
        statusDiv.textContent = "CSS не активен на этой странице";
        statusDiv.className = "status inactive";
      }
    });
  });

  saveBtn.addEventListener("click", () => {
    const domain = domainInput.value.trim();
    if (domain) {
      window.chrome.storage.sync.set({ targetDomain: domain }, () => {
        statusDiv.textContent = "Настройки сохранены!";
        statusDiv.className = "status active";
        setTimeout(() => {
          statusDiv.textContent =
            "Перезагрузите расширение для применения изменений";
          statusDiv.className = "status inactive";
        }, 2000);
      });
    }
  });
});
