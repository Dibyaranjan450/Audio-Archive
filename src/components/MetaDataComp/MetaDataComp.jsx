import React from "react";

function MetaDataComp({ metaDataInputs, setMetaDataInput, setValidMetaData }) {
  function handleMetaData(id, value, regEx) {
    const isValidVal = regEx.test(value.trim());
    // console.log("isValidVal ", isValidVal);

    const newMetaDataArr = metaDataInputs.map((input, index) => ({
      ...input,
      value: index === id ? value : input.value,
      validVal: index === id ? isValidVal : input.validVal,
    }));
    setMetaDataInput(newMetaDataArr);

    const allValid = newMetaDataArr.every(
      (metaData) => metaData.validVal && metaData.value !== ""
    );
    setValidMetaData(allValid);
  }

  return (
    <>
      {metaDataInputs.map((metaData, index) => (
        <div
          key={index}
          className="relative w-full group pt-[22px] px-[5px] border-b transition hover:border-[#EF233C]"
        >
          <input
            className="w-full text-[20px] font-medium block bg-transparent border-0 appearance-none focus:outline-none outline-none peer transition-all ease-in-out duration-300"
            type={metaData.type}
            value={metaData.value}
            onChange={(e) =>
              handleMetaData(index, e.target.value, metaData.RegEx)
            }
          />

          <label
            className={`absolute top-[16px] left-[4px] font-medium ${
              metaData.validVal ? "text-[#888888]" : "text-[#EF233C]"
            } ${
              metaData.value ? "-translate-y-2 text-sm" : "text-[20px]"
            } peer-focus:-translate-y-2 peer-focus:text-sm pointer-events-none transition`}
          >
            {metaData.title}
          </label>
        </div>
      ))}
    </>
  );
}

export default MetaDataComp;
