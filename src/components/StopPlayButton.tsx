import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./../styles/StopPlayButton.css";

export default function StopPlayButton() {
    //Keep track of whether the music is playing or not
    const [isPlaying, setIsPlaying] = useState(false);
    //Animate button when is being pressed
    const [isPressed, setIsPressed] = useState(false);

    //Toggle the music on click
    const toggleMusic = async () => {
        //trigger animation
        setIsPressed(true);
        setTimeout(() => {
            setIsPressed(false);
        }, 150);

        //toogle music
        const newState = !isPlaying;
        setIsPlaying(newState);

        //call the Rust function to play or stop the music
        await invoke("play_pause");
    };

    return (
        <button 
            className={`stop-play-button ${isPressed ? "pressed" : ""}`}
            onClick={toggleMusic}>
                <div className={`icon ${isPlaying ? "playing" : "stopped"}`}/>
            </button>
    );
}
