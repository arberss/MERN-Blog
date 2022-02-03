import React from 'react';

const Loader = (props) => {
  const { newClass, color = '#1e8659' } = props;

  return <div className={`loader ${newClass || ''}`} style={{ color }}></div>;
};

export default Loader;
