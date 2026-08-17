import "./../styles/MusicInfo.css";

type MusicInfoProps = {
  title: string;
  artist: string;
};

export default function MusicInfo({ title, artist }: MusicInfoProps) {
  return (
    <div className="music-info">
      <div className="text">
        <div className="title">{title}</div>
        <div className="artist">{artist}</div>
      </div>
    </div>
  );
}
