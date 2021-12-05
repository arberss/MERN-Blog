import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import InputComponent from 'components/input';
import Nav from 'components/Nav';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as createPostActions } from 'store/sagas/app/posts/create';
import { actions as categoryActions } from 'store/sagas/app/categories';
import RichTextEditor from 'components/RichText';
import DropDown from 'components/DropDown';
import MultiSelect from 'components/MultiSelect';
import Button from 'components/button';
import InputFile from 'components/input/InputFile';

const validationSchema = yup.object().shape({
  title: yup.string().label('Title').required(),
  content: yup
    .string()
    .label('Content')
    .test('has text', 'Cannot save an empty note', (value) => {
      // remove html tags
      const replacedVal =
        value !== undefined ? value.replace(/<(.|\n)*?>/g, '') : '';
      return replacedVal !== '';
    }),
  postStatus: yup.string().label('Post status').required(),
  image: yup.string().label('Image').required(),
  categories: yup.array().min(1).label('Categories').required(),
});

export const statusOpt = [
  {
    name: 'Private',
    value: 'Private',
  },
  {
    name: 'Public',
    value: 'Public',
  },
];

const Create = (props) => {
  const { createPost, initialValues, getCategories, categories } = props;

  const [imageFile, setImageFile] = useState('');

  useEffect(() => {
    getCategories();
  }, []);

  const handleImage = (e, setFieldValue) => {
    if (e.target.files[0]) {
      setFieldValue('image', 'uploaded');
      setImageFile(e.currentTarget.files[0]);
    } else {
      setFieldValue('image', '');
      setImageFile('');
    }
  };

  return (
    <>
      <Nav />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) =>
          createPost({ values: { ...values, imageFile }, formActions: actions })
        }
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => (
          <div className='createPost'>
            <div className='container'>
              <div className='createPost__content'>
                <div className='createPost__title'>Create Post</div>
                <form className='createPost__form' onSubmit={handleSubmit}>
                  <InputComponent
                    name='title'
                    placeholder='Post Title'
                    type='text'
                    label='Title'
                    errorClass='errorClass'
                    errors={errors.title}
                    values={values.title}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched.title}
                    className='createPost__nameInput'
                  />
                  <DropDown
                    value={values.postStatus}
                    label='Post Status'
                    options={statusOpt}
                    handleChange={(e) =>
                      setFieldValue('postStatus', e.target.value)
                    }
                    newClass='createPost__dropdown'
                    errorClass='errorClass'
                    errors={errors.postStatus}
                    touched={touched.postStatus}
                  />
                  <MultiSelect
                    name='Categories'
                    value={values.categories}
                    label='Categories'
                    handleChange={(e) => {
                      setFieldValue('categories', e.target.value);
                    }}
                    options={categories}
                    errorClass='errorClass'
                    errors={errors.categories}
                    touched={touched.categories}
                  />
                  <InputFile
                    name='image'
                    placeholder='Insert an image'
                    type='file'
                    label='Image'
                    errorClass='errorClass'
                    errors={errors.image}
                    values={imageFile}
                    handleBlur={handleBlur}
                    handleChange={(e) => handleImage(e, setFieldValue)}
                    touched={touched.image}
                    className='createPost__inputFile'
                  />
                  <RichTextEditor
                    value={values.content}
                    label='Content'
                    onChange={(value) => setFieldValue('content', value)}
                    errorClass='errorClass'
                    errors={errors.content}
                    touched={touched.content}
                  />
                  <Button title='Create' newClass='login__btn' type='submit' />
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = (state) => ({
  initialValues: state?.app?.posts?.createPost?.initialValues,
  categories: state?.app?.categories?.index?.categories,
});

const mapDispatchToProps = {
  createPost: createPostActions.createPost,
  getCategories: categoryActions.getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create));
