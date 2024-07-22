import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Uploader from "./pages/Uploader/Uploader";
import Archive from "./pages/Archive/Archive";
import { fetchArchiveData } from "./server/server";
import localAudioTrackArr from "./utils/constant";

function App() {
  const [getArchiveData, setArchiveData] = useState([]);
  // console.log("getArchiveData ", getArchiveData);

  useEffect(() => {
    (async () => {
      setArchiveData([...(await fetchArchiveData()), ...localAudioTrackArr]);
    })();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Uploader />} />
          <Route
            path="/archive"
            element={<Archive audioTrackArr={getArchiveData} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
