import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./../styles/PrevButton.css";

export default function PrevButton() {
    //Animate button when is being pressed
    const [isPressed, setIsPressed] = useState(false);

    //Toggle the music on click
    const prevSong = async () => {
        //trigger animation
        setIsPressed(true);
        setTimeout(() => {
            setIsPressed(false);
        }, 150);

        //call the Rust function to play or stop the music
        await invoke("previous_track");
    };

    return (
        <button 
            className={`prev-button ${isPressed ? "pressed" : ""}`}
            onClick={prevSong}>
            </button>
    );
}
