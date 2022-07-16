import React from 'react';
import { ReactComponent as InsertPhoto } from 'assets/img/insert_photo.svg';

const InputFile = (props) => {
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
    <div
      className={`form_file ${errors && touched ? 'error' : ''} ${
        className || ''
      }`}
    >
      {label && <p className='form_file__label'>{label}</p>}
      <div className='form_file__body'>
        <div className='form_file__iconbody'>
          <InsertPhoto className='form_file__icon' />
          <div className='form_file__icon-label'>
            {values === '' || values === null ? 'Upload an image' : 'Image uploaded'}
          </div>
        </div>
        <input
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={placeholder}
          type={type}
          defaultValue={defaultValue}
        />
      </div>
      {errors && touched && <span className={errorClass}>{errors}</span>}
    </div>
  );
};

export default InputFile;
