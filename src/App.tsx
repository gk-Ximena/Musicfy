
import "./App.css";
import StopPlayButton from "./components/StopPlayButton";
import PrevButton from "./components/PrevButton";
import NextButton from "./components/NextButton";
import MusicInfo from "./components/MusicInfo";
import SeekBar from "./components/SeekBar";
import Disk from "./components/Disk";
import ColorButton from "./components/ColorButton";
import FavButton from "./components/FavButton";
import VolumeButton from "./components/VolumeButton";
import { useState } from "react";

function App() {

  //Keep track of whether the music is playing or not
    const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="widget">
      <div className= "widget-content">
        <StopPlayButton 
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <PrevButton />
        <NextButton />
        <MusicInfo />
        <SeekBar 
          isPlaying={isPlaying}
        />
        <Disk />
        <ColorButton />
        <FavButton />
        <VolumeButton />
      </div>
    </div>
  );
}

export default App;
