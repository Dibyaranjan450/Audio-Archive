import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { welcomeLog } from "../utils/welcomLog";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MSGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREID,
};
welcomeLog();

////// Initialize Firebase //////
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

async function getDownloadedAudioURL(file) {
  console.log(file);
  const fileRef = storageRef(storage, "/" + file.name);

  try {
    ////// Upload the file //////
    const snapshot = await uploadBytes(fileRef, file);

    ////// Get the download URL //////
    const fileURL = await getDownloadURL(snapshot.ref);

    return fileURL;
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
}

function getAudioTitle(titleString) {
  const regex = /^(.*?)\s*-\s*(.*)\.mp3$/;
  const match = titleString.match(regex);

  if (match) {
    return match[2];
  } else {
    return titleString.replace(/\.mp3$/, "");
  }
}

function getArtistName(titleString) {
  const regex = /^(.+?)(?=\s*-\s*|(?=\s*and\s)|(?=\s*–\s*))/i;
  const match = titleString.match(regex);

  return match ? match[1].trim() : null;
}

async function storeAudioData(uploadData, setLoading) {
  uploadData.title = getAudioTitle(uploadData.audioFile.name);
  // uploadData.performedBy = getArtistName(uploadData.audioFile.name);

  ////// Adding downloaded audio URL from Firebase Storage //////
  uploadData.audioFile = await getDownloadedAudioURL(uploadData.audioFile);

  // console.log("uploadData ", uploadData);

  try {
    await setDoc(doc(db, "audioArchive", `${uploadData.uuid}`), uploadData);
    console.log("File is successfully uploaded!");
    setLoading(false);
    window.location.assign("/archive");
  } catch (e) {
    console.error("Error writing document: ", e);
  }
}

async function fetchArchiveData() {
  const querySnapshot = await getDocs(collection(db, "audioArchive"));
  const archiveDataArr = [];

  querySnapshot.forEach((doc) => {
    // console.log(doc.id, doc.data());
    archiveDataArr.push(doc.data());
  });

  return archiveDataArr;
}

export { storeAudioData, fetchArchiveData };
