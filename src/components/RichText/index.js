import React from 'react';
import ReactQuill from 'react-quill';

const RichTextEditor = (props) => {
  const { value, onChange } = props;

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['video'],
      [{ direction: 'rtl' }],
      [{ align: [] }],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'direction',
    'align',
  ];

  return (
    <div className={`react-quill`}>
      <ReactQuill
        defaultValue={value}
        formats={formats}
        modules={modules}
        onChange={(e) => onChange(e)}
        theme='snow'
        value={value}
      />
      {/* {touched?.[name] && errors?.[name] && <span className={"validation-error"}>{touched[name] && errors[name]}</span>} */}
    </div>
  );
};
export default RichTextEditor;
