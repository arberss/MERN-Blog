import React from 'react';

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
  } = props;

  return (
    <div className={`form_input ${errors && touched ? 'error' : ''}`}>
      {label && <p className='form_input__label'>{label}</p>}
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
      {errors && touched && <span className={errorClass}>{errors}</span>}
    </div>
  );
};

export default InputComponent;
