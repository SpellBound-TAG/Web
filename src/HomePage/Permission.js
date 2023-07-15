import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import imgHome from "../images/universe.jpg";
import imgPerm from "../images/lockWall.jpg";
import { styled } from "styled-components";
import AnimatedTitle from "./AnimatedText";
import { HeartSwitch } from "@anatoliygatt/heart-switch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Margin } from "@mui/icons-material";

const AnimFeTurbulence = animated("feTurbulence");
const AnimFeDisplacementMap = animated("feDisplacementMap");

export default function Welcome() {
  const navigate = useNavigate();
  const [open, toggle] = useState(false);
  const [checked, setChecked] = useState(false);
  const [{ freq, factor, scale, opacity }] = useSpring(
    () => ({
      reverse: open,
      from: { factor: 10, opacity: 0, scale: 0.9, freq: "0.0175, 0.0" },
      to: { factor: 150, opacity: 1, scale: 1, freq: "0.0, 0.0" },
      config: { duration: 1500 },
    }),
    [open]
  );

  function nextPage(event) {
    event.preventDefault();
    navigate("/user");
  }

  useEffect(() => {
    if (checked) {
      toast.success("You're sooo Helpful !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [checked]);

  return (
    <BodyDiv>
      {checked && <ToastContainer />}
      <IntroDiv>
        <SVG style={{ scale, opacity }} viewBox="0 0 1278 446">
          <defs>
            <filter id="water">
              <AnimFeTurbulence
                type="fractalNoise"
                baseFrequency={freq}
                numOctaves="2"
                result="TURB"
                seed="8"
              />
              <AnimFeDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                in="SourceGraphic"
                in2="TURB"
                result="DISP"
                scale={factor}
              />
            </filter>
          </defs>
          <g filter="url(#water)">
            <path
              d="M 227.783 16.479 L 227.783 27.222 L 212.524 30.151 L 174.316 188.232 L 156.006 188.232 L 114.258 49.683 L 73.364 188.232 L 55.298 188.232 L 14.526 30.151 L 0 27.222 L 0 16.479 L 57.251 16.479 L 57.251 27.222 L 42.358 28.687 A 3.563 3.563 0 0 0 41.017 29.115 Q 39.551 29.967 39.551 32.349 Q 39.551 32.688 39.76 33.55 A 21.221 21.221 0 0 0 39.795 33.691 L 69.58 146.484 L 108.765 16.479 L 128.052 16.479 L 168.335 150.513 L 196.045 33.691 Q 196.139 33.504 196.16 33.101 A 4.911 4.911 0 0 0 196.167 32.837 Q 196.167 29.664 193.592 28.894 A 5.815 5.815 0 0 0 192.505 28.687 L 176.758 27.222 L 176.758 16.479 L 227.783 16.479 Z M 886.597 174.438 L 886.597 184.204 L 830.566 184.204 L 830.566 174.438 L 841.064 173.706 Q 845.401 173.404 846.155 169.852 A 7.899 7.899 0 0 0 846.313 168.213 L 846.313 104.492 Q 846.313 95.764 843.582 89.664 A 23.084 23.084 0 0 0 841.492 85.938 A 14.628 14.628 0 0 0 834.493 80.625 Q 831.951 79.648 828.762 79.251 A 37.825 37.825 0 0 0 824.097 78.979 A 45.909 45.909 0 0 0 817.581 79.468 Q 814.285 79.941 810.716 80.872 A 72.972 72.972 0 0 0 810.486 80.933 A 68.442 68.442 0 0 0 802.901 83.397 A 53.651 53.651 0 0 0 797.363 85.938 L 797.363 168.213 Q 797.363 172.455 800.957 173.438 A 8.531 8.531 0 0 0 802.612 173.706 L 813.11 174.438 L 813.11 184.204 L 758.301 184.204 L 758.301 174.438 L 768.799 173.706 Q 773.135 173.404 773.889 169.852 A 7.899 7.899 0 0 0 774.048 168.213 L 774.048 102.905 Q 774.048 93.537 770.153 87.256 A 21.864 21.864 0 0 0 769.043 85.632 A 15.292 15.292 0 0 0 761.796 80.454 Q 757.706 78.979 752.075 78.979 A 46.827 46.827 0 0 0 742.286 80.054 A 57.355 57.355 0 0 0 737.305 81.36 Q 729.965 83.632 725.739 85.959 A 28.843 28.843 0 0 0 725.342 86.182 L 725.342 168.213 Q 725.342 172.455 728.935 173.438 A 8.531 8.531 0 0 0 730.591 173.706 L 741.089 174.438 L 741.089 184.204 L 684.57 184.204 L 684.57 174.438 L 696.777 173.706 Q 701.114 173.404 701.868 169.852 A 7.899 7.899 0 0 0 702.026 168.213 L 702.026 81.421 L 684.814 81.421 L 684.814 73.242 L 715.088 63.721 L 725.342 63.721 L 725.342 76.172 A 159.07 159.07 0 0 1 731.308 72.723 A 207.984 207.984 0 0 1 737.976 69.214 A 112.835 112.835 0 0 1 752.319 63.171 A 49.171 49.171 0 0 1 759.43 61.295 A 37.424 37.424 0 0 1 766.113 60.669 A 34.62 34.62 0 0 1 773.678 61.45 Q 779.132 62.67 783.161 65.798 A 21.886 21.886 0 0 1 783.691 66.223 A 46.21 46.21 0 0 1 788.888 71.212 Q 791.794 74.501 793.579 78.003 A 135.623 135.623 0 0 1 797.71 75.494 Q 801.468 73.296 806.274 70.74 A 123.987 123.987 0 0 1 822.205 63.66 A 57.097 57.097 0 0 1 828.627 61.723 Q 831.963 60.941 834.979 60.739 A 30.817 30.817 0 0 1 837.036 60.669 A 46.139 46.139 0 0 1 844.668 61.259 Q 848.772 61.949 852.047 63.444 A 21.209 21.209 0 0 1 857.178 66.711 Q 864.136 72.754 866.699 81.604 A 63.879 63.879 0 0 1 869.14 95.246 A 57.744 57.744 0 0 1 869.263 98.999 L 869.263 168.213 A 5.752 5.752 0 0 0 869.534 170.018 A 4.777 4.777 0 0 0 870.789 171.997 Q 872.314 173.462 874.512 173.706 L 886.597 174.438 Z M 535.156 160.645 L 535.156 174.927 A 135.836 135.836 0 0 1 525.005 179.815 A 173.681 173.681 0 0 1 516.174 183.35 Q 505.615 187.256 492.92 187.256 A 62.764 62.764 0 0 1 477.083 185.337 A 50.609 50.609 0 0 1 462.585 179.077 A 54.693 54.693 0 0 1 442.688 156.799 A 66.958 66.958 0 0 1 436.24 134.677 A 84.067 84.067 0 0 1 435.669 124.756 A 87.347 87.347 0 0 1 437.036 108.876 Q 439.05 97.986 444.031 89.478 A 57.33 57.33 0 0 1 457.598 73.529 A 53.65 53.65 0 0 1 466.125 67.932 A 62.61 62.61 0 0 1 495.85 60.669 A 70.241 70.241 0 0 1 508.139 61.686 Q 515.159 62.934 520.911 65.713 A 41.288 41.288 0 0 1 523.499 67.078 Q 534.668 73.486 534.668 85.693 A 18.596 18.596 0 0 1 534.176 90.109 A 11.928 11.928 0 0 1 530.09 96.741 A 16.461 16.461 0 0 1 524.329 99.838 A 15.618 15.618 0 0 1 519.897 100.464 Q 515.747 100.464 512.695 99.06 A 53.966 53.966 0 0 1 509.827 97.641 A 39.818 39.818 0 0 1 507.324 96.191 L 507.324 74.463 A 30.418 30.418 0 0 0 503.495 72.586 Q 501.335 71.721 499.331 71.384 A 15.056 15.056 0 0 0 496.826 71.167 A 31.541 31.541 0 0 0 486.05 72.956 A 28.223 28.223 0 0 0 477.722 77.698 A 37.864 37.864 0 0 0 468.831 88.346 A 49.893 49.893 0 0 0 465.454 95.581 A 65.253 65.253 0 0 0 461.942 109.768 A 86.344 86.344 0 0 0 461.182 121.46 A 71.413 71.413 0 0 0 462.817 137.001 A 60.54 60.54 0 0 0 465.82 146.667 A 43.129 43.129 0 0 0 473.174 158.833 A 39.012 39.012 0 0 0 479.675 164.795 Q 488.892 171.509 502.563 171.509 A 49.399 49.399 0 0 0 519.165 168.701 A 70.147 70.147 0 0 0 529.131 164.238 A 86.042 86.042 0 0 0 535.156 160.645 Z M 344.36 156.494 L 344.36 171.753 A 128.178 128.178 0 0 1 321.716 182.739 A 70.743 70.743 0 0 1 296.875 187.256 A 61.44 61.44 0 0 1 268.494 180.481 A 51.793 51.793 0 0 1 248.648 162.437 A 62.915 62.915 0 0 1 247.07 159.912 A 55.128 55.128 0 0 1 240.936 144.348 Q 239.307 137.442 238.976 129.411 A 101.205 101.205 0 0 1 238.892 125.244 Q 238.892 105.713 246.46 91.187 A 56.813 56.813 0 0 1 260.67 73.373 A 54.653 54.653 0 0 1 267.334 68.665 A 56.23 56.23 0 0 1 292.394 60.864 A 68.599 68.599 0 0 1 297.607 60.669 A 59.581 59.581 0 0 1 311.507 62.19 Q 322.141 64.74 329.346 71.568 A 36.953 36.953 0 0 1 332.642 75.134 A 51.504 51.504 0 0 1 343.099 98.126 A 72.241 72.241 0 0 1 344.36 111.938 L 344.36 115.173 A 29.215 29.215 0 0 1 344.283 117.343 A 23.169 23.169 0 0 1 344.116 118.896 L 263.062 118.896 Q 263.062 128.418 265.076 137.878 A 54.425 54.425 0 0 0 270.162 152.083 A 50.274 50.274 0 0 0 271.851 155.029 Q 276.611 162.72 284.668 167.358 Q 292.725 171.997 304.81 171.997 A 47.385 47.385 0 0 0 325.426 167.207 A 54.575 54.575 0 0 0 325.745 167.053 A 166.195 166.195 0 0 0 338.642 160.107 A 140.426 140.426 0 0 0 344.36 156.494 Z M 264.404 107.666 L 319.336 107.666 L 319.336 102.173 A 42.57 42.57 0 0 0 318.282 92.465 A 31.446 31.446 0 0 0 313.416 81.421 A 19.136 19.136 0 0 0 301.03 73.558 A 30.276 30.276 0 0 0 295.044 72.998 A 27.519 27.519 0 0 0 274.868 81.426 A 34.958 34.958 0 0 0 274.048 82.275 A 33.874 33.874 0 0 0 266.532 95.494 Q 264.809 100.994 264.404 107.666 Z M 1006.104 156.494 L 1006.104 171.753 A 128.178 128.178 0 0 1 983.459 182.739 A 70.743 70.743 0 0 1 958.618 187.256 A 61.44 61.44 0 0 1 930.237 180.481 A 51.793 51.793 0 0 1 910.392 162.437 A 62.915 62.915 0 0 1 908.813 159.912 A 55.128 55.128 0 0 1 902.679 144.348 Q 901.05 137.442 900.719 129.411 A 101.205 101.205 0 0 1 900.635 125.244 Q 900.635 105.713 908.203 91.187 A 56.813 56.813 0 0 1 922.413 73.373 A 54.653 54.653 0 0 1 929.077 68.665 A 56.23 56.23 0 0 1 954.138 60.864 A 68.599 68.599 0 0 1 959.351 60.669 A 59.581 59.581 0 0 1 973.25 62.19 Q 983.884 64.74 991.089 71.568 A 36.953 36.953 0 0 1 994.385 75.134 A 51.504 51.504 0 0 1 1004.842 98.126 A 72.241 72.241 0 0 1 1006.104 111.938 L 1006.104 115.173 A 29.215 29.215 0 0 1 1006.026 117.343 A 23.169 23.169 0 0 1 1005.859 118.896 L 924.805 118.896 Q 924.805 128.418 926.819 137.878 A 54.425 54.425 0 0 0 931.905 152.083 A 50.274 50.274 0 0 0 933.594 155.029 Q 938.354 162.72 946.411 167.358 Q 954.468 171.997 966.553 171.997 A 47.385 47.385 0 0 0 987.169 167.207 A 54.575 54.575 0 0 0 987.488 167.053 A 166.195 166.195 0 0 0 1000.385 160.107 A 140.426 140.426 0 0 0 1006.104 156.494 Z M 926.147 107.666 L 981.079 107.666 L 981.079 102.173 A 42.57 42.57 0 0 0 980.025 92.465 A 31.446 31.446 0 0 0 975.159 81.421 A 19.136 19.136 0 0 0 962.773 73.558 A 30.276 30.276 0 0 0 956.787 72.998 A 27.519 27.519 0 0 0 936.612 81.426 A 34.958 34.958 0 0 0 935.791 82.275 A 33.874 33.874 0 0 0 928.275 95.494 Q 926.552 100.994 926.147 107.666 Z M 420.41 174.438 L 420.41 184.204 L 359.619 184.204 L 359.619 174.438 L 372.925 173.706 Q 374.207 173.706 375.591 172.676 A 9.536 9.536 0 0 0 376.526 171.875 Q 378.418 170.044 378.418 168.457 L 378.418 17.944 L 359.375 17.944 L 359.375 9.644 L 391.357 0 L 401.611 0 L 401.611 168.457 Q 401.611 170.044 403.442 171.875 A 9.438 9.438 0 0 0 404.425 172.739 Q 405.637 173.653 406.733 173.703 A 2.779 2.779 0 0 0 406.86 173.706 L 420.41 174.438 Z M 668.301 144.471 A 64.719 64.719 0 0 1 663.696 156.189 A 56.6 56.6 0 0 1 643.005 178.894 A 54.395 54.395 0 0 1 622.289 186.439 A 71.133 71.133 0 0 1 611.328 187.256 A 67.07 67.07 0 0 1 595.349 185.432 A 52.818 52.818 0 0 1 579.834 178.955 A 55.551 55.551 0 0 1 559.326 156.372 A 67.431 67.431 0 0 1 552.574 132.889 A 83.123 83.123 0 0 1 552.124 124.146 A 75.479 75.479 0 0 1 554.685 104.187 A 65.487 65.487 0 0 1 559.387 91.919 A 56.218 56.218 0 0 1 580.139 69.092 A 54.94 54.94 0 0 1 601.023 61.491 A 71.625 71.625 0 0 1 612.061 60.669 A 68.192 68.192 0 0 1 627.351 62.304 A 51.309 51.309 0 0 1 643.921 69.214 A 55.628 55.628 0 0 1 664.062 92.163 A 70.491 70.491 0 0 1 670.776 117.665 A 84.588 84.588 0 0 1 671.021 124.146 A 73.816 73.816 0 0 1 668.301 144.471 Z M 645.02 123.901 Q 645.02 110.229 641.418 98.389 A 52.29 52.29 0 0 0 637.221 88.299 A 39.726 39.726 0 0 0 630.432 79.224 A 24.986 24.986 0 0 0 613.548 71.944 A 33.114 33.114 0 0 0 611.816 71.899 A 29.968 29.968 0 0 0 602.781 73.203 A 24.296 24.296 0 0 0 592.834 79.224 A 40.12 40.12 0 0 0 585.105 90.143 A 53.355 53.355 0 0 0 581.909 98.389 A 85.315 85.315 0 0 0 578.59 117.18 A 100.573 100.573 0 0 0 578.369 123.901 A 90.527 90.527 0 0 0 580.311 142.914 A 80.408 80.408 0 0 0 581.97 149.353 A 52.608 52.608 0 0 0 586.094 159.352 A 39.639 39.639 0 0 0 592.957 168.579 A 24.986 24.986 0 0 0 609.841 175.859 A 33.114 33.114 0 0 0 611.572 175.903 A 29.409 29.409 0 0 0 620.678 174.551 A 24.33 24.33 0 0 0 630.432 168.579 A 40.532 40.532 0 0 0 638.186 157.66 A 53.991 53.991 0 0 0 641.418 149.414 A 84.201 84.201 0 0 0 644.822 130.209 A 99.168 99.168 0 0 0 645.02 123.901 Z M 1088.989 72.144 L 1080.444 134.155 L 1068.604 134.155 L 1060.669 76.904 A 731.413 731.413 0 0 0 1059.862 70.739 Q 1059.533 68.309 1059.216 66.112 A 391.661 391.661 0 0 0 1058.594 61.951 A 84.546 84.546 0 0 1 1057.617 49.055 A 92.254 92.254 0 0 1 1057.617 48.95 Q 1057.617 34.424 1062.073 27.71 A 15.157 15.157 0 0 1 1066.637 23.15 Q 1070.075 20.996 1074.707 20.996 A 16.883 16.883 0 0 1 1080.001 21.784 A 13.403 13.403 0 0 1 1086.975 27.1 A 17.308 17.308 0 0 1 1089.058 31.454 Q 1091.187 37.826 1091.187 49.194 A 98.872 98.872 0 0 1 1090.576 60.242 A 278.01 278.01 0 0 1 1089.874 65.933 A 363.928 363.928 0 0 1 1088.989 72.144 Z M 1092.134 173.208 A 19.191 19.191 0 0 1 1088.379 178.589 A 18.025 18.025 0 0 1 1075.322 184.201 A 22.186 22.186 0 0 1 1074.951 184.204 Q 1066.895 184.204 1061.279 178.589 A 18.578 18.578 0 0 1 1055.665 165.168 A 22.958 22.958 0 0 1 1055.664 164.917 A 18.399 18.399 0 0 1 1057.748 156.155 A 18.947 18.947 0 0 1 1061.279 151.489 A 18.815 18.815 0 0 1 1074.92 145.996 A 23.339 23.339 0 0 1 1074.951 145.996 A 18.898 18.898 0 0 1 1083.105 147.734 A 18.722 18.722 0 0 1 1088.379 151.489 A 18.233 18.233 0 0 1 1093.871 164.67 A 22.757 22.757 0 0 1 1093.872 164.917 A 19.518 19.518 0 0 1 1092.134 173.208 Z"
              vector-effect="non-scaling-stroke"
              fill="lightblue"
            />
          </g>
        </SVG>
        <AnimatedText state={open}>
          <AnimatedTitle />
        </AnimatedText>
      </IntroDiv>
      <ToggleControl>
        <Text>
          Hey there, mind if we lend your ears for a moment? We'd love your
          permission to indulge in some audio awesomeness on our website!
        </Text>
        {/* Hey there! Mind if we sneak into your virtual world for a bit? We
        promise to only collect the bare minimum, like a nosy but
        well-intentioned neighbor. "Hey there! Can we eavesdrop on your fabulous
        voice for a sec? We promise not to judge your shower singing skills,
        pinky swear!"  */}
        <Toggle>
          <HeartSwitch
            size="lg"
            inactiveTrackFillColor="#cffafe"
            inactiveTrackStrokeColor="#22d3ee"
            activeTrackFillColor="#06b6d4"
            activeTrackStrokeColor="#0891b2"
            inactiveThumbColor="#ecfeff"
            activeThumbColor="#ecfeff"
            checked={checked}
            onChange={(event) => {
              setChecked(event.target.checked);
            }}
          />
          {/* <div style={{ margin: "5%" }}>
            <IconButton
              size="large"
              style={{ margin: "5rem" }}
              color="secondary"
              onClick={nextPage}
            >
              {checked && <ArrowForwardIosIcon fontSize="large" />}
            </IconButton>
          </div> */}
          <div style={{ position: "relative", top: "10rem", right: "10rem" }}>
            <Button
              variant="contained"
              disabled={!checked}
              color="primary"
              size="large"
              onClick={nextPage}
            >
              Next Page
            </Button>
          </div>
        </Toggle>
      </ToggleControl>
    </BodyDiv>
  );
}

const BodyDiv = styled.div`
  margin: 0;
  padding: 0;
`;

const IntroDiv = styled.div`
  background: url(${imgHome});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  place-items: start;
  width: 100%;
  height: 100vh;
`;

const SVG = styled(animated.svg)`
  width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto auto;
`;

const AnimatedText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: ${(props) => (props.state ? "100%" : "130%")};
  font-size: ${(props) => (props.state ? "4.5rem" : "3.5rem")};
  margin: center;
  right: 500px;
`;

const ToggleControl = styled.div`
  background: url(${imgPerm});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;
const Text = styled.h1`
  color: #a5fc03;
  text-align: justify;
  word-wrap: normal;
  width: 50%;
  line-height: 1.5;
  position: relative;
  top: -5%;
  left: 25%;
`;

const Toggle = styled.div`
  display: block;
  position: relative;
  top: 15%;
  right: 5%;
`;
