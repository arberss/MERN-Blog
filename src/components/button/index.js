import clsx from 'clsx';
import Loader from 'components/Loader';
import React from 'react';

const Button = (props) => {
  const { title, newClass, type = 'text', onClick, disabled, loading, loaderSize } = props;

  return (
    <button
      className={clsx('button', newClass ? newClass : '')}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <Loader newClass='button__loading' size={loaderSize} /> : title}
    </button>
  );
};

export default Button;
