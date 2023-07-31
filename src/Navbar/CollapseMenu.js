import React from "react";
import styled from "styled-components";

import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

const CollapseMenu = (props) => {
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 });

  const handleClick = () => {
    props.handleNavbar(!open);
  };

  if (props.navbarState === true) {
    return (
      <CollapseWrapper
        style={{
          transform: open
            .interpolate({
              range: [0, 0.2, 0.3, 1],
              output: [0, -20, 0, -200],
            })
            .interpolate((openValue) => `translate3d(0, ${openValue}px, 0`),
        }}
      >
        <NavItems>
          <NavLinks to="/" onClick={handleClick}>
            Home
          </NavLinks>

          <NavLinks to="/contact" onClick={handleClick}>
            Contact
          </NavLinks>

          <NavLinks to="/resources" onClick={handleClick}>
            Resources
          </NavLinks>
        </NavItems>
      </CollapseWrapper>
    );
  }
  return null;
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1) 0%,
      rgba(0, 0, 0, 0.15) 100%
    ),
    radial-gradient(
        at top left,
        rgba(255, 55, 5, 1) 0%,
        rgba(0, 88, 206, 1) 120%
      )
      #989898;

  background-blend-mode: multiply, multiply;

  height: 100%;
  overflow: auto;
  position: fixed;
  z-index: 999;
  top: 4.5rem;
  left: 0;
  right: 0;
  @media (min-width: 873px) {
    display: none;
  }
`;

const NavItems = styled.ul`
  list-style-type: none;
  padding: 4rem 1rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & li {
    transition: all 300ms linear 0s;
  }

  & a {
    font-size: 2rem;
    line-height: 8;
    color: #000;
    text-transform: uppercase;
    text-decoration: none !important;
    cursor: pointer;
    transition: all 0.3s ease-out;

    &:hover {
      color: #4facfe;
      font-size: 2.5rem;
    }
  }
`;
const NavLinks = styled(Link)`
  color: #fff;
  text-transform: uppercase;
  outline: none;
  font-weight: 600;
  border-bottom: 1px solid transparent;
  margin: 0 1.5rem;
  transition: all 300ms linear 0s;
  text-decoration: none !important;
  cursor: pointer;
`;
