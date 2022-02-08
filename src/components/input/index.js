import React from 'react';
import { ReactComponent as SearchIcon } from 'assets/img/search_black.svg';

const InputComponent = (props) => {
  const {
    errors,
    touched,
    handleBlur,
    handleChange,
    values,
    name,
    placeholder = '',
    type = 'text',
    errorClass,
    defaultValue,
    className,
    label,
    search = false,
  } = props;

  return (
    <div
      className={`form_input ${errors && touched ? 'error' : ''} ${
        search ? 'searchInput' : ''
      }`}
    >
      {label && <p className='form_input__label'>{label}</p>}
      <div className={`${search ? 'searchInput__content' : ''}`}>
        <input
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={placeholder}
          type={type}
          value={values}
          defaultValue={defaultValue}
          className={className}
        />
        {search && <SearchIcon className='searchInput__icon' />}
      </div>
      {errors && touched && <span className={errorClass}>{errors}</span>}
    </div>
  );
};

export default InputComponent;
