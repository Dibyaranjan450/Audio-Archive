import React, { useEffect, useState } from "react";
import ArchiveHeader from "../../components/ArchiveHeader/ArchiveHeader";
import MusicCardHolder from "../../components/MusicCardHolder/MusicCardHolder";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import localAudioTrackArr from "../../utils/constant";

function Archive({ audioTrackArr }) {
  const [musicTrackArr, setMusicTrackArr] = useState(localAudioTrackArr);
  const [selectedTrack, setSelectedTrack] = useState();

  function onMenuClick(id, openVal) {
    const clonedMusicTrack = musicTrackArr.map((music) => ({
      ...music,
      isMenuOpen: id === music.uuid ? openVal : music.isMenuOpen,
    }));
    setMusicTrackArr(clonedMusicTrack);
  }

  function onTracksFilter(searchString) {
    const filteredMusicTracks = audioTrackArr?.filter((music) =>
      music.title.toLowerCase().includes(searchString)
    );
    setMusicTrackArr(filteredMusicTracks);
  }

  function shufflePlalistArr(array) {
    let newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  function shufflePlaylist() {
    setMusicTrackArr(shufflePlalistArr(musicTrackArr));
  }

  useEffect(() => {
    setTimeout(() => {
      setMusicTrackArr(audioTrackArr);
    }, 800);
  }, [audioTrackArr]);

  return (
    <div className="md:p-[40px] h-[100vh] overflow-auto">
      <ArchiveHeader onTracksFilter={onTracksFilter} />

      <MusicCardHolder
        musicTrackArr={musicTrackArr}
        setSelectedTrack={setSelectedTrack}
        onMenuClick={onMenuClick}
      />

      {selectedTrack && (
        <AudioPlayer
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
          musicTrackArr={musicTrackArr}
          shufflePlaylist={shufflePlaylist}
        />
      )}
    </div>
  );
}

export default Archive;
