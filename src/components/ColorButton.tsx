import { useState } from "react";
import "./../styles/ColorButton.css";

export default function ColorButton() {
    //Animate button when is being pressed
    const [isPressed, setIsPressed] = useState(false);

    return (
        <div className="color-button-background">
            <div className="color-button"> 

            </div>

        </div>
    );
}