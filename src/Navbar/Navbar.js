import React from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import { Link } from "react-router-dom";
import Brand from "./Brand";
import BurgerMenu from "./BurgerMenu";
import CollapseMenu from "./CollapseMenu";
import { BsSlack } from "react-icons/bs";

const Navbar = (props) => {
  const barAnimation = useSpring({
    from: { transform: "translate3d(0, -10rem, 0)" },
    transform: "translate3d(0, 0, 0)",
  });

  const linkAnimation = useSpring({
    from: { transform: "translate3d(0, 30px, 0)", opacity: 0 },
    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    delay: 800,
    config: config.wobbly,
  });
  return (
    <>
      <NavBar style={barAnimation}>
        <FlexContainer>
          <Brand />

          <NavItems style={linkAnimation}>
            <NavLinks to="/">HOME</NavLinks>
            <NavLinks to="/contact">Contact</NavLinks>
            <NavLinks to="/resources">Resources</NavLinks>
          </NavItems>
          <BurgerWrapper>
            <BurgerMenu
              navbarState={props.navbarState}
              handleNavbar={props.handleNavbar}
            />
          </BurgerWrapper>
        </FlexContainer>
      </NavBar>
      <CollapseMenu
        navbarState={props.navbarState}
        handleNavbar={props.handleNavbar}
      />
    </>
  );
};

export default Navbar;

const NavBar = styled(animated.nav)`
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  background: #bad9e3;
  z-index: 999;
  font-size: 1.4rem;
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;
  z-index: 1;
  justify-content: space-between;
  height: 5rem;
`;

const NavItems = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  @media (min-width: 873px) and (max-width: 1340px) {
    font-size: 1vw;
  }

  @media (max-width: 873px) {
    display: none;
  }
`;

const NavLinks = styled(Link)`
  color: #fff;
  text-transform: uppercase;
  font-weight: 700;
  border-bottom: 1px solid transparent;
  margin: 0 1.5rem;
  transition: all 300ms linear 0s;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

const BurgerWrapper = styled.div`
  margin: auto 0;
  @media (min-width: 873px) {
    display: none;
  }
`;
