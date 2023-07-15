import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CustomizedDialogs from "./Dialog";
import { useNavigate } from "react-router-dom";

const mimeType = "audio/webm";
const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: "b0f22624fabc4353aeb56a2ffe877654",
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
});

const AudioRecorder = () => {
  const [permission, setPermission] = useState(false);

  const mediaRecorder = useRef(null);

  const [recordingStatus, setRecordingStatus] = useState("inactive");

  const [stream, setStream] = useState(null);

  const [audio, setAudio] = useState(null);

  const [audioChunks, setAudioChunks] = useState([]);
  const [audioFile, setAudioFile] = useState(null);

  const navigate = useNavigate();

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(mediaStream);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { type: mimeType });

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    let localAudioChunks = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = () => {
      const file = new File(audioChunks, "audio.mp3", {
        type: "audio/mp3",
        lastModified: Date.now(),
      });
      // console.log(file);
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);

      setAudio(audioUrl);
      setAudioFile(file);
      setAudioChunks([]);
    };
  };

  const [uploadURL, setUploadURL] = useState("");
  const [transcriptID, setTranscriptID] = useState("");
  const [transcriptData, setTranscriptData] = useState("");
  const [transcript, setTranscript] = useState("");

  // Upload the Audio File and retrieve the Upload URL
  useEffect(() => {
    if (audioFile) {
      assembly
        .post("/upload", audioFile)
        .then((res) => setUploadURL(res.data.upload_url))
        .catch((err) => console.error(err));
    }
  }, [audioFile]);

  // Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
  const submitTranscriptionHandler = () => {
    assembly
      .post("/transcript", {
        audio_url: uploadURL,
      })
      .then((res) => {
        setTranscriptID(res.data.id);
      })
      .catch((err) => console.error(err));
  };

  const checkStatusHandler = async () => {
    try {
      await assembly.get(`/transcript/${transcriptID}`).then((res) => {
        setTranscriptData(res.data);
        setTranscript(res.data.text);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const BackHandler = () => {
    navigate(-1);
  };
  console.log(transcriptData);
  console.log(transcriptID);
  console.log(transcript);

  return (
    <div>
      {/* <h2>Audio Recorder</h2> */}
      <main>
        <h1>Audio Recorder</h1>
        <div className="audio-controls">
          {!permission ? (
            <button onClick={getMicrophonePermission} type="button">
              Get Microphone
            </button>
          ) : null}
          {permission && recordingStatus === "inactive" ? (
            <button onClick={startRecording} type="button">
              Start Recording
            </button>
          ) : null}
          {recordingStatus === "recording" ? (
            <button onClick={stopRecording} type="button">
              Stop Recording
            </button>
          ) : null}
          <Button
            variant="contained"
            onClick={submitTranscriptionHandler}
            style={{ margin: "5px" }}
          >
            SUBMIT
          </Button>
          <Button
            variant="contained"
            onClick={checkStatusHandler}
            style={{ margin: "5px" }}
          >
            CHECK STATUS
          </Button>
        </div>
        {audio ? (
          <div className="audio-player">
            <audio src={audio} controls></audio>
            <a download href={audio}>
              Download Recording
            </a>
          </div>
        ) : null}
        {transcriptData.status === "completed" ? (
          // <p style={{ color: "green" }}>Transcribed Text : {transcript}</p>
          <CustomizedDialogs data={transcript} />
        ) : (
          <p>
            <span>Status : </span>
            {transcriptData.status}
          </p>
        )}
        <Button
          variant="contained"
          onClick={BackHandler}
          style={{ margin: "5px" }}
        >
          Go Back
        </Button>
      </main>
    </div>
  );
};

export default AudioRecorder;
