import "./App.css";
import { useState } from "react";
import AudioRecorder from "./Record/AudioRecorder";
import UserData from "./UserDetails/UserData";
import { Route, Routes } from "react-router-dom";
import Choice from "./Choose/Choice";
// import Contacts from "./Contacts";
import AudioPlay from "./Upload/AudioUploader";
import CollapseMenu from "./HomePage/Permission";
import PredictionForm from "./PredictionDemo";

const App = () => {
  let [recordOption, setRecordOption] = useState("video");

  const toggleRecordOption = (type) => {
    return () => {
      setRecordOption(type);
    };
  };

  return (
    <div>
      {/* <div className="button-flex">
        <button onClick={toggleRecordOption("audio")}>Record Audio</button>
      </div> */}
      <div>
        <Routes>
          <Route exact path="/" element={<CollapseMenu />} />
          <Route path="/user" element={<UserData />} />
          <Route path="/choice" element={<Choice />} />
          <Route path="/upload" element={<AudioPlay />} />
          <Route path="/record" element={<AudioRecorder />} />
          <Route path="/predict" element={<PredictionForm />} />
          {/* <Route path="/contact" element={<Contacts />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
