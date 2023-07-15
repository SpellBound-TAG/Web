// import React from "react";
// import styled from "styled-components";
// import { FaFacebook, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
// import { IconContext } from "react-icons/lib";
// import Forms from "./Forms";
// import {
//   createMuiTheme,
//   makeStyles,
//   responsiveFontSizes,
//   ThemeProvider,
// } from "@material-ui/core/styles";
// import { Typography } from "@material-ui/core";

// let theme = createMuiTheme();
// theme = responsiveFontSizes(theme);

// const useStyles = makeStyles((theme) => ({
//   Heading: {
//     color: "#fff",
//     fontFamily: "Courier New",
//     fontWeight: "700",
//     textAlign: "center",
//     paddingTop: "2%",
//     marginTop: "5%",
//     marginBottom: "2%",
//     textShadow: "1px 2px 3px rgba(0, 0, 0, 0.9)",
//     animation: `$myEffect 2000ms ${theme.transitions.easing.easeInOut}`,
//     "@media (max-width:1100px)": {
//       marginTop: "50px",
//     },
//   },
//   "@keyframes myEffect": {
//     "0%": {
//       opacity: 0,
//       transform: "translateY(-200%) ",
//     },
//     "50%": {
//       opacity: 0.5,
//     },
//     "100%": {
//       opacity: 1,
//       transform: "translateY(0) ",
//     },
//   },
// }));

// export default function Contacts() {
//   const classes = useStyles();

//   return (
//     <Styles>
//       <ThemeProvider theme={theme}>
//         <Typography variant="h1" className={classes.Heading}>
//           Contact Us
//         </Typography>
//       </ThemeProvider>

//       <div id="contact-container">
//         {/* <div className="contact-info">
//           <h4>Contact Information</h4>
//           <p>Fill up the form and Click Send</p>

//           <div className="icon-text">
//             <i className="fa fa-phone" aria-hidden="true" />
//             <span>2377279239812</span>
//           </div>

//           <div className="icon-text">
//             <i className="fa fa-envelope" aria-hidden="true"></i>
//             <span>someone@gmail.com</span>
//           </div>

//           <div className="icon-text">
//             <i className="fa fa-map-marker" aria-hidden="true" />
//             <span>1238,somewhere, someState,SomeCountry</span>
//           </div>

//           <div className="social-media">
//             <IconContext.Provider
//               value={{
//                 color: "blue",
//                 size: "30px",
//                 style: { verticalAlign: "middle" },
//               }}
//             >
//               <a
//                 href="https://www.google.com"
//                 alt="icon"
//                 className="icon-circle"
//               >
//                 <FaFacebook />
//               </a>
//             </IconContext.Provider>

//             <IconContext.Provider
//               value={{
//                 color: "#1DA1F2",
//                 size: "30px",
//                 style: { verticalAlign: "middle" },
//               }}
//             >
//               <a
//                 href="https://www.google.com"
//                 alt="icon"
//                 className="icon-circle"
//               >
//                 <FaTwitterSquare />
//               </a>
//             </IconContext.Provider>

//             <IconContext.Provider
//               value={{
//                 color: "#0077b5",
//                 size: "30px",
//                 style: { verticalAlign: "middle" },
//               }}
//             >
//               <a
//                 href="https://www.google.com"
//                 alt="icon"
//                 className="icon-circle"
//               >
//                 <FaLinkedin />
//               </a>
//             </IconContext.Provider>
//           </div>
//         </div> */}
//         <Forms />
//       </div>
//     </Styles>
//   );
// }

// //https://images.pexels.com/photos/4175070/pexels-photo-4175070.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
// //https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
// //https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
// //https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
// //https://images.pexels.com/photos/50570/sandstone-the-wave-rock-nature-50570.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
// //https://images.pexels.com/photos/1292241/pexels-photo-1292241.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500

// const Styles = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-image: url("../images/contact.jpeg");
//   background-size: cover;
//   margin: 0px;
//   padding: 0px;

//   @media screen and (max-width: 980px) {
//     height: auto;
//   }

//   .sub-title {
//     color: white;
//     text-align: center;
//     font-size: 30px;
//     margin-bottom: 40px;
//   }

//   #contact-container {
//     width: 1200px;
//     border-radius: 15px;
//     overflow: hidden;
//     padding: 15px;
//     display: flex;
//     -webkit-backdrop-filter: blur(100px);
//     -moz-backdrop-filter: blur(100px);
//     backdrop-filter: blur(100px);
//     border: 2px solid rgba(255, 255, 255, 0.3);
//     box-shadow: 0px 10px 33px 0px rgba(0, 0, 0, 0.75);

//     @media screen and (max-width: 1080px) {
//       flex-direction: column;
//       width: 90%;
//       height: auto;
//       margin-bottom: 50px;
//     }
//   }

//   #contact-container .contact-info {
//     flex: 0 1 35%;
//     background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
//     border-radius: 15px;
//     padding: 40px;
//     color: white;
//     display: flex;
//     flex-direction: column;
//     @media screen and (max-width: 990px) {
//       height: auto;
//     }
//   }

//   .contact-info h4 {
//     font-size: 35px;
//     font-weight: 500;
//     margin-top: 0;
//     color: #000;
//     @media screen and (max-width: 990px) {
//       font-size: 25px;
//       margin-top: -30px;
//       text-align: center;
//     }
//   }

//   .contact-info p {
//     font-size: 20px;
//     color: rgba(255, 255, 255, 0.7);
//     font-weight: 300;
//     margin-bottom: 32px;
//     color: #0077;
//     @media screen and (max-width: 990px) {
//       font-size: 15px;
//       text-align: center;
//     }
//   }

//   .contact-info .icon-text {
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     line-height: 50px;
//     @media screen and (max-width: 990px) {
//       line-height: 20px;
//     }
//   }

//   .contact-info .icon-text .fa {
//     font-size: 25px;
//     margin-right: 32px;
//     flex: 0 1 40px;
//     cursor: pointer;
//     @media screen and (max-width: 990px) {
//       font-size: 15px;
//       justify-content: center;
//       margin-left: 30%;
//     }
//   }

//   .contact-info .icon-text .fa-phone {
//     color: #f26522;
//   }

//   .fa-envelope {
//     color: #ed1811;
//   }

//   .fa-map-marker {
//     color: #f3b604;
//   }

//   .contact-info .icon-text span {
//     font-size: 13px;
//     font-weight: 300;
//     color: #000;
//     @media screen and (max-width: 990px) {
//       font-size: 10px;
//       word-wrap: wrap;
//     }
//   }

//   .contact-info .social-media {
//     display: flex;
//     width: 70%;
//     height: 100%;
//     justify-content: space-between;
//     align-items: flex-end;
//     @media screen and (max-width: 990px) {
//       margin-top: 15px;
//       width: 40%;
//       align-self: center;
//     }
//   }

//   .contact-info .social-media .icon-circle {
//     flex: 0 1 20%;
//     justify-content: center;
//     align-items: center;
//     display: flex;
//     height: 40px;
//     border-radius: 50%;
//     transition: 0.2s all ease-in-out;
//     &:hover {
//       transform: scale(1.5);
//     }
//   }
// `;
