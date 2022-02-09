import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import InputComponent from 'components/input';
import Button from 'components/button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as registerActions } from 'store/sagas/app/auth/register';
import { actions as loginActions } from 'store/sagas/app/auth/login';
import { actions as navigation } from 'store/sagas/app/navigation';
import Dialog from '@mui/material/Dialog';
import { ReactComponent as CloseIcon } from 'assets/img/x-icon.svg';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 'unset !important',
  },
});

const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .strict()
    .label('Full Name')
    .required('Please enter a name'),
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
    .min(0, 'Password must have at least 6 characters '),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match!', function (value) {
      return this.parent.password === value;
    }),
});

const Register = (props) => {
  const { submitRegister, navigate, setModal, showModal, setLoginModal } =
    props;
    const classes = useStyles();

  const navigateLogin = () => {
    setModal(false);
    setLoginModal(true);
  };

  return (
    <Dialog
      open={showModal}
      onClose={() => setModal(false)}
      scroll='body'
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
      PaperProps={{ classes: { root: classes.root } }}
    >
      <div className='login register'>
        <CloseIcon className='login__close' onClick={() => setModal(false)} />
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values, actions) =>
            submitRegister({ values, formActions: actions })
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
              <div className='login__title'>Create Account.</div>
              <form
                className='login__form'
                autoComplete='off'
                noValidate
                onSubmit={handleSubmit}
              >
                <InputComponent
                  name='fullName'
                  placeholder='Full Name'
                  type='text'
                  errorClass='errorClass'
                  errors={errors.fullName}
                  values={values.fullName}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.fullName}
                />
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
                <InputComponent
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  type='password'
                  errorClass='errorClass'
                  errors={errors.confirmPassword}
                  values={values.confirmPassword}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.confirmPassword}
                />
                <Button
                  title='create account'
                  newClass='login__btn register__btn'
                />
              </form>
              <div className='login__new'>
                Already have an account?{' '}
                <span onClick={navigateLogin}>Sign in</span>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  register: state.app.auth.register,
  showModal: state.app.auth.register.modal,
});
const mapDispatchToProps = {
  submitRegister: registerActions.register,
  setModal: registerActions.setModal,
  setLoginModal: loginActions.setModal,
  navigate: navigation.navigate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
