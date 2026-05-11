import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import StopPlayButton from "./components/StopPlayButton";
import PrevButton from "./components/PrevButton";
import NextButton from "./components/NextButton";
import MusicInfo from "./components/MusicInfo";

function App() {

  return (
    <div className="widget">
      <StopPlayButton />
      <PrevButton />
      <NextButton />
      <MusicInfo />
    </div>
  );
}

export default App;
