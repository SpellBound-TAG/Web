// import React, { useState } from "react";
// import TextField from "@material-ui/core/TextField";
// import { makeStyles, withStyles } from "@material-ui/core/styles";
// import { Button } from "@material-ui/core";
// import clsx from "clsx";
// import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// import { purple } from "@material-ui/core/colors";
// import SendIcon from "@mui/icons-material/Send";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     justifyContent: "center",
//     flexDirection: "column",
//     flex: "1 1 60%",
//     marginLeft: 30,

//     "& .MuiTextField-root": {
//       margin: theme.spacing(5),
//       width: 250,
//       "@media (max-width:990px)": {
//         margin: theme.spacing(1),
//         width: "auto",
//       },
//     },
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderColor: "orange",
//       },
//       "&:hover fieldset": {
//         borderColor: "yellow",
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "green",
//         color: "red",
//       },
//     },
//   },

//   textarea: {
//     resize: "both",
//   },
//   validationForm: {
//     width: "25ch",
//   },

//   customLabel: {
//     fontSize: "1.1rem",
//     color: "#ebcb2a",
//   },
//   customInput: {
//     fontSize: "1.5rem",
//     lineHeight: "16px",
//     fontWeight: 500,
//   },
//   SubmitButton: {
//     width: "150px",
//     height: "50px",
//     fontSize: "1.5rem",
//   },
//   ButtonDiv: {
//     width: "100%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontFamily: "Courier New",
//     fontWeight: 700,
//   },
// }));

// const ColorButton = withStyles((theme) => ({
//   root: {
//     color: theme.palette.getContrastText(purple[500]),
//     backgroundColor: purple[500],
//     "&:hover": {
//       backgroundColor: purple[700],
//     },
//   },
// }))(Button);

// export default function Forms() {
//   const classes = useStyles();

//   // userDetails Contain the values.
//   const [userDetails, setUserDetails] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     dob: "",
//     gender: "",
//   });

//   const handleChange = (event) => {
//     setUserDetails({
//       ...userDetails,
//       [event.target.name]: event.target.value,
//     });
//   };

//   // connect it to a server/firebase in this function. Firebase docs are attached. remove the console log.
//   const handleSubmit = () => {
//     console.log(userDetails);
//   };

//   return (
//     <form className={classes.root} noValidate autoComplete="off">
//       <div>
//         <TextField
//           required
//           name="firstName"
//           onChange={handleChange}
//           value={userDetails.firstName}
//           autoComplete="off"
//           id="outlined-required"
//           label="First Name"
//           placeholder="Enter First Name"
//           variant="outlined"
//           style={{ fontSize: "1.5rem" }}
//         />

//         <TextField
//           required
//           onChange={handleChange}
//           name="lastName"
//           value={userDetails.lastName}
//           autoComplete="off"
//           id="outlined-required"
//           label="Last Name"
//           type="text"
//           placeholder="Enter Last Name"
//           variant="outlined"
//           style={{ fontSize: "1.5rem" }}
//         />

//         <ValidatorForm onChange={handleChange}>
//           <TextValidator
//             required
//             fullWidth
//             name="email"
//             value={userDetails.email}
//             autoComplete="off"
//             id="outlined-full-width"
//             label="Email"
//             placeholder="Enter Email Address"
//             variant="outlined"
//             validators={["required", "isEmail"]}
//             errorMessages={
//               ("This field is required", "Enter a valid Email Address")
//             }
//             style={{ width: 500, fontSize: "2rem" }}
//           />
//         </ValidatorForm>

//         <TextField
//           type="date"
//           variant="outlined"
//           color="secondary"
//           label="Date of Birth"
//           onChange={handleChange}
//           value={userDetails.dob}
//           fullWidth
//           required
//           sx={{ mb: 4 }}
//           InputLabelProps={{ shrink: true }}
//         />
//         {/* <TextField
//           type="text"
//           variant="outlined"
//           color="secondary"
//           label="Gender"
//           onChange={handleChange}
//           value={userDetails.gender}
//           fullWidth
//           required
//         /> */}

//         <Select
//           value={userDetails.gender}
//           label="Age"
//           onChange={handleChange}
//           style={{ fontSize: "1.5rem", width: "10%" }}
//           required
//         >
//           <MenuItem value={"Male"}>Male</MenuItem>
//           <MenuItem value={"Female"}>Female</MenuItem>
//           <MenuItem value={"Other"}>Other</MenuItem>
//         </Select>

//         {/* <TextField
//           name="phone"
//           onChange={handleChange}
//           value={userDetails.phone}
//           autoComplete="off"
//           id="outlined-required"
//           label="Phone Number"
//           placeholder="Enter Phone Number"
//           variant="outlined"
//           InputProps={{ classes: { input: classes.customInput } }}
//           InputLabelProps={{ classes: { root: classes.customLabel } }}
//           style={{ fontSize: "1.5rem" }}
//         /> */}

//         {/* <TextField
//           name="comments"
//           onChange={handleChange}
//           value={userDetails.comments}
//           id="outlined-textarea"
//           label="Comments"
//           multiline
//           placeholder="Any Comments"
//           variant="outlined"
//           InputProps={{
//             classes: { input: clsx(classes.customInput, classes.textarea) },
//           }}
//           InputLabelProps={{ classes: { root: classes.customLabel } }}
//           style={{ fontSize: "1.5rem" }}
//         /> */}

//         <div className={classes.ButtonDiv}>
//           <ColorButton
//             variant="contained"
//             onClick={handleSubmit}
//             classes={{ root: classes.SubmitButton }}
//             color="primary"
//             type="submit"
//             endIcon={<SendIcon />}
//             size="medium"
//           >
//             Submit
//           </ColorButton>
//         </div>
//       </div>
//     </form>
//   );
// }
