import { useState } from "react";
import "./../styles/VolumeButton.css";
import { invoke } from "@tauri-apps/api/core";

type VolumeButtonProps = {
  volume: number;
  muted: boolean;
  onVolumeChange: (volume: number) => void;
};

export default function VolumeButton({
  volume,
  muted,
  onVolumeChange,
}: VolumeButtonProps) {
  const [showSlider, setShowSlider] = useState(false);

  const handleVolumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    if (!Number.isFinite(newVolume)) return; // guard against bad reads
    onVolumeChange(newVolume); // optimistic local update
    await invoke("set_volume", { volume: newVolume });
  };

  return (
    <div
      className="volume-button-background"
      onClick={() => setShowSlider(!showSlider)}
    >
      {showSlider && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className={`volume-button ${muted ? "muted" : ""}`}
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  );
}