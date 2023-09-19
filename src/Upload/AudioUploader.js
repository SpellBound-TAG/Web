import React, { useState, useEffect, useRef } from "react";
import DragAndDrop from "./DragAndDrop";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Box, Button, ButtonBase, Grid } from "@mui/material";
// import MusicPlayerSlider from "../MusicPlayer/MusicPlayer";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import MultipleSelectCheckmarks from "../Select";
import LinearBuffer from "../ProgressBar";
import { styled } from "styled-components";
import BgImg from "../images/rocket.jpg";
import Contact from "../Contact";
import SendIcon from "@mui/icons-material/Send";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

var a;
const AudioPlay = () => {
  const [buttonName, setButtonName] = useState("Play");
  const [audio, setAudio] = useState();
  const [file, setFile] = useState();
  const [progresspercent, setProgresspercent] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);
  const [options, setOptions] = useState();
  const [selectedValues, setSelectedValues] = React.useState({});
  const [docId, setDocId] = useState();
  const [currentTime, setCurrentTime] = useState();
  const audioRef = useRef();

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

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

  // Function to check if a file is an audio file
  const isAudioFile = (file) => {
    const acceptedAudioTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/ogg" /* Add more audio types as needed */,
    ];
    return acceptedAudioTypes.includes(file.type);
  };

  const addFile = (e) => {
    const file = e.target.files[0];
    if (file && isAudioFile(file)) {
      setFile(file);
      // console.log("event", e);
      setAudio(URL.createObjectURL(file));
    } else {
      alert("Please Select an MP3 file");
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
        toast.error("Something went Wrong! Try Again", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );

    toast.success("Upload Successfull !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    handleGetData();
  };

  const handleChoice = async (e) => {
    e.preventDefault();
    try {
      const data = collection(db, "LabeledData");
      const docRef = await addDoc(data, {
        created: serverTimestamp(),
        choices: selectedValues,
        AudioURL: imgUrl,
        AudioTime: currentTime,
      });
      setDocId(docRef.id);
      toast.success("Choices Submitted !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Submit Choices Again", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
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

  // const addValue = (event) => {
  //   event.preventDefault();
  //   if (options.hasOwnProperty(name) === false) {
  //     options[name] = [];
  //   }
  //   options[name].push(value);
  //   async function PushData() {
  //     try {
  //       const data = doc(db, "Options", "Choices");
  //       const docRef = await updateDoc(data, { option: options });
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  //   }
  //   PushData();
  //};

  return (
    <UploadBody>
      <ToastContainer />
      <h3>Upload an Audio File and Annotate till the time selected.</h3>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <input
          style={{ color: "red", background: "lightyellow" }}
          type="file"
          accept="audio/*"
          onChange={addFile}
        />
        <DragDiv>
          <DragAndDrop />
        </DragDiv>
        <Box>
          <audio
            src={audio}
            controls
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
          ></audio>
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClick}
            style={{ fontWeight: "bold", fontSize: "1.2rem" }}
          >
            {buttonName}
          </Button>
        </Box>

        <Box display="flex" justifyContent="center">
          <Button
            color="primary"
            variant="contained"
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              margin: "1rem",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
      {/* {progresspercent === 100 ? (
        <Button onClick={addValue}> Add Value</Button>
      ) : null} */}
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
                      options={selectedValues}
                      handleOptions={setSelectedValues}
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

      {progresspercent === 100 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            size="large"
            endIcon={<SendIcon />}
            onClick={handleChoice}
          >
            Submit Choices
          </Button>
        </div>
      ) : null}
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
  height: auto;

  @media screen and (max-width: 980px) {
    height: auto;
  }
`;

const DragDiv = styled.div`
  margin: 5rem 25rem;
  border: 5px dotted #000;
  width: 50%;
  height: 10rem;
  text-align: center;
  padding: 50px;
`;

const AudioDiv = styled.div``;

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
