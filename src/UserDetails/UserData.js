import React, { useState, createContext, useContext } from "react";
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
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
// import Box from "@mui/material/Box";
import BgImg from "../images/flower.jpg";

const Mycontext = createContext();

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
  const [docId, setDocId] = useState();

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
      setDocId(docRef.id);
      // console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // try {
    //   const data = collection(db, "Options");
    //   await setDoc(doc(db, "Options", "Choices"), {
    //     Animal: [
    //       "Domestic animals, pets",
    //       "Dog",
    //       "Bark",
    //       "Yip",
    //       "Howl",
    //       "Bow-wow",
    //       "Growling",
    //       "Whimper (dog)",
    //       "Bay",
    //       "Cat",
    //       "Purr",
    //       "Meow",
    //       "Hiss",
    //       "Cat communication",
    //       "Caterwaul",
    //       "Livestock, farm animals, working animals",
    //       "Horse",
    //       "Clip-clop",
    //       "Neigh, whinny",
    //       "Snort (horse)",
    //       "Nicker",
    //       "Donkey, ass",
    //       "Cattle, bovinae",
    //       "Moo",
    //       "Cowbell",
    //       "Yak",
    //       "Pig",
    //       "Oink",
    //       "Goat",
    //       "Bleat",
    //       "Sheep",
    //       "Fowl",
    //       "Chicken, rooster",
    //       "Cluck",
    //       "Crowing, cock-a-doodle-doo",
    //       "Turkey",
    //       "Gobble",
    //       "Duck",
    //       "Quack",
    //       "Goose",
    //       "Honk",
    //       "Wild animals",
    //       "Roaring cats (lions, tigers)",
    //       "Roar",
    //       "Bird",
    //       "Bird vocalization, bird call, bird song",
    //       "Chirp, tweet",
    //       "Squawk",
    //       "Pigeon, dove",
    //       "Coo",
    //       "Crow",
    //       "Caw",
    //       "Owl",
    //       "Hoot",
    //       "Gull, seagull",
    //       "Bird flight, flapping wings",
    //       "Canidae, dogs, wolves",
    //       "Rodents, rats, mice",
    //       "Mouse",
    //       "Chipmunk",
    //       "Patter",
    //       "Insect",
    //       "Cricket",
    //       "Mosquito",
    //       "Fly, housefly",
    //       "Buzz",
    //       "Bee, wasp, etc.",
    //       "Frog",
    //       "Croak",
    //       "Snake",
    //       "Rattle",
    //       "Whale vocalization",
    //     ],
    //     Music: [
    //       "Musical instrument",
    //       "Plucked string instrument",
    //       "Guitar",
    //       "Electric guitar",
    //       "Bass guitar",
    //       "Acoustic guitar",
    //       "Steel guitar, slide guitar",
    //       "Tapping (guitar technique)",
    //       "Strum",
    //       "Banjo",
    //       "Sitar",
    //       "Mandolin",
    //       "Zither",
    //       "Ukulele",
    //       "Keyboard (musical)",
    //       "Piano",
    //       "Electric piano",
    //       "Clavinet",
    //       "Rhodes piano",
    //       "Organ",
    //       "Electronic organ",
    //       "Hammond organ",
    //       "Synthesizer",
    //       "Sampler",
    //       "Mellotron",
    //       "Harpsichord",
    //       "Percussion",
    //       "Drum kit",
    //       "Drum machine",
    //       "Drum",
    //       "Snare drum",
    //       "Rimshot",
    //       "Drum roll",
    //       "Bass drum",
    //       "Timpani",
    //       "Tabla",
    //       "Cymbal",
    //       "Hi-hat",
    //       "Crash cymbal",
    //       "Wood block",
    //       "Tambourine",
    //       "Rattle (instrument)",
    //       "Maraca",
    //       "Gong",
    //       "Tubular bells",
    //       "Mallet percussion",
    //       "Marimba, xylophone",
    //       "Glockenspiel",
    //       "Vibraphone",
    //       "Steelpan",
    //       "Orchestra",
    //       "Brass instrument",
    //       "French horn",
    //       "Trumpet",
    //       "Trombone",
    //       "Cornet",
    //       "Bugle",
    //       "Bowed string instrument",
    //       "String section",
    //       "Violin, fiddle",
    //       "Pizzicato",
    //       "Cello",
    //       "Double bass",
    //       "Wind instrument, woodwind instrument",
    //       "Flute",
    //       "Saxophone",
    //       "Alto saxophone",
    //       "Soprano saxophone",
    //       "Clarinet",
    //       "Oboe",
    //       "Bassoon",
    //       "Harp",
    //       "Bell",
    //       "Church bell",
    //       "Jingle bell",
    //       "Bicycle bell",
    //       "Tuning fork",
    //       "Chime",
    //       "Wind chime",
    //       "Change ringing (campanology)",
    //       "Harmonica",
    //       "Accordion",
    //       "Bagpipes",
    //       "Didgeridoo",
    //       "Shofar",
    //       "Theremin",
    //       "Singing bowl",
    //       "Musical ensemble",
    //       "Bass (instrument role)",
    //       "Scratching (performance technique)",
    //       "Music genre",
    //       "Pop music",
    //       "Hip hop music",
    //       "Grime music",
    //       "Trap music",
    //       "Beatboxing",
    //       "Rock music",
    //       "Heavy metal",
    //       "Punk rock",
    //       "Grunge",
    //       "Progressive rock",
    //       "Rock and roll",
    //       "Psychedelic rock",
    //       "Rhythm and blues",
    //       "Soul music",
    //       "Reggae",
    //       "Dub",
    //       "Country",
    //       "Swing music",
    //       "Bluegrass",
    //       "Funk",
    //       "Folk music",
    //       "Middle Eastern music",
    //       "Jazz",
    //       "Disco",
    //       "Classical music",
    //       "Opera",
    //       "Electronic music",
    //       "House music",
    //       "Techno",
    //       "Dubstep",
    //       "Electro",
    //       "Drum and bass",
    //       "Oldschool jungle",
    //       "Electronica",
    //       "Electronic dance music",
    //       "Ambient music",
    //       "Drone music",
    //       "Trance music",
    //       "Noise music",
    //       "UK garage",
    //       "Music of Latin America",
    //       "Cumbia",
    //       "Salsa music",
    //       "Soca music",
    //       "Kuduro",
    //       "Funk carioca",
    //       "Flamenco",
    //       "Blues",
    //       "Music for children",
    //       "New-age music",
    //       "Vocal music",
    //       "A capella",
    //       "Music of Africa",
    //       "Afrobeat",
    //       "Kwaito",
    //       "Christian music",
    //       "Gospel music",
    //       "Music of Asia",
    //       "Carnatic music",
    //       "Music of Bollywood",
    //       "Ska",
    //       "Traditional music",
    //       "Independent music",
    //       "Musical concepts",
    //       "Song",
    //       "Melody",
    //       "Musical note",
    //       "Beat",
    //       "Drum beat",
    //       "Chord",
    //       "Harmony",
    //       "Bassline",
    //       "Loop",
    //       "Drone",
    //       "Music role",
    //       "Background music",
    //       "Theme music",
    //       "Jingle (music)",
    //       "Soundtrack music",
    //       "Lullaby",
    //       "Video game music",
    //       "Christmas music",
    //       "Dance music",
    //       "Wedding music",
    //       "Birthday music",
    //       "Music mood",
    //       "Happy music",
    //       "Funny music",
    //       "Sad music",
    //       "Tender music",
    //       "Exciting music",
    //       "Angry music",
    //       "Scary music",
    //     ],
    //     "Human sounds": [
    //       "Human voice",
    //       "Speech",
    //       "Male speech, man speaking",
    //       "Female speech, woman speaking",
    //       "Child speech, kid speaking",
    //       "Conversation",
    //       "Narration, monologue",
    //       "Babbling",
    //       "Speech synthesizer",
    //       "Shout",
    //       "Bellow",
    //       "Whoop",
    //       "Yell",
    //       "Battle cry",
    //       "Children shouting",
    //       "Screaming",
    //       "Whispering",
    //       "Laughter",
    //       "Baby laughter",
    //       "Giggle",
    //       "Snicker",
    //       "Belly laugh",
    //       "Chuckle, chortle",
    //       "Crying, sobbing",
    //       "Baby cry, infant cry",
    //       "Whimper",
    //       "Wail, moan",
    //       "Sigh",
    //       "Singing",
    //       "Choir",
    //       "Yodeling",
    //       "Chant",
    //       "Mantra",
    //       "Male singing",
    //       "Female singing",
    //       "Child singing",
    //       "Synthetic singing",
    //       "Rapping",
    //       "Humming",
    //       "Groan",
    //       "Grunt",
    //       "Yawn",
    //       "Whistling",
    //       "Wolf-whistling",
    //       "Respiratory sounds",
    //       "Breathing",
    //       "Wheeze",
    //       "Snoring",
    //       "Gasp",
    //       "Pant",
    //       "Snort",
    //       "Cough",
    //       "Throat clearing",
    //       "Sneeze",
    //       "Sniff",
    //       "Human locomotion",
    //       "Run",
    //       "Shuffle",
    //       "Walk, footsteps",
    //       "Digestive",
    //       "Chewing, mastication",
    //       "Biting",
    //       "Gargling",
    //       "Stomach rumble",
    //       "Burping, eructation",
    //       "Hiccup",
    //       "Fart",
    //       "Hands",
    //       "Finger snapping",
    //       "Clapping",
    //       "Heart sounds, heartbeat",
    //       "Heart murmur",
    //       "Otoacoustic emission",
    //       "Tinnitus, ringing in the ears",
    //       "Human group actions",
    //       "Cheering",
    //       "Applause",
    //       "Chatter",
    //       "Crowd",
    //       "Hubbub, speech noise, speech babble",
    //       "Booing",
    //       "Children playing",
    //     ],
    //     "Natural sounds": [
    //       "Wind",
    //       "Howl (wind)",
    //       "Rustling leaves",
    //       "Wind noise (microphone)",
    //       "Thunderstorm",
    //       "Thunder",
    //       "Water",
    //       "Rain",
    //       "Raindrop",
    //       "Rain on surface",
    //       "Stream",
    //       "Waterfall",
    //       "Ocean",
    //       "Waves, surf",
    //       "Steam",
    //       "Gurgling",
    //       "Fire",
    //       "Crackle",
    //       "Wildfire",
    //     ],
    //     "Sounds of things": [
    //       "Vehicle",
    //       "Boat, Water vehicle",
    //       "Sailboat, sailing ship",
    //       "Rowboat, canoe, kayak",
    //       "Motorboat, speedboat",
    //       "Ship",
    //       "Motor vehicle (road)",
    //       "Car",
    //       "Vehicle horn, car horn, honking",
    //       "Toot",
    //       "Car alarm",
    //       "Power windows, electric windows",
    //       "Skidding",
    //       "Tire squeal",
    //       "Car passing by",
    //       "Race car, auto racing",
    //       "Truck",
    //       "Air brake",
    //       "Air horn, truck horn",
    //       "Reversing beeps",
    //       "Ice cream truck, ice cream van",
    //       "Bus",
    //       "Emergency vehicle",
    //       "Police car (siren)",
    //       "Ambulance (siren)",
    //       "Fire engine, fire truck (siren)",
    //       "Motorcycle",
    //       "Traffic noise, roadway noise",
    //       "Rail transport",
    //       "Train",
    //       "Train whistle",
    //       "Train horn",
    //       "Railroad car, train wagon",
    //       "Train wheels squealing",
    //       "Subway, metro, underground",
    //       "Aircraft",
    //       "Aircraft engine",
    //       "Jet engine",
    //       "Propeller, airscrew",
    //       "Helicopter",
    //       "Fixed-wing aircraft, airplane",
    //       "Non-motorized land vehicle",
    //       "Bicycle",
    //       "Skateboard",
    //       "Engine",
    //       "Light engine (high frequency)",
    //       "Dental drill, dentist's drill",
    //       "Lawn mower",
    //       "Chainsaw",
    //       "Medium engine (mid frequency)",
    //       "Heavy engine (low frequency)",
    //       "Engine knocking",
    //       "Engine starting",
    //       "Idling",
    //       "Accelerating, revving, vroom",
    //       "Domestic sounds, home sounds",
    //       "Door",
    //       "Doorbell",
    //       "Ding-dong",
    //       "Sliding door",
    //       "Slam",
    //       "Knock",
    //       "Tap",
    //       "Squeak",
    //       "Cupboard open or close",
    //       "Drawer open or close",
    //       "Dishes, pots, and pans",
    //       "Cutlery, silverware",
    //       "Chopping (food)",
    //       "Frying (food)",
    //       "Microwave oven",
    //       "Blender",
    //       "Kettle whistle",
    //       "Water tap, faucet",
    //       "Sink (filling or washing)",
    //       "Bathtub (filling or washing)",
    //       "Hair dryer",
    //       "Toilet flush",
    //       "Toothbrush",
    //       "Electric toothbrush",
    //       "Vacuum cleaner",
    //       "Zipper (clothing)",
    //       "Velcro, hook and loop fastener",
    //       "Keys jangling",
    //       "Coin (dropping)",
    //       "Packing tape, duct tape",
    //       "Scissors",
    //       "Electric shaver, electric razor",
    //       "Shuffling cards",
    //       "Typing",
    //       "Typewriter",
    //       "Computer keyboard",
    //       "Writing",
    //       "Alarm",
    //       "Telephone",
    //       "Telephone bell ringing",
    //       "Ringtone",
    //       "Cellphone buzz, vibrating alert",
    //       "Telephone dialing, DTMF",
    //       "Dial tone",
    //       "Busy signal",
    //       "Alarm clock",
    //       "Siren",
    //       "Civil defense siren",
    //       "Buzzer",
    //       "Smoke detector, smoke alarm",
    //       "Fire alarm",
    //       "Foghorn",
    //       "Whistle",
    //       "Steam whistle",
    //       "Mechanisms",
    //       "Ratchet, pawl",
    //       "Clock",
    //       "Tick",
    //       "Tick-tock",
    //       "Gears",
    //       "Pulleys",
    //       "Sewing machine",
    //       "Mechanical fan",
    //       "Air conditioning",
    //       "Cash register",
    //       "Printer",
    //       "Camera",
    //       "Single-lens reflex camera",
    //       "Tools",
    //       "Hammer",
    //       "Jackhammer",
    //       "Sawing",
    //       "Filing (rasp)",
    //       "Sanding",
    //       "Power tool",
    //       "Drill",
    //       "Explosion",
    //       "Gunshot, gunfire",
    //       "Machine gun",
    //       "Fusillade",
    //       "Artillery fire",
    //       "Cap gun",
    //       "Fireworks",
    //       "Firecracker",
    //       "Burst, pop",
    //       "Eruption",
    //       "Boom",
    //       "Sonic boom",
    //       "Wood",
    //       "Chop",
    //       "Splinter",
    //       "Crack",
    //       "Snap",
    //       "Glass",
    //       "Chink, clink",
    //       "Shatter",
    //       "Liquid",
    //       "Splash, splatter",
    //       "Slosh",
    //       "Squish",
    //       "Drip",
    //       "Pour",
    //       "Trickle, dribble",
    //       "Gush",
    //       "Fill (with liquid)",
    //       "Spray",
    //       "Pump (liquid)",
    //       "Stir",
    //       "Boiling",
    //     ],
    //     "Source-ambiguous sounds": [
    //       "Generic impact sounds",
    //       "Bang",
    //       "Slap, smack",
    //       "Whack, thwack",
    //       "Smash, crash",
    //       "Breaking",
    //       "Bouncing",
    //       "Whip",
    //       "Flap",
    //       "Surface contact",
    //       "Scratch",
    //       "Scrape",
    //       "Rub",
    //       "Roll",
    //       "Grind",
    //       "Deformable shell",
    //       "Crushing",
    //       "Crumpling, crinkling",
    //       "Tearing",
    //       "Onomatopoeia",
    //       "Brief tone",
    //       "Beep, bleep",
    //       "Ping",
    //       "Ding",
    //       "Clang",
    //       "Twang",
    //       "Squeal",
    //       "Screech",
    //       "Creak",
    //       "Rustle",
    //       "Whir",
    //       "Clatter",
    //       "Sizzle",
    //       "Clicking",
    //       "Clickety-clack",
    //       "Rumble",
    //       "Blare",
    //       "Plop",
    //       "Jingle, tinkle",
    //       "Fizz",
    //       "Puff",
    //       "Hum",
    //       "Zing",
    //       "Boing",
    //       "Crunch",
    //       "Silence",
    //       "Other sourceless",
    //       "Sine wave",
    //       "Harmonic",
    //       "Chirp tone",
    //       "Sound effect",
    //       "Pulse",
    //       "Infrasound",
    //       "Bass (frequency range)",
    //       "Ringing (of resonator)",
    //     ],
    //     "Channel, environment and background": [
    //       "Acoustic environment",
    //       "Inside, small room",
    //       "Inside, large room or hall",
    //       "Inside, public space",
    //       "Outside, urban or manmade",
    //       "Outside, rural or natural",
    //       "Reverberation",
    //       "Echo",
    //       "Noise",
    //       "Background noise",
    //       "Environmental noise",
    //       "Tape hiss",
    //       "Static",
    //       "Mains hum",
    //       "Distortion",
    //       "Sidetone",
    //       "Cacophony",
    //       "White noise",
    //       "Pink noise",
    //       "Throbbing",
    //       "Vibration",
    //       "Sound reproduction",
    //       "Television",
    //       "Radio",
    //       "Loudspeaker",
    //       "Headphones",
    //       "Recording",
    //       "Field recording",
    //       "Gramophone record",
    //       "Compact disc",
    //       "MP3",
    //     ],
    //   });
    // } catch (e) {
    //   console.log("Error Adding document");
    // }
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
