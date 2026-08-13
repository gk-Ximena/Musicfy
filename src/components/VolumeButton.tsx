import { useState } from "react";
import "./../styles/VolumeButton.css";
import { invoke } from "@tauri-apps/api/core";

export default function VolumeButton() {
    //Volume changes
    const [showSlider, setShowSlider] = useState(false);
    const [volume, setVolume] = useState(1);

    const handleVolumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);

        await invoke("set_volume", { volume: newVolume });
    };

    return (
        <div className="volume-button-background"
        onClick={() => setShowSlider(!showSlider)}>
            {showSlider && (
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-button"
                    onClick={(e) => e.stopPropagation()}
                />
            )}
        </div>
    );
}