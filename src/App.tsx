import "./App.css";
import StopPlayButton from "./components/StopPlayButton";
import PrevButton from "./components/PrevButton";
import NextButton from "./components/NextButton";
import MusicInfo from "./components/MusicInfo";
import SeekBar from "./components/SeekBar";
import Disk from "./components/Disk";
import ColorButton from "./components/ColorButton";
import FavButton from "./components/FavButton";
import VolumeButton from "./components/VolumeButton";
import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const [trackInfo, setTrackInfo] = useState({
    title: "No song playing",
    artist: "",
    album: "",
    artwork: "",
  });
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const unlisten = listen("metadata", (event) => {
      try {
        const data = JSON.parse(event.payload as string);
        setTrackInfo({
          title: data.title ?? "No song playing",
          artist: data.artist ?? "",
          album: data.album ?? "",
          artwork: data.artwork ?? "",
        });
        if (typeof data.volume === "number") setVolume(data.volume);
        if (typeof data.muted === "boolean") setMuted(data.muted);
      } catch (e) {
        console.error("Invalid metadata:", e);
      }
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return (
    <div className="widget">
      <div className="widget-content">
        <StopPlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        <PrevButton />
        <NextButton />
        <MusicInfo title={trackInfo.title} artist={trackInfo.artist} />
        <SeekBar isPlaying={isPlaying} />
        <Disk />
        <ColorButton />
        <FavButton />
        <VolumeButton
          volume={volume}
          muted={muted}
          onVolumeChange={setVolume}
        />
      </div>
    </div>
  );
}

export default App;
