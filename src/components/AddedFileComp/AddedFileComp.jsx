import UploadButton from "../UploadButton/UploadButton";
import MotionSpringAnimation, {
  MotionLoaderAnimation,
} from "../MotionSpringAnimation/MotionSpringAnimation";
import closeIcon from "../../assets/close_cross_icon.png";

function AddedFileComp({
  filesList,
  onFileRemove,
  isValidMetaData,
  metaDataInputs,
}) {
  return (
    <div className="grid justify-items-center gap-[28px]">
      <div className="max-h-[134px] w-full overflow-auto grid md:grid-cols-6 px-[15px] gap-[15px]">
        {filesList.map((file, index) => (
          <div key={index} className="col-span-2">
            <MotionSpringAnimation>
              <div className="p-[10px] grid gap-[15px] bg-[#E5E4E266] rounded-[5px]">
                <p className="flex justify-between items-center gap-[25px] text-xs font-bold">
                  {file.name.length > 25
                    ? file.name.slice(0, 25) + "..."
                    : file.name}
                  <img
                    className="h-[15px] w-[15px] cursor-pointer"
                    src={closeIcon}
                    alt="closeIcon"
                    onClick={() => {
                      onFileRemove(index);
                    }}
                  />
                </p>

                <div className="h-[3px] bg-[#CDC8C880] rounded-sm">
                  <MotionLoaderAnimation
                    style={{
                      height: "3px",
                      background: "#DC143C",
                      borderRadius: "2px",
                    }}
                  />
                </div>
              </div>
            </MotionSpringAnimation>
          </div>
        ))}
      </div>

      {filesList.length ? (
        <UploadButton
          filesList={filesList}
          isValidMetaData={isValidMetaData}
          metaDataInputs={metaDataInputs}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default AddedFileComp;
