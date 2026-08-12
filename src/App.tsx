
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

function App() {

  return (
    <div className="widget">
      <div className= "widget-content">
        <StopPlayButton />
        <PrevButton />
        <NextButton />
        <MusicInfo />
        <SeekBar />
        <Disk />
        <ColorButton />
        <FavButton />
        <VolumeButton />
      </div>
    </div>
  );
}

export default App;
