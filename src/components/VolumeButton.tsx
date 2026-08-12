import { useState } from "react";
import "./../styles/VolumeButton.css";

export default function VolumeButton() {
    //Animate button when is being pressed
    const [isPressed, setIsPressed] = useState(false);

    return (
        <div className="volume-button-background">
            <div className="volume-button"> 

            </div>

        </div>
    );
}