import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import InputComponent from 'components/input';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as createPostActions } from 'store/sagas/app/posts/create';
import RichTextEditor from 'components/RichText';

const validationSchema = yup.object().shape({
  title: yup.string().label('Title').required(),
  content: yup.string().label('Content').required(),
  postStatus: yup.string().label('Post status').required(),
  image: yup.string().label('Image'),
});

const AddFeed = (props) => {
  const { createPost, initialValues } = props;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) =>
        createPost({ values, formActions: actions })
      }
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className='addFeed'>
          <InputComponent
            name='title'
            placeholder='Post Title'
            type='text'
            errorClass='errorClass'
            errors={errors.title}
            values={values.title}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched.title}
          />
          <InputComponent
            name='title'
            placeholder='Post Title'
            type='text'
            errorClass='errorClass'
            errors={errors.title}
            values={values.title}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched.title}
          />
          <InputComponent
            name='title'
            placeholder='Post Title'
            type='text'
            errorClass='errorClass'
            errors={errors.title}
            values={values.title}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched.title}
          />
        </form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  initialValues: state?.app?.posts?.createPost?.initialValues,
});

const mapDispatchToProps = {
  createPost: createPostActions.createPost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddFeed));
