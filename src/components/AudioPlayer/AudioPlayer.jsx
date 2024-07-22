import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import WaveSurfer from "wavesurfer.js";

import {
  TbPlayerSkipForwardFilled,
  TbPlayerSkipBackFilled,
} from "react-icons/tb";
import { IoPlayCircle, IoPauseCircle } from "react-icons/io5";
import { LuShuffle, LuVolume2, LuVolumeX } from "react-icons/lu";
import { PiRepeatBold, PiRepeatOnceBold } from "react-icons/pi";

function AudioPlayer({
  selectedTrack,
  setSelectedTrack,
  musicTrackArr,
  shufflePlaylist,
}) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [playAudio, setPlayAudio] = useState(true);
  const [isMute, setMute] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeat, setRepeat] = useState(false);

  function handlePlayPause(toggleVal) {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }

    setPlayAudio(toggleVal);
  }

  function handleToggleMute(toggleVal) {
    if (wavesurferRef.current) {
      const currentVolume = wavesurferRef.current.getVolume();
      wavesurferRef.current.setVolume(currentVolume > 0 ? 0 : 1);
    }

    setMute(toggleVal);
  }

  function jumpNextPrevTrack(trackJumpVal) {
    const trackIndex = musicTrackArr.findIndex(
      (music) => music.uuid === selectedTrack.uuid
    );

    if (trackJumpVal) {
      trackIndex < musicTrackArr.length - 1 &&
        setSelectedTrack(musicTrackArr[trackIndex + 1]);
    } else {
      trackIndex > 0 && setSelectedTrack(musicTrackArr[trackIndex - 1]);
    }
  }

  function formattedTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  useEffect(() => {

    ///// Initialize WaveSurfer /////
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      //   waveColor: "#00000080",
      progressColor: "#fff",
      backend: "WebAudio",
      responsive: true,
      height: 40,
      cursorWidth: 1,
      cursorColor: "#333",
      barWidth: 3,
      barRadius: 3,
      dragToSeek: true,
      cursorColor: "transparent",
      barGap: 2,
      barWidth: 2,
    });

    ///// Load audio file /////
    if (wavesurferRef.current) {
      wavesurferRef.current.load(selectedTrack.audioFile);
    }

    ///// Play th audio file /////
    wavesurferRef.current.on("ready", () => {
      setDuration(wavesurferRef.current.getDuration());
      wavesurferRef.current.play();
      setPlayAudio(true);
    });

    wavesurferRef.current.on("audioprocess", () => {
      setCurrentTime(wavesurferRef.current.getCurrentTime());
    });

    wavesurferRef.current.on("finish", () => {
      setCurrentTime(0); // Reset the current time when playback finishes
      isRepeat ? wavesurferRef.current.play() : jumpNextPrevTrack(true);
    });

    ///// Clean up on component unmount /////
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [selectedTrack, isRepeat]);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 px-[10px] py-[20px] pt-[0] md:p-[40px] md:pt-[0] w-full"
    >
      <div className="py-[14px] px-[20px] md:py-[18px] md:px-[38px] bg-[#C6426EE6] md:bg-[#C6426E80] rounded-[24px] text-[#fff] flex items-center justify-between">
        <div className="flex items-center gap-[18px]">
          <div className="flex items-center gap-[10px] text-cs">
            <img
              className="md:hidden w-[45px] h-[45px] rounded-xl"
              src={selectedTrack.trackCover}
              alt="selectedCover"
            />
            <TbPlayerSkipBackFilled
              className="cursor-pointer"
              onClick={() => jumpNextPrevTrack(false)}
            />

            <button onClick={() => handlePlayPause(!playAudio)}>
              {playAudio ? (
                <IoPauseCircle className="text-[45px] cursor-pointer shadow-customWhite hover:shadow-none rounded-[50%] transition duration-500" />
              ) : (
                <IoPlayCircle className="text-[45px] cursor-pointer shadow-customWhite hover:shadow-none rounded-[50%] transition duration-500" />
              )}
            </button>

            <TbPlayerSkipForwardFilled
              className="cursor-pointer"
              onClick={() => jumpNextPrevTrack(true)}
            />
          </div>

          <div className="flex items-center gap-[10px]">
            <img
              className="w-[45px] h-[45px] rounded-xl hidden md:block"
              src={selectedTrack.trackCover}
              alt="selectedCover"
            />
            <span className="hidden md:block text-sm font-semibold">
              {selectedTrack.title}
              <h6 className="text-[10px] font-normal flex gap-[6px]">
                {selectedTrack.performedBy} <b>•</b> {selectedTrack.albumName}
              </h6>
            </span>
          </div>
        </div>

        <div className="flex items-center md:gap-[28px] lg:gap-[40px]">
          {/* ///////////// Audio WaveSurfer ///////////// */}

          <div className="flex items-center gap-[18px]">
            <p className="hidden lg:block text-xs">
              {formattedTime(currentTime)}
            </p>
            <div
              className="hidden md:block md:w-[180px] lg:w-[800px] cursor-pointer"
              ref={waveformRef}
            ></div>
            <p className="hidden lg:block text-xs">{formattedTime(duration)}</p>
          </div>

          <div className="flex items-center gap-[18px]">
            <LuShuffle
              className="text-[18px] cursor-pointer"
              onClick={shufflePlaylist}
            />

            <div onClick={() => setRepeat(!isRepeat)}>
              {isRepeat ? (
                <PiRepeatOnceBold className="text-[20px] cursor-pointer" />
              ) : (
                <PiRepeatBold className="text-[20px] cursor-pointer" />
              )}
            </div>

            <div onClick={() => handleToggleMute(!isMute)}>
              {isMute ? (
                <LuVolumeX className="text-[20px] cursor-pointer hidden md:block" />
              ) : (
                <LuVolume2 className="text-[20px] cursor-pointer hidden md:block" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AudioPlayer;
