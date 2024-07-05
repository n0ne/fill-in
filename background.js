chrome.commands.onCommand.addListener((command) => {
  chrome.storage.sync.get(['firstName', 'lastName', 'email', 'phoneNumber', 'linkedin'], (data) => {
    let message = "";
    switch (command) {
      case "fill-first-name":
        message = data.firstName || "";
        break;
      case "fill-last-name":
        message = data.lastName || "";
        break;
      case "fill-phone-number":
        message = data.phoneNumber || "";
        break;
      case "fill-email":
        message = data.email || "";
        break;
      case "fill-linkedin":
        message = data.linkedin || "";
        break;
    }
    if (message) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (text) => {
            document.activeElement.value = text;
          },
          args: [message]
        });
      });
    }
  });
});
