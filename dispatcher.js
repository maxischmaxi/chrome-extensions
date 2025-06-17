(function () {
  if (document.getElementById("hotkey-overlay")) {
    document.getElementById("hotkey-overlay").remove();
    window.removeEventListener("keydown", handleHotkeys, true);
    window.removeEventListener("keypress", blockAllKeys, true);
    window.removeEventListener("keyup", blockAllKeys, true);
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "hotkey-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  overlay.style.zIndex = "999999";
  overlay.style.color = "white";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.fontSize = "32px";
  overlay.style.flexDirection = "column";
  overlay.innerText = "Dispatcher aktiv - drücke eine Taste";
  document.body.appendChild(overlay);

  overlay.innerHTML = `
<p>Move Tab Left: p</p>
<p>Move Tab Right: n</p>
<p>Focus Tab Left: ArrowLeft</p>
<p>Focus Tab Right: ArrowRight</p>
`;

  function blockAllKeys(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleHotkeys(e) {
    e.stopPropagation();
    e.preventDefault();

    // overlay.innerText = `Taste: ${e.key}`;

    switch (e.key) {
      case "p":
        chrome.runtime.sendMessage({ action: "moveTabLeft" });
        break;
      case "n":
        chrome.runtime.sendMessage({ action: "moveTabRight" });
        break;
      case "ArrowLeft":
        chrome.runtime.sendMessage({ action: "focusTabLeft" });
        overlay.remove();
        break;
      case "ArrowRight":
        chrome.runtime.sendMessage({ action: "focusTabRight" });
        overlay.remove();
        break;
      case "Escape":
        overlay.remove();
        window.removeEventListener("keydown", handleHotkeys, true);
        window.removeEventListener("keypress", blockAllKeys, true);
        window.removeEventListener("keyup", blockAllKeys, true);
        break;
      default:
        break;
    }
  }

  window.addEventListener("keydown", handleHotkeys, true);
  window.addEventListener("keypress", blockAllKeys, true);
  window.addEventListener("keyup", blockAllKeys, true);
})();
