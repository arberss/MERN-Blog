import React from 'react';
import InputComponent from 'components/input';
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Button from 'components/button';
import { actions as settingsActions } from 'store/sagas/app/settings';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .strict()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  name: yup.string().label('Name').required(),
  imageUrl: yup.string().nullable().label('Image'),
  password: yup
    .string()
    .label('Password')
    .min(0, 'Password must have at least 8 characters '),
  confirmPassword: yup
    .string()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match!', function (value) {
      return this.parent.password === value;
    }),
});

const Profile = (props) => {
  const { initialValues, updateUser, loading } = props;

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={(values, actions) => updateUser({ values, actions })}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleSubmit,
        isSubmitting,
      }) => (
        <div className='profile__content'>
          <div className='profile__title'>Account Details</div>
          <form className='profile__form' onSubmit={handleSubmit}>
            <div className='profile__image'>
              {values?.imageUrl ? (
                <img src={values?.imageUrl} alt='' className='profile__img' />
              ) : (
                <div className='profile__noimg'>
                  {initialValues.name.charAt(0).toUpperCase()}
                </div>
              )}
              <input
                name='imageUrl'
                type='file'
                className='profile__file'
                onChange={(event) => {
                  setFieldValue('imageUrl', event.currentTarget.files[0]);
                }}
              />
            </div>
            <div className='profile__inputs'>
              <InputComponent
                name='name'
                label='Name'
                placeholder='Name'
                className='profile__input'
                values={values.name}
                handleChange={handleChange}
                errors={errors.name}
                touched={touched.name}
                errorClass='errorClass'
              />

              <InputComponent
                name='email'
                label='Email'
                placeholder='Email'
                className='profile__input'
                values={values.email}
                handleChange={handleChange}
                errors={errors.email}
                touched={touched.email}
                errorClass='errorClass'
              />

              <InputComponent
                name='password'
                label='Password'
                placeholder='Password'
                className='profile__input'
                type='password'
                values={values.password}
                handleChange={handleChange}
                errors={errors.password}
                touched={touched.password}
                errorClass='errorClass'
              />

              <InputComponent
                name='confirmPassword'
                label='Confirm Password'
                placeholder='Confirm Password'
                className='profile__input'
                type='password'
                values={values.confirmPassword}
                handleChange={handleChange}
                errors={errors.confirmPassword}
                touched={touched.confirmPassword}
                errorClass='errorClass'
              />
            </div>
            <Button
              title='Save'
              newClass='profile__saveBtn'
              type='submit'
              disabled={loading || isSubmitting}
              loading={loading}
            />
          </form>
        </div>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  initialValues: state?.app?.settings?.index.initialValues,
  loading: state?.app?.settings?.index.loading,
});
const mapDispatchToProps = {
  updateUser: settingsActions.updateUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
