# 🎵 Musicfy  
A lightweight desktop widget that displays **real‑time YouTube Music metadata** through a custom browser extension and a Tauri‑powered desktop app.  
Built with **React**, **Tauri (Rust)**, and a **WebSocket bridge** for fast, seamless communication.

---

## ✨ Features  
🎶 **Live Song Metadata** — Displays title, artist, album, and artwork in real time  
🪟 **Transparent Desktop Widget** — Always‑on‑top, minimal, and aesthetic  
⚡ **WebSocket Bridge** — Fast communication between browser extension and Tauri app  
🧩 **Chrome/Edge Extension** — Extracts metadata directly from YouTube Music  
🎨 **Custom UI** — Pixel‑art friendly, smooth, and compact  
🖥️ **Cross‑Platform Ready** — Build for Windows, macOS, and Linux  
🔒 **Double‑Injection Safe** — Prevents duplicate content script execution  
📦 **Installer Support** — Build `.exe`, `.msi`, `.dmg`, `.AppImage`, and more  

---

## 🛠️ Technologies Used  

### **Frontend (Widget)**  
- **React** — UI components  
- **CSS3** — Styling, animations, transparency  
- **JavaScript (ES6+)** — Metadata handling and UI updates  

### **Backend (Rust / Tauri)**  
- **Tauri Core** — Desktop wrapper, window management  
- **WebSocket Server** — Receives metadata from extension  
- **Rust** — Fast, lightweight backend logic  
- **Windows Subsystem = GUI** — Removes console window on launch  

### **Browser Extension**  
- **JavaScript (ES6+)** — Metadata polling  
- **MediaSession API** — Extracts song info  
- **WebSocket Client** — Sends metadata to Tauri  
- **Manifest v3** — Modern extension architecture  

---

## 🔧 Process Overview  
🧠 Designed the widget layout and transparent UI  
🧩 Built the YouTube Music content script (`inject.js`)  
🔌 Implemented WebSocket communication between extension → Tauri  
🎧 Connected metadata updates to React state  
🪟 Configured Tauri window (transparent, no decorations, always on top)  
📦 Added icon support (`.png` + `.ico`) for installers  
🛠️ Built release installers for Windows  
🚫 Removed console window using `windows_subsystem = "windows"`  
🧪 Tested metadata flow across multiple songs and page transitions  

---

## ⚠️ Challenges Faced  
🔍 **YouTube Music SPA behavior** — Content script not reloading on navigation  
🧩 **Double injection issues** — Solved with a global guard in `inject.js`  
🌐 **WebSocket stability** — Ensured reconnection and error handling  
🪟 **Transparent window quirks** — Dragging, focus, and shadow issues  
🖼️ **Long song titles** — Added ellipsis / scrolling options  
🔐 **Extension permissions** — Ensuring correct matches for `music.youtube.com`  
📦 **Windows packaging** — Required `.ico` file for MSI builds  

---

## 🚀 Future Improvements  
🎨 Add theme customization (light/dark/pixel)  
📡 Add support for Spotify, Apple Music, and local players  
🖼️ Add blurred album‑art background mode  
📱 Create a mobile companion app  
🔔 Add notifications for song changes  
🧪 Add unit tests for metadata parsing  
🌍 Publish the extension to the Chrome Web Store  
🧰 Add auto‑update support for the desktop app  

---

## 🎥 Preview  
