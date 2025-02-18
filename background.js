chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs.length) return;

        let activeTab = tabs[0];

        chrome.tabs.query({ currentWindow: true }, (allTabs) => {
            let index = activeTab.index;

            if (command === "move_tab_left" && index > 0) {
                chrome.tabs.move(activeTab.id, { index: index - 1 });
            } else if (
                command === "move_tab_right" &&
                index < allTabs.length - 1
            ) {
                chrome.tabs.move(activeTab.id, { index: index + 1 });
            } else if (command === "focus_tab_left" && index > 0) {
                chrome.tabs.update(allTabs[index - 1].id, { active: true });
            } else if (
                command === "focus_tab_right" &&
                index < allTabs.length - 1
            ) {
                chrome.tabs.update(allTabs[index + 1].id, { active: true });
            }
        });
    });
});
