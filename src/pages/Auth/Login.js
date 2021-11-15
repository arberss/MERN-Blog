import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import InputComponent from 'components/input';
import Button from 'components/button';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { actions as loginActions } from 'store/sagas/app/auth/login';
import { actions as registerAction } from 'store/sagas/app/auth/register';
import { actions as navigation } from 'store/sagas/app/navigation';
import Dialog from '@mui/material/Dialog';
import { ReactComponent as CloseIcon } from 'assets/img/x-icon.svg';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .lowercase()
    .strict()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(0, 'Password must have at least 8 characters '),
});

const Login = (props) => {
  const { submitLogin, navigate, setModal, showModal, setRegisterModal } =
    props;

  const navigateRegister = () => {
    setModal(false);
    setRegisterModal(true);
  };

  return (
    <Dialog
      open={showModal}
      onClose={() => setModal(false)}
      scroll='body'
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <div className='login'>
        <CloseIcon className='login__close' onClick={() => setModal(false)} />
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) =>
            submitLogin({ values, formActions: actions })
          }
          validationSchema={validationSchema}
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
            <div className='container'>
              <div className='login__title'>Welcome Back.</div>
              <form
                className='login__form'
                autoComplete='off'
                noValidate
                onSubmit={handleSubmit}
              >
                <InputComponent
                  name='email'
                  placeholder='E-mail'
                  type='email'
                  errorClass='errorClass'
                  errors={errors.email}
                  values={values.email}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.email}
                />
                <InputComponent
                  name='password'
                  placeholder='Password'
                  type='password'
                  errorClass='errorClass'
                  errors={errors.password}
                  values={values.password}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.password}
                />
                <div className='login__forgotPass'>Forgot Password?</div>
                <Button title='sign in' newClass='login__btn' type='submit' />
              </form>
              <div className='login__new'>
                New User? <span onClick={navigateRegister}>Sign up</span>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  login: state.app.auth.login,
  showModal: state.app.auth.login.modal,
});
const mapDispatchToProps = {
  submitLogin: loginActions.login,
  setModal: loginActions.setModal,
  setRegisterModal: registerAction.setModal,
  navigate: navigation.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
