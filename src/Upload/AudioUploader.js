import React, { useState, useEffect } from "react";
import DragAndDrop from "./DragAndDrop";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Box, Button, Grid } from "@mui/material";
// import MusicPlayerSlider from "../MusicPlayer/MusicPlayer";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import MultipleSelectCheckmarks from "../Select";
import LinearBuffer from "../ProgressBar";
import { styled } from "styled-components";
import BgImg from "../images/rocket.jpg";
import Contact from "../Contact";

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
    const docRef = doc(db, "Options", "Choices");
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   // console.log(docSnap.data());
    //   setOptions(docSnap.data());
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    // }
    const unsub = onSnapshot(docRef, (doc) => {
      const data = doc.data();
      setOptions(data);
    });
  };

  console.log(options);

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
        const data = doc(db, "Options", "Choices");
        const docRef = await updateDoc(data, { option: options });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    PushData();
  };

  return (
    <UploadBody>
      <Box>
        <input type="file" onChange={addFile} />
        <div style={{ margin: "5rem" }}>
          <DragAndDrop />
        </div>
        <button onClick={handleClick}>{buttonName}</button>
        <audio src={audio} controls></audio>
      </Box>
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

      <Box sx={{ m: 20 }}>
        <Grid sx={{ flexGrow: 1 }} container spacing={4}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={10}>
              {(options != undefined || options != null) &&
                Object.keys(options).map((e, i) => (
                  <Grid item key={i}>
                    <MultipleSelectCheckmarks
                      key={i}
                      data={options[e]}
                      name={e}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
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
      {/* <Contact /> */}
    </UploadBody>
  );
};

export default AudioPlay;

const UploadBody = styled.div`
  background: url(${BgImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 150vh;

  @media screen and (max-width: 980px) {
    height: auto;
  }
`;

// const GridContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//   grid-gap: 20px;
// `;

// const GridItem = styled.div`
//   padding: 20px;
//   background-color: lightblue;
//   border: 1px solid #ccc;
// `;
