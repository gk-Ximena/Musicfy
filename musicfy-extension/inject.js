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

//Get like button
function getLikeButton() {
  return document.querySelector("ytmusic-like-button-renderer");
}

function sendMetadata() {
  const meta = navigator.mediaSession?.metadata;
  if (!meta) return;

  const video = getVideo();
  const likeRenderer = getLikeButton();
  const likeStatus = likeRenderer?.getAttribute("like-status") || "INDIFFERENT";

  chrome.runtime.sendMessage({
    type: "metadata",
    title: meta.title || "",
    artist: meta.artist || "",
    album: meta.album || "",
    artwork: meta.artwork?.[0]?.src || "",
    volume: video ? video.volume : 1,
    muted: video ? video.muted : false,
    liked: likeStatus === "LIKE"
  }).catch(() => {});
}

// Poll every 500ms for updates
setInterval(sendMetadata, 200);

//Receive volume/like commands relayed from the background
chrome.runtime.onMessage.addListener((message) => {
  const video = getVideo();

  if (message?.type === "setVolume" && video) {
    const v = Number(message.value);
    if (Number.isFinite(v)) {
      video.volume = Math.min(1, Math.max(0, v));
    }
  }
  if (message?.type === "toggleMute" && video) {
    video.muted = !video.muted;
  }
  if (message?.type === "toggleLike") {
    const likeRenderer = getLikeButton();
    const likeBtn = likeRenderer?.querySelector("#button-shape-like button");
    likeBtn?.click();
  }
});



