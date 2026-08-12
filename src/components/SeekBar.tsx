import { useState } from "react";
import "./../styles/SeekBar.css";

export default function SeekBar() {
    //Animate button when is being pressed
    const [isPressed, setIsPressed] = useState(false);

    return (
        <div className="seek-bar-background">

        </div>
    );
}