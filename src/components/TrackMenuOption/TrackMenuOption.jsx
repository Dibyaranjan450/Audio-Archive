import React from "react";
import { MotionLoaderAnimation } from "../MotionSpringAnimation/MotionSpringAnimation";
import { IoClose } from "react-icons/io5";
import { TfiDownload } from "react-icons/tfi";
import { LiaExclamationCircleSolid } from "react-icons/lia";

function TrackMenuOption({ audioTrack, onMenuClick }) {
  console.log(audioTrack);

  const expandVariants = {
    initial: {
      scaleX: 0,
    },
    animate: {
      scaleX: 1,
      transition: {
        type: "spring",
        damping: 20,
      },
    },
  };

  function downloadAudio() {
    const link = document.createElement("a");
    link.href = audioTrack.audioFile;
    link.download = audioTrack.title + " by " + audioTrack.performedBy;
    link.click();
  }

  return (
    <MotionLoaderAnimation
      initial="initial"
      animate="animate"
      variants={expandVariants}
      style={{
        transformOrigin: "center right",
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        right: 0,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div className="w-full md:w-[50%] h-full bg-[#000000CC] md:bg-[#00000080] rounded-[32px] md:rounded-tl-none md:rounded-bl-none">
        <button className="w-full flex justify-end px-[48px] pb-[12px] py-[20px]">
          <IoClose
            className="text-xl cursor-pointer"
            onClick={() => onMenuClick(audioTrack.uuid, false)}
          />
        </button>

        <div className="grid justify-items-start text-left rounded-[8px] gap-[18px] py-[16px]">
          <button
            className="px-[20px] text-[#FEFEFE] flex items-center gap-[8px]"
            onClick={downloadAudio}
          >
            <TfiDownload className="text-[15px]" /> Download
          </button>

          <button
            className="px-[20px] text-[#FEFEFE] flex items-center gap-[5px]"
            onClick={() => onMenuClick(audioTrack.uuid, false)}
          >
            <LiaExclamationCircleSolid className="text-[20px]" />
            Report
          </button>
        </div>
      </div>
    </MotionLoaderAnimation>
  );
}

export default TrackMenuOption;
