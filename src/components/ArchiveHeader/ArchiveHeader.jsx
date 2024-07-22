import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MotionLoaderAnimation } from "../MotionSpringAnimation/MotionSpringAnimation";
import { IoChevronBackOutline, IoClose } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";

function ArchiveHeader({ onTracksFilter }) {
  const navigate = useNavigate();
  const [btnHover, setBtnHpver] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="px-[10px] pt-[12px] md:pt-0 pb-[22px] flex justify-between text-[#fff]">
      <button
        className="flex justify-center items-center p-[6px] bg-[#0000004D] rounded-3xl hover:pr-[75px] transition-all duration-200 font-medium relative"
        onClick={() => navigate(-1)}
        onMouseEnter={() => setBtnHpver(true)}
        onMouseLeave={() => setBtnHpver(false)}
      >
        <IoChevronBackOutline className="text-cs pr-[2px]" />
        {btnHover && <p className="fixed left-[40px] md:left-[80px]">Upload</p>}
      </button>

      <div
        className={`flex items-center bg-[#0000004D] rounded-3xl gap-[8px] transition-all duration-200 ${
          isSearchOpen ? "px-[10px] pr-[240px]" : "px-[8px]"
        } cursor-pointer relative`}
      >
        <LuSearch className="text-lg" onClick={() => setIsSearchOpen(true)} />

        {isSearchOpen && (
          <div className="absolute left-[38px] flex items-center">
            <MotionLoaderAnimation>
              <input
                className="bg-transparent outline-none text-base font-medium"
                type="text"
                placeholder="Search"
                onChange={(e) => onTracksFilter(e.target.value)}
              />
            </MotionLoaderAnimation>

            <IoClose
              className="text-lg"
              onClick={() => setIsSearchOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ArchiveHeader;
