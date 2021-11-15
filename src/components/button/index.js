import clsx from 'clsx';
import React from 'react';

const Button = (props) => {
  const { title, newClass, type = 'text', onClick, disabled } = props;

  return (
    <button
      className={clsx('button', newClass ? newClass : '')}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
