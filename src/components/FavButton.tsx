import { useState } from "react";
import "./../styles/FavButton.css";

export default function FavButton() {
    //Animate button when is being pressed
    const [isPressed, setIsPressed] = useState(false);

    return (
        <div className="fav-button-background">
            <div className="fav-button"> 

            </div>

        </div>
    );
}