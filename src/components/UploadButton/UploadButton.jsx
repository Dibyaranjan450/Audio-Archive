import React, { useState } from "react";
import { v4 } from "uuid";
import { mirage } from "ldrs";
import { storeAudioData } from "../../server/server";

function UploadButton({ filesList, isValidMetaData, metaDataInputs }) {
  mirage.register();
  const [isLoading, setLoading] = useState(false);
  // console.log("isLoading ", isLoading);

  async function onUploadButtonClicked() {
    console.log(filesList);
    setLoading(true);

    filesList.map((file) => {
      console.log(file);

      storeAudioData(
        {
          trackCover: metaDataInputs[3].value,
          title: file.name,
          performedBy: metaDataInputs[2].value,
          albumName: metaDataInputs[1].value,
          isMenuOpen: false,
          uuid: v4(),
          audioFile: file,
        },
        setLoading
      );
    });
  }

  return (
    <button
      className={`text-sm font-semibold ${
        isValidMetaData && !isLoading
          ? "text-[#DC143C] hover:bg-[#DC143C] hover:text-[#fff] hovre:border-none"
          : "text-[#CDC8C880]"
      } border-2 border-[#CDC8C880] rounded-[5px] transition duration-500 px-[84px] py-[8px]`}
      onClick={() => onUploadButtonClicked()}
      disabled={!isValidMetaData || isLoading}
    >
      {isLoading ? (
        <l-mirage size="60" speed="2.5" color="black"></l-mirage>
      ) : (
        "Upload"
      )}
    </button>
  );
}

export default UploadButton;
