import React from 'react';

const Loader = (props) => {
  const { newClass, color = '#1e8659', size = 5 } = props;

  return (
    <div
      className={`loader ${newClass || ''}`}
      style={{ color, fontSize: size }}
    ></div>
  );
};

export default Loader;
