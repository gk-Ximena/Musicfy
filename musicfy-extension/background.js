let socket = null;
let activeTabId = null;

function connectSocket() {
  socket = new WebSocket("ws://127.0.0.1:12345");

  socket.onopen = () => {
    console.log("Connected to Musicfy WebSocket");
  };

  socket.onclose = () => {
    console.log("WebSocket closed, retrying in 1s...");
    setTimeout(connectSocket, 1000);
  };

  socket.onerror = (err) => {
    console.log("WebSocket error:", err);
    socket.close();
  };

  // NEW: relay commands from the Tauri app down to the content script
  socket.onmessage = (event) => {
  if (activeTabId == null) return;
  try {
    const data = JSON.parse(event.data);
    chrome.tabs.sendMessage(activeTabId, data).catch(() => {});
  } catch (e) {
    console.warn("Musicfy: bad message from server", event.data);
  }
};
}

connectSocket();

chrome.runtime.onMessage.addListener((data, sender) => {
  if (sender.tab) {
    activeTabId = sender.tab.id; // remember which tab is playing
  }
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  }
});


