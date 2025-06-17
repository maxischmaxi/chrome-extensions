chrome.commands.onCommand.addListener((command) => {
  if (command === "open-dispatcher") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["dispatcher.js"],
      });
    });
  }
});

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.action === "moveTabLeft") {
    moveTab(-1);
    sendResponse({ status: "success" });
  } else if (request.action === "moveTabRight") {
    moveTab(1);
    sendResponse({ status: "success" });
  } else if (request.action === "focusTabLeft") {
    focusTab(-1);
    sendResponse({ status: "success" });
  } else if (request.action === "focusTabRight") {
    focusTab(1);
    sendResponse({ status: "success" });
  } else {
    sendResponse({ status: "error", message: "Unknown action" });
  }
});

function moveTab(direction) {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    if (tabs.length === 0) return;
    const activeTab = tabs[0];
    const newIndex = activeTab.index + direction;
    chrome.tabs.move(activeTab.id, { index: newIndex });
  });
}

function focusTab(direction) {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    if (tabs.length === 0) return;
    const activeTab = tabs[0];

    chrome.tabs.query({ currentWindow: true }, (allTabs) => {
      const currentIndex = activeTab.index;
      const newIndex = currentIndex + direction;

      if (newIndex >= 0 && newIndex < allTabs.length) {
        chrome.tabs.update(allTabs[newIndex].id, { active: true });
      }
    });
  });
}
