import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";
import "./../styles/MusicInfo.css";

export default function MusicInfo() {
  const [info, setInfo] = useState({
    title: "No song playing",
    artist: "",
  });

  useEffect(() => {
    const unlisten = listen("metadata", (event) => {
      try {
        const data = JSON.parse(event.payload as string);
        setInfo(data);
      } catch (e) {
        console.error("Invalid metadata:", e);
      }
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return (
    <div className="music-info">
      <div className="text">
        <div className="title">{info.title}</div>
        <div className="artist">{info.artist}</div>
      </div>
    </div>
  );
}

