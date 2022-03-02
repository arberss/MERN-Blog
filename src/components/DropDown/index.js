import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function DropDown(props) {
  const {
    value,
    handleChange,
    label,
    options,
    newClass,
    errors,
    touched,
    errorClass,
    menuClass,
  } = props;

  return (
    <div>
      <FormControl
        variant='standard'
        sx={{ m: 1, minWidth: 120 }}
        className={`dropdownMenu ${newClass ? newClass : ''}`}
      >
        <InputLabel
          id='demo-simple-select-standard-label'
          className='dropdownMenu__label'
        >
          {label}
        </InputLabel>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value={value}
          onChange={handleChange}
          label={label}
          className='dropdownMenu__select'
        >
          {options?.map((opt) => {
            return (
              <MenuItem
                value={opt.value}
                className={`dropdownMenu__item ${menuClass ? menuClass : ''}`}
                key={opt?.value}
              >
                {opt?.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {errors && touched && <span className={errorClass}>{errors}</span>}
    </div>
  );
}

export default DropDown;
