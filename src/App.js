import "./App.css";
import { useState } from "react";
import AudioRecorder from "./Record/AudioRecorder";
import UserData from "./UserDetails/UserData";
import { Route, Routes } from "react-router-dom";
import Choice from "./Choose/Choice";
import AudioPlay from "./Upload/AudioUploader";
import CollapseMenu from "./HomePage/Permission";
import PredictionForm from "./PredictionDemo";
import NavbarFinal from "./Navbar";

import Final from "./SignUp/Final";

const App = () => {
  const [navbarOpen, setnavbarOpen] = useState(false);
  const handleNavbar = () => {
    setnavbarOpen(!navbarOpen);
  };

  return (
    <div>
      {/* <div className="button-flex">
        <button onClick={toggleRecordOption("audio")}>Record Audio</button>
      </div> */}
      <div>
        <NavbarFinal navbarOpen={navbarOpen} handleNavbar={handleNavbar} />
        <Routes>
          <Route exact path="/" element={<CollapseMenu />} />
          <Route path="signup" element={<Final />} />
          <Route path="/user" element={<UserData />} />
          <Route path="/choice" element={<Choice />} />
          <Route path="/upload" element={<AudioPlay />} />
          <Route path="/record" element={<AudioRecorder />} />
          <Route path="/predict" element={<PredictionForm />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
