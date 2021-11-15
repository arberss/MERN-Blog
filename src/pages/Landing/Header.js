import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as loginActions } from 'store/sagas/app/auth/login';
import { actions as navigationActions } from 'store/sagas/app/navigation';

const Header = (props) => {
  const { navigate, isAuth, setModal } = props;

  const handleBtn = () => {
    if (!isAuth) {
      setModal(true);
    } else {
      navigate('/posts');
    }
  };

  return (
    <div className='header'>
      <div className='container'>
        <div className='header__content'>
          <h1 className='header__title'>
            Blog is a place to write, read, and connect
          </h1>
          <p className='header__text'>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </p>
          <button className='header__btn' onClick={handleBtn}>
            Start Writing
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.app.auth.login.isAuth,
});

const mapDispatchToProps = {
  setModal: loginActions.setModal,
  navigate: navigationActions.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
