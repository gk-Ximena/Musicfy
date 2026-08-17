import "./../styles/FavButton.css";
import { invoke } from "@tauri-apps/api/core";

type FavButtonProps = {
  liked: boolean;
};

export default function FavButton({ liked }: FavButtonProps) {
  const handleClick = async () => {
    await invoke("toggle_like");
  };

  return (
    <div
      className={`fav-button-background ${liked ? "liked" : ""}`}
      onClick={handleClick}
    >
      <div className="fav-button"></div>
    </div>
  );
}