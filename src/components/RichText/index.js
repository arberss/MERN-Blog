import React from 'react';
import ReactQuill from 'react-quill';
import '../../../node_modules/react-quill/dist/quill.snow.css'; // ES6
import { modules, formats } from './options';

const RichTextEditor = (props) => {
  const { value, onChange, newClass, label } = props;

  return (
    <div className={`react-quill ${newClass ? newClass : ''}`}>
      <div className='react-quill__label'>{label}</div>
      <div className='react-quill__content'>
        <ReactQuill
          defaultValue={value}
          formats={formats}
          modules={modules}
          onChange={onChange}
          theme='snow'
          value={value}
        />
      </div>
      {/* {touched?.[name] && errors?.[name] && <span className={"validation-error"}>{touched[name] && errors[name]}</span>} */}
    </div>
  );
};
export default RichTextEditor;
