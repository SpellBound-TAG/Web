import React from "react";
import Navbar from "./Navbar";

import GlobalStyle from "./Global";

function NavbarFinal(props) {
  return (
    <>
      <Navbar
        navbarState={props.navbarOpen}
        handleNavbar={props.handleNavbar}
      />
      <GlobalStyle />
    </>
  );
}

export default NavbarFinal;
