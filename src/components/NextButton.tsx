import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./../styles/NextButton.css";

export default function NextButton() {
    //Animate button when is being pressed
    const [isPressed, setIsPressed] = useState(false);

    //Toggle the music on click
    const nextSong = async () => {
        //trigger animation
        setIsPressed(true);
        setTimeout(() => {
            setIsPressed(false);
        }, 150);

        //call the Rust function to play or stop the music
        await invoke("next_track");
    };

    return (
        <button 
            className={`next-button ${isPressed ? "pressed" : ""}`}
            onClick={nextSong}>
            </button>
    );
}