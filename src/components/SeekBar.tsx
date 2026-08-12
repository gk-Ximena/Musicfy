import { useEffect, useState } from "react";
import "./../styles/SeekBar.css";

export default function SeekBar({ isPlaying }: { isPlaying: boolean }) {
    //Waves bars
    const bars =[
        "/assets/sound-waves/large.png",
        "/assets/sound-waves/medium.png",
        "/assets/sound-waves/small.png",
        "/assets/sound-waves/tiny.png"
    ];

    //Bars across the seek bar
    const TOTAL_BARS = 23;
    const barsArray = Array.from({ length: TOTAL_BARS }, (_, i) => {return bars[i % bars.length]});

    const [order, setOrder] = useState(barsArray);

    useEffect(() => {
        if (!isPlaying){
            //Reset when paused
            setOrder(barsArray);
            return;
        }

        const interval = setInterval(() => {
            //Shuffle the order of the bars
            const shuffled = [...barsArray].sort(() => Math.random() - 0.5);
            setOrder(shuffled);
        }, 220);

        return () => {
            clearInterval(interval);
        };
    }, [isPlaying]);

    return (
        <div className="seek-bar-background">
            <div className="waves-container">
                {order.map((src, index) => (
                    <img key={index} src={src} className="wave-bar" alt={`wave-bar-${index}`} style={{width: '100%', height: '100%', transition: 'transform 0.15s ease'}} />
                ))}

            </div>
        </div>
    );
}