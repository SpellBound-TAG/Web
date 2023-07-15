import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";
import {
  createTheme,
  makeStyles,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
// import Box from "@mui/material/Box";
import BgImg from "../images/flower.jpg";

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

let theme = createTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  Heading: {
    color: "#fff",
    fontFamily: "Courier New",
    fontWeight: "700",
    textAlign: "center",
    paddingTop: "2%",
    marginTop: "5%",
    marginBottom: "2%",
    textShadow: "1px 2px 3px rgba(0, 0, 0, 0.9)",
    animation: `$myEffect 2000ms ${theme.transitions.easing.easeInOut}`,
    "@media (max-width:1100px)": {
      marginTop: "50px",
    },
  },
  "@keyframes myEffect": {
    "0%": {
      opacity: 0,
      transform: "translateY(-200%) ",
    },
    "50%": {
      opacity: 0.5,
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0) ",
    },
  },
}));

const borderText = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flex: "1 1 60%",
    marginLeft: 30,

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "orange",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
        color: "red",
      },
    },
  },

  text: {
    color: "#000",
  },
}));

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export default function UserData() {
  const classes = useStyles();
  const bor = borderText();
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  const [submit, setSubmit] = useState(false);
  // const [gender, setGender] = useState("None");
  // const [age, setAge] = useState("");
  //   const { width, height } = useWindowSize();
  //   const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: 20,
    gender: "",
  });

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    console.log(userDetails);
    try {
      const data = collection(db, "users");
      const docRef = await addDoc(data, {
        created: serverTimestamp(),
        userDetails: userDetails,
      });
      // console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  function nextPage(event) {
    event.preventDefault();
    navigate("/choice");
  }
  return (
    <Styles>
      <ThemeProvider theme={theme}>
        <Typography variant="h2" className={classes.Heading}>
          User Details
        </Typography>
      </ThemeProvider>
      {/* <div style={{ margin: "15rem" }}> */}
      {submit && <Confetti width={1600} height={1000} />}
      {/* <h2>Register Form</h2> */}
      <form
        onSubmit={handleSubmit}
        action={<Link to="/user" />}
        className={bor.root}
      >
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            name="firstName"
            type="text"
            variant="outlined"
            color="secondary"
            label="First Name"
            onChange={handleChange}
            value={userDetails.firstName}
            fullWidth
            required
          />
          <TextField
            name="lastName"
            type="text"
            variant="outlined"
            color="secondary"
            label="Last Name"
            onChange={handleChange}
            value={userDetails.lastName}
            fullWidth
            required
          />
        </Stack>
        <TextField
          name="email"
          type="email"
          variant="outlined"
          color="secondary"
          label="Email"
          onChange={handleChange}
          value={userDetails.email}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        {/* <TextField
          type="date"
          variant="outlined"
          color="secondary"
          label="Date of Birth"
          onChange={handleChange}
          value={userDetails.dob}
          name="dob"
          fullWidth
          required
          sx={{ mb: 4 }}
          InputLabelProps={{ shrink: true }}
        /> */}
        <Typography id="input-slider" gutterBottom classes={bor.text}>
          Age
        </Typography>
        <PrettoSlider
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={userDetails.dob}
          onChange={handleChange}
          name="dob"
        />
        <FormControl sx={{ m: 1 }} fullWidth>
          <TextField
            value={userDetails.gender}
            label="Gender"
            name="gender"
            select
            onChange={handleChange}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </TextField>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<SendIcon />}
          size="large"
          style={{ margin: "5%" }}
        >
          Submit
        </Button>
      </form>

      <IconButton
        size="large"
        style={{ margin: "5rem" }}
        color="secondary"
        onClick={nextPage}
      >
        {submit && <ArrowForwardIosIcon fontSize="large" />}
      </IconButton>
    </Styles>
  );
}

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${BgImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;

  @media screen and (max-width: 980px) {
    height: auto;
  }
`;
