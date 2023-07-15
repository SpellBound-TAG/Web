import { purple } from "@material-ui/core/colors";
import { Button } from "@mui/material";
import { toBePartiallyChecked } from "@testing-library/jest-dom/matchers";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Split from "react-split";

function Choice() {
  const navigate = useNavigate();
  const handleUpload = () => {
    navigate("/upload");
  };

  const handleRecord = () => {
    navigate("/record");
  };
  return (
    // <Split
    //   style={{
    //     display: "flex",
    //     flexDirection: "row",
    //     height: "100vh",
    //     width: "100vh",
    //   }}
    //   sizes={[60, 60]}
    //   minSize={10}
    //   expandToMin={false}
    //   gutterSize={0}
    //   gutterAlign="center"
    //   snapOffset={0}
    //   dragInterval={1}
    //   direction="horizontal"
    //   cursor="col-resize"
    // >
    //   <div style={{ backgroundColor: "purple" }}>1</div>
    //   <div style={{ backgroundColor: "red", textAlign: "center" }}>2</div>
    // </Split>
    <div>
      <Button variant="contained" color="secondary" onClick={handleUpload}>
        {" "}
        Upload Audio File
      </Button>
      <Button variant="contained" color="primary" onClick={handleRecord}>
        Record Audio
      </Button>
    </div>
  );
}

export default Choice;
