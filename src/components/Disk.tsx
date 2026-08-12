import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";
import "./../styles/Disk.css";

export default function Disk() {
    const [info, setInfo] = useState({
        artwork: ""
      });
    
      useEffect(() => {
        const unlisten = listen("metadata", (event) => {
          try {
            const data = JSON.parse(event.payload as string);
            setInfo(data);
          } catch (e) {
            console.error("Invalid metadata:", e);
          }
        });
    
        return () => {
          unlisten.then((fn) => fn());
        };
      }, []);
    
    return (
        <div className="disk-background">
            <div className="song-cover">
                {info.artwork && <img src={info.artwork} className="song-cover-image" />}
            </div>
            <div className="hole">  </div>
        </div>
    );
}