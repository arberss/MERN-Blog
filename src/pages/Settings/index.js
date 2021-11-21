import React from 'react';
import Nav from 'components/Nav';
import InputComponent from 'components/input';
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Button from 'components/button';
import { actions as settingsActions } from 'store/sagas/app/settings';

const { REACT_APP_WEB_API_IMG_URL } = process.env;

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

const Settings = (props) => {
  const { initialValues, updateUser } = props;

  return (
    <div className='settings'>
      <Nav />
      <div className='container'>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={(values, actions) => updateUser(values)}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <div className='settings__content'>
              <div className='settings__title'>Account Details</div>
              <form className='settings__form' onSubmit={handleSubmit}>
                <div className='settings__image'>
                  {values?.imageUrl ? (
                    <img
                      src={`${REACT_APP_WEB_API_IMG_URL}${values?.imageUrl}`}
                      alt=''
                      className='settings__img'
                    />
                  ) : (
                    <div className='settings__noimg'>
                      {initialValues.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <input
                    name='imageUrl'
                    type='file'
                    className='settings__file'
                    onChange={(event) => {
                      setFieldValue('imageUrl', event.currentTarget.files[0]);
                    }}
                  />
                </div>
                <div className='settings__inputs'>
                  <InputComponent
                    name='name'
                    label='Name'
                    placeholder='Name'
                    className='settings__input'
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
                    className='settings__input'
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
                    className='settings__input'
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
                    className='settings__input'
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
                  newClass='settings__saveBtn'
                  type='submit'
                />
              </form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  initialValues: state?.app?.settings?.index.initialValues,
});
const mapDispatchToProps = {
  updateUser: settingsActions.updateUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Settings));
