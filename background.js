let youtubeTabs = new Set();

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("youtube.com")) {
    youtubeTabs.add(tabId);
    console.log("Added tabs: ", tabId);
    try {
      const response = await fetch("http://localhost:3000/led/on", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ site: "youtube" }),
      });
      if (response.ok) {
        console.log("Made API call");
      } else {
        console.log("Failed to make API call");
      }
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
  }
});

chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
  youtubeTabs.delete(tabId);

  if (youtubeTabs.size == 0) {
    console.log("Tab closed: ", tabId);
    try {
      const response = await fetch("http://localhost:3000/led/off", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ site: "youtube" }),
      });
      if (response.ok) {
        console.log("Made API call");
      } else {
        console.log("Failed to make API call");
      }
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
  }
});
