// Prevent double injection on YouTube Music SPA
if (window.__musicfy_injected) {
  console.log("Musicfy already injected");
} else {
  window.__musicfy_injected = true;
}

console.log("inject.js loaded!");

function sendMetadata() {
  const meta = navigator.mediaSession?.metadata;
  if (!meta) return;

  chrome.runtime.sendMessage({
    type: "metadata",
    title: meta.title || "",
    artist: meta.artist || "",
    album: meta.album || "",
    artwork: meta.artwork?.[0]?.src || ""
  }).catch(() => {});
}

// Poll every 500ms for updates
setInterval(sendMetadata, 500);



