import * as React from 'react';
import { useState } from "react"

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function Checkboxes() {
  const [labels, setLabels] = useState([])
  function handleChange(ev) {
    console.log('eeeeee')
  }
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={toysLabels}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            onChange={handleChange}
          />
          {option.title}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => {
        // console.log(params.InputProps.startAdornment[0].props.label)
        console.log(params.InputProps.startAdornment)
        console.log(params)
        let arr = params.InputProps.startAdornment
        console.log(typeof arr)
        for (const property in arr) {
          console.log(`${property}: ${arr[property].props.label}`);
          let labelForArray
          labelForArray = `${arr[property].props.label}`
          console.log(labelForArray)
          setLabels(prev => [...prev, labelForArray])
          console.log('llll', labels)

        }

        // arr.map(toy => <li>{toy.props.label}</li>)
        return <div> < TextField {...params} label="Checkboxes" placeholder="Favorites" />

          {/* {labels && labels.map(l => <li>{l} </li>)} */}
        </div>
      }}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const toysLabels = [
  { title: 'Doll', year: 1994 },
  { title: 'car', year: 1972 },
  { title: 'Train', year: 1974 },
  { title: 'Battery', year: 2008 },

];
