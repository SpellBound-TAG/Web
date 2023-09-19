import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import {
  createTheme,
  makeStyles,
  responsiveFontSizes,
} from "@material-ui/core/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

let theme = createTheme();
theme = responsiveFontSizes(theme);
const borderText = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flex: "1 1 60%",
    marginLeft: 30,
    color: "green",

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

export default function MultipleSelectCheckmarks(
  { data, name, options, handleOptions },
  val
) {
  const [personName, setPersonName] = React.useState([]);

  const bor = borderText();

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    console.log(event);
    handleOptions({
      ...options,
      [event.target.name]: event.target.value,
    });
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} className={bor.root}>
        <InputLabel id="demo-multiple-checkbox-label">{name}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          name={name}
        >
          {data.map((name, index) => (
            <MenuItem key={index} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

// import React, { useState } from 'react';

// const MultiSelectDropdowns = () => {
//   const [selectedValues, setSelectedValues] = useState([]);

//   // Event handler to update selected values
//   const handleSelectChange = (event) => {
//     const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
//     setSelectedValues([...selectedValues, ...selectedOptions]);
//   };

//   return (
//     <div>
//       {/* Multi-select dropdowns */}
//       <select multiple onChange={handleSelectChange}>
//         <option value="option1">Option 1</option>
//         <option value="option2">Option 2</option>
//         {/* Add more options as needed */}
//       </select>
//       <select multiple onChange={handleSelectChange}>
//         <option value="optionA">Option A</option>
//         <option value="optionB">Option B</option>
//         {/* Add more options as needed */}
//       </select>

//       {/* Display selected values */}
//       <div>
//         <h2>Selected Values:</h2>
//         <ul>
//           {selectedValues.map((value) => (
//             <li key={value}>{value}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MultiSelectDropdowns;
