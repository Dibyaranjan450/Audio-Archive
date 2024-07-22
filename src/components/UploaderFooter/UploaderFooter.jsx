import React from "react";
import mynLogo from "../../assets/myn-logo-bw.png";

function UploaderFooter() {
  return (
    <footer className="grid pt-[30px]">
      <hr className="h-[2px] bg-[#CDC8C880] border-none" />
      <div className="flex justify-between items-center px-[8px] py-[18px]">
        <a href="https://myn.global/">
          <img className="w-[60px]" src={mynLogo} alt="myn.global" />
        </a>
        <span className="text-xs font-bold grid">
          Visit my profile
          <a
            href="https://www.linkedin.com/in/dibyaranjan-nayak-8a7814228/"
            className="font-normal text-[#4C4F62]"
          >
            linked.in
          </a>
        </span>
      </div>
    </footer>
  );
}

export default UploaderFooter;
