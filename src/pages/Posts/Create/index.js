import React, { useEffect } from 'react';
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

const validationSchema = yup.object().shape({
  title: yup.string().label('Title').required(),
  content: yup.string().label('Content').required(),
  postStatus: yup.string().label('Post status').required(),
  // image: yup.string().label('Image').required(),
  description: yup.array().label('Description').required(),
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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Nav />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) =>
          console.log({ values, formActions: actions })
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
                <form className='createPost__form'>
                  {console.log(values)}
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
                  />
                  <DropDown
                    value={values.postStatus}
                    label='Post Status'
                    options={statusOpt}
                    handleChange={(e) =>
                      setFieldValue('postStatus', e.target.value)
                    }
                    newClass='createPost__dropdown'
                  />
                  <MultiSelect
                    value={values.categories}
                    label='Categories'
                    handleChange={(e) =>
                      setFieldValue('categories', e.target.value)
                    }
                    options={categories}
                  />
                  <RichTextEditor
                    value={values.content}
                    label='Content'
                    onChange={(value) => setFieldValue('content', value)}
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
