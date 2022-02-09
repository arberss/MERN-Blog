import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import InputComponent from 'components/input';
import Button from 'components/button';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { actions as loginActions } from 'store/sagas/app/auth/login';
import { actions as forgotActions } from 'store/sagas/app/auth/forgot';
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
  email: yup
    .string()
    .lowercase()
    .strict()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
});

const Login = (props) => {
  const { sendRecovery, navigate, setModal, showForgotModal, setLoginModal } =
    props;
    const classes = useStyles();

  const navigateLogin = () => {
    setModal(false);
    setLoginModal(true);
  };

  return (
    <Dialog
      open={showForgotModal}
      onClose={() => setModal(false)}
      scroll='body'
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
      PaperProps={{ classes: { root: classes.root } }}
    >
      <div className='login'>
        <CloseIcon className='login__close' onClick={() => setModal(false)} />
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, actions) =>
            sendRecovery({ values, formActions: actions })
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
              <div className='login__title'>Password Recovery</div>
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
                <Button title='Send' newClass='login__btn' type='submit' />
              </form>
              <div className='login__new'>
                <span onClick={navigateLogin}>Login</span>
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
  showForgotModal: state.app.auth.forgot.modal,
  showLoginModal: state.app.auth.login.modal,
});
const mapDispatchToProps = {
  sendRecovery: forgotActions.forgotPassword,
  setModal: forgotActions.setModal,
  setLoginModal: loginActions.setModal,
  navigate: navigation.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
