(() => {
  const chrome = window.chrome;
  chrome.storage.sync.get(["targetDomain"], (result) => {
    const targetDomain = result.targetDomain || "yourdomain.com";
    const currentDomain = window.location.hostname;

    if (currentDomain.includes(targetDomain)) {
      console.log("Custom CSS Injector: Стили применены к", currentDomain);

      const indicator = document.createElement("div");
      indicator.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: #4CAF50;
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 12px;
                z-index: 10000;
                font-family: Arial, sans-serif;
            `;
      indicator.textContent = "CSS Injector активен";
      document.body.appendChild(indicator);
      setTimeout(() => {
        if (indicator.parentNode) {
          indicator.parentNode.removeChild(indicator);
        }
      }, 3000);
    }
  });
})();
