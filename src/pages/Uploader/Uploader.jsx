import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddedFileComp from "../../components/AddedFileComp/AddedFileComp";
import UploaderFooter from "../../components/UploaderFooter/UploaderFooter";
import MetaDataComp from "../../components/MetaDataComp/MetaDataComp";
import MotionSpringAnimation from "../../components/MotionSpringAnimation/MotionSpringAnimation";
import uploadIcon from "../../assets/file-upload-icon.png";
import { IoChevronForward } from "react-icons/io5";

function Uploader() {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);
  // console.log("fileList ", fileList);
  const [metaDataInputs, setMetaDataInput] = useState([
    {
      title: "Produced by *",
      type: "text",
      value: "",
      RegEx: /^[a-zA-Z0-9 .&'!$ÿÀ-ž/]+$/,
      validVal: true,
    },
    {
      title: "Album Name *",
      type: "text",
      value: "",
      RegEx: /^[a-zA-Z0-9 .&'!$ÿÀ-ž/]+$/,
      validVal: true,
    },
    {
      title: "Artist/s *",
      type: "text",
      value: "",
      RegEx: /^[a-zA-Z0-9 .&'!$ÿÀ-ž/]+$/,
      validVal: true,
    },
    {
      title: "Album Cover Link *",
      type: "text",
      value: "",
      RegEx: /https?:\/\/[^\s/$.?#].[^\s]*/g,
      validVal: true,
    },
  ]);
  const [isValidMetaData, setValidMetaData] = useState(false);
  // console.log("isValidMetaData ", isValidMetaData);
  const [btnHover, setBtnHover] = useState(false);

  function onDragEnter() {
    wrapperRef.current.classList.add("bg-gray-100");
  }

  function onDragLeave() {
    wrapperRef.current.classList.remove("bg-gray-100");
  }

  function onDrop() {
    wrapperRef.current.classList.remove("bg-gray-100");
  }

  function onFileDrop(e) {
    const newFile = e;
    if (newFile) {
      const updatedList = [...fileList, ...newFile];
      setFileList(updatedList);
    }
  }

  function removeFile(fileId) {
    const updatedList = [...fileList];
    updatedList.splice(fileId, 1);
    setFileList(updatedList);
  }

  return (
    <div className="h-[100vh] grid justify-items-center items-center overflow-auto p-[10px]">
      <MotionSpringAnimation
        className="min-w-[45%] bg-[#FFF] p-[40px] rounded-[10px]"
        style={{
          minWidth: "50%",
          background: "#FFF",
          padding: "40px",
          borderRadius: "10px",
        }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-cs font-bold text-[#DC143C]">Drop the Beat</h1>

          <button
            className="flex justify-center items-center p-[6px] bg-[#dc143c80] rounded-3xl sm:hover:pl-0 md:hover:pl-[75px] transition-all duration-200 font-medium relative text-[#fff]"
            onClick={() => navigate("/archive")}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >
            <IoChevronForward className="text-cs pl-[2px]" />
            {btnHover && (
              <p className="hidden md:block absolute left-[14px]">Archive</p>
            )}
          </button>
        </div>

        <div className="grid md:grid-cols-12 gap-[24px] px-[15px] py-[30px]">
          <label
            htmlFor="file"
            className="col-span-6 relative grid justify-items-center gap-[10px] cursor-pointer text-center px-[20px] py-[50px] rounded-[5px] border border-[#CDC8C833] hover:bg-[#f5f4f4]"
            ref={wrapperRef}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <img
              className="w-[15px] h-[20px]"
              src={uploadIcon}
              alt="uploadIcon"
            />

            <h3 className="text-sm font-bold">Drop files or folders here</h3>
            <p className="text-xs text-[#CDC8C8]">or</p>

            <button className="bg-none rounded-[3px] border border-[#CDC8C87F] px-[14px] py-[4px] text-xs font-semibold hover:bg-[#ffff] hover:shadow-1xl">
              <input
                className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                type="file"
                name="file"
                multiple="multiple"
                accept="audio/mpeg, audio/mp3"
                onChange={(e) => {
                  onFileDrop(e.target.files);
                }}
              />
              Browse
            </button>

            <p className="text-xs text-[#CDC8C8]">Maximum size: 5MB</p>
          </label>

          <div className="col-span-6 py-[10px]">
            <MetaDataComp
              metaDataInputs={metaDataInputs}
              setMetaDataInput={setMetaDataInput}
              setValidMetaData={setValidMetaData}
            />
          </div>
        </div>

        <AddedFileComp
          filesList={fileList}
          onFileRemove={removeFile}
          isValidMetaData={isValidMetaData}
          metaDataInputs={metaDataInputs}
        />

        <UploaderFooter />
      </MotionSpringAnimation>
    </div>
  );
}

export default Uploader;
