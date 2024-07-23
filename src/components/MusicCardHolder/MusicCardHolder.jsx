import React from "react";
import { motion } from "framer-motion";
import TrackMenuOption from "../../components/TrackMenuOption/TrackMenuOption";

import { BsThreeDots } from "react-icons/bs";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { RiMusic2Fill } from "react-icons/ri";

function MusicCardHolder({ musicTrackArr, setSelectedTrack, onMenuClick }) {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.03,
      },
    },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  function trackArtistAlbumText(artistName, albumName) {
    let artistAlbumText = artistName + " - " + albumName;

    if (artistName.length + albumName.length > 25) {
      return artistAlbumText.slice(0, 20) + "...";
    } else {
      return artistAlbumText;
    }
  }

  return (
    <motion.div
      className="grid sm:grid-cols-10 gap-[28px] bg-[#FFFFFF21] rounded-[10px] md:rounded-[28px] p-[40px]"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {musicTrackArr.map((music) => (
        <motion.div
          key={music.uuid}
          className="col-span-2 md:col-span-5 lg:col-span-2 gap-[82px] rounded-[32px] text-[#fff] p-[20px] grid content-between relative"
          variants={item}
          style={{
            backgroundImage: music.trackCover && `url(${music.trackCover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex justify-end pr-[28px]">
            <BsThreeDots
              className={`text-xl cursor-pointer ${
                music.isMenuOpen && "opacity-0"
              }`}
              onClick={() => onMenuClick(music.uuid, true)}
            />

            {music.isMenuOpen && (
              <TrackMenuOption audioTrack={music} onMenuClick={onMenuClick} />
            )}
          </div>

          <div className="flex justify-between items-center p-[18px] rounded-[18px] bg-[#00000033] backdrop-blur-4">
            <h2 className="text-sm font-semibold grid gap-[2px]">
              {music.title}
              <span className="text-xs font-medium flex items-center gap-[3px]">
                <RiMusic2Fill className="text-sm" />
                {/* {music.performedBy + " - " + music.albumName} */}
                {trackArtistAlbumText(music.performedBy, music.albumName)}
              </span>
            </h2>

            <BsFillPlayCircleFill
              className="text-[46px] cursor-pointer hover:shadow-custom rounded-[50%] transition duration-500"
              onClick={() => setSelectedTrack(music)}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default MusicCardHolder;
