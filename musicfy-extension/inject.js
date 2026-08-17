// Prevent double injection on YouTube Music SPA
if (window.__musicfy_injected) {
  console.log("Musicfy already injected");
} else {
  window.__musicfy_injected = true;
}

console.log("inject.js loaded!");

//Get video metadata from Youtube Music
function getVideo(){
  return document.querySelector("video");
}

function sendMetadata() {
  const meta = navigator.mediaSession?.metadata;
  if (!meta) return;

  const video = getVideo();

  chrome.runtime.sendMessage({
    type: "metadata",
    title: meta.title || "",
    artist: meta.artist || "",
    album: meta.album || "",
    artwork: meta.artwork?.[0]?.src || "",
    volume: video ? video.volume : 1,
    muted: video ? video.muted : false
  }).catch(() => {});
}

// Poll every 500ms for updates
setInterval(sendMetadata, 500);

//Receive volume commands relayed from the background
chrome.runtime.onMessage.addListener((message) => {
  const video = getVideo();
  if (!video) return;

  if (message?.type === "setVolume") {
    const v = Number(message.value);
    if (Number.isFinite(v)) {
      video.volume = Math.min(1, Math.max(0, v));
    } else {
      console.warn("Musicfy: ignored non-finite volume", message.value);
    }
  }
  if (message?.type === "toggleMute") {
    video.muted = !video.muted;
  }
});



