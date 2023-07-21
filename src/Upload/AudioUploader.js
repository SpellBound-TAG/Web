import React, { useState, useEffect } from "react";
import DragAndDrop from "./DragAndDrop";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Button } from "@mui/material";
import MusicPlayerSlider from "../MusicPlayer/MusicPlayer";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import MultipleSelectCheckmarks from "../Select";
import LinearBuffer from "../ProgressBar";

var a;
const AudioPlay = () => {
  const [buttonName, setButtonName] = useState("Play");
  const [audio, setAudio] = useState();
  const [file, setFile] = useState();
  const [progresspercent, setProgresspercent] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);
  const [options, setOptions] = useState();

  useEffect(() => {
    if (a) {
      a.pause();
      a = null;
      setButtonName("Play");
    }
    if (audio) {
      a = new Audio(audio);
      a.onended = () => {
        setButtonName("Play");
      };
    }
  }, [audio]);

  const handleClick = () => {
    if (buttonName === "Play") {
      a.play();
      setButtonName("Pause");
    } else {
      a.pause();
      setButtonName("Play");
    }
  };

  const addFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      // console.log("event", e);
      setAudio(URL.createObjectURL(e.target.files[0]));
    }
  };
  // console.log(file);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  const handleGetData = async () => {
    const docRef = doc(db, "Options", "choices");
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   // console.log(docSnap.data());
    //   setOptions(docSnap.data());
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    // }
    const unsub = onSnapshot(docRef, (doc) => {
      const data = doc.data().option;
      setOptions(data);
    });
  };

  const value = "rat";
  const name = "animals";

  const addValue = (event) => {
    event.preventDefault();
    if (options.hasOwnProperty(name) === false) {
      options[name] = [];
    }
    options[name].push(value);
    async function PushData() {
      try {
        const data = doc(db, "Options", "choices");
        const docRef = await updateDoc(data, { option: options });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    PushData();
  };

  return (
    <div>
      <input type="file" onChange={addFile} />
      <div style={{ margin: "5rem" }}>
        <DragAndDrop />
      </div>
      <button onClick={handleClick}>{buttonName}</button>
      <audio src={audio} controls></audio>
      <Button color="secondary" onClick={handleSubmit}>
        Submit
      </Button>
      {progresspercent === 100 ? (
        <Button onClick={handleGetData}> Show Options</Button>
      ) : null}
      {progresspercent === 100 ? (
        <Button onClick={addValue}> Add Value</Button>
      ) : null}
      {progresspercent > 0 && <LinearBuffer data={progresspercent} />}
      {/* {(options != undefined || options != null) && options.animals} */}
      {(options != undefined || options != null) &&
        Object.keys(options).map((e, i) => (
          <MultipleSelectCheckmarks key={i} data={options[e]} name={e} />
        ))}
      {/* <div>
        <MusicPlayerSlider />
      </div> */}
      {/* <form onSubmit={handleSubmit} className='form'>
        <input type='file' />
        <button type='submit'>Upload</button>
      </form>
      {
        !imgUrl &&
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
        </div>
      }
      {
        imgUrl &&
        <img src={imgUrl} alt='uploaded file' height={200} />
      } */}
    </div>
  );
};

export default AudioPlay;
