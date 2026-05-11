let socket = null;

// Connect to Tauri WebSocket server
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
}

connectSocket();

// Receive metadata from inject.js
chrome.runtime.onMessage.addListener((data) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  }
});


