import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const MultiSelect = (props) => {
  const { value, handleChange, options, label, errors, touched, errorClass } =
    props;

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} className='multiSelect'>
        <InputLabel
          id='demo-multiple-checkbox-label'
          className='multiSelect__label'
        >
          {label}
        </InputLabel>
        <Select
          labelId='demo-multiple-checkbox-label'
          id='demo-multiple-checkbox'
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={options}
          className='multiSelect__select'
        >
          {options.map((name) => (
            <MenuItem key={name?._id} value={name?._id}>
              <Checkbox checked={value.indexOf(name?._id) > -1} />
              <ListItemText
                primary={name.category}
                className='multiSelect__text'
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errors && touched && <span className={errorClass}>{errors}</span>}
    </div>
  );
};

export default MultiSelect;
