import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import "./Select.scss"

export default function SelectAutoWidth({ title, list, setItemSelected }) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    console.log("seleccionado",event.target.value);
    setItemSelected(event.target.value);
  };

  return (
    <div className="conteiner">
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">{title}</InputLabel>
        <Select
          className="conteiner-select-simple"
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          label={title}
        >
          {list.map(item => (
            <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}