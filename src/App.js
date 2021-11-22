import React, { useEffect } from 'react';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import ForgotPw from 'pages/Auth/ForgotPw';
import LandingPage from 'pages/Landing';
import { Router, Redirect, Switch, Route } from 'react-router-dom';
import history from 'utils/history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router';
import ProtectedRoute from 'components/ProtectedRoute';
import { getCurrentUser } from 'utils/currentUser';
import { actions as loginActions } from 'store/sagas/app/auth/login';
import { actions as meActions } from 'store/sagas/app/me';
import { connect } from 'react-redux';
import Posts from 'pages/Posts';
import PublicPost from 'pages/Post/PublicPost';
import PrivatePost from 'pages/Post/PrivatePost';
import Favorites from 'pages/Favorites';
import Settings from 'pages/Settings';

function App(props) {
  const {
    getMe,
    setAuthStatus,
    isAuth,
    user,
    showLoginModal,
    showRegisterModal,
    showForgotModal,
  } = props;

  useEffect(() => {
    checkUser();
  }, [isAuth]);

  const checkUser = () => {
    const user = getCurrentUser();

    if (user) {
      setAuthStatus({ isAuth: true, token: user.token });
      getMe();
    } else {
      setAuthStatus({ isAuth: false, token: null });
    }
  };

  return (
    <>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <ProtectedRoute
            protectedRole={['USER', 'ADMIN']}
            exact
            path='/posts'
            component={Posts}
          />
          <Route exact path='/post/public/:postId' component={PublicPost} />
          <ProtectedRoute
            protectedRole={['USER', 'ADMIN']}
            exact
            path='/post/private/:postId'
            component={PrivatePost}
          />
          <ProtectedRoute
            protectedRole={['USER', 'ADMIN']}
            exact
            path='/post/favorites/'
            component={Favorites}
          />
          <ProtectedRoute
            protectedRole={['USER', 'ADMIN']}
            exact
            path='/user/settings'
            component={Settings}
          />
          <Redirect to='/' />
        </Switch>
      </Router>
      <ToastContainer position='top-right' autoClose={3000} />

      {showLoginModal && <Login />}
      {showRegisterModal && <Register />}
      {showForgotModal && <ForgotPw />}
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state?.app?.auth?.login?.isAuth,
  user: state?.app?.me?.index.user,
  showLoginModal: state.app.auth.login.modal,
  showRegisterModal: state.app.auth.register.modal,
  showForgotModal: state.app.auth.forgot.modal,
});

const mapDispatchToProps = {
  getMe: meActions.me,
  setAuthStatus: loginActions.setAuthStatus,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
