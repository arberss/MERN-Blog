import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import InputComponent from 'components/input';
import Button from 'components/button';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { actions as resetActions } from 'store/sagas/app/auth/reset';

const validationSchema = yup.object().shape({
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

const ResetPw = (props) => {
  const { resetFn, match, loading } = props;

  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      onSubmit={(values, actions) =>
        resetFn({ values, formActions: actions, token: match?.params?.token })
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
        <div className='resetPw'>
          <div className='resetPw__content'>
            <div className='login__title'>Reset Password</div>
            <form
              action=''
              className='resetPw__form'
              autoComplete='off'
              noValidate
              onSubmit={handleSubmit}
            >
              <InputComponent
                name='password'
                placeholder='New Password'
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
                title='Confirm'
                newClass='login__btn'
                type='submit'
                loading={loading}
                disabled={loading || isSubmitting}
              />
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  loading: state.app.auth.reset.loading,
});

const mapDispatchToProps = {
  resetFn: resetActions.resetPassword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetPw));
