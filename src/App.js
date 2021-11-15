import React, { useEffect } from 'react';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import LandingPage from 'pages/Landing';
import { Router, Redirect, Switch, Route } from 'react-router-dom';
import history from 'utils/history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router';
import Feeds from 'pages/Feeds';
import ProtectedRoute from 'components/ProtectedRoute';
import UserRoute from 'components/ProtectedRoute/UserRoute';
import { getCurrentUser } from 'utils/currentUser';
import { actions as loginActions } from 'store/sagas/app/auth/login';
import { actions as meActions } from 'store/sagas/app/me';
import { connect } from 'react-redux';
import Posts from 'pages/Posts';
import Post from 'pages/Post';
import PublicPost from 'pages/Post/PublicPost';
import PrivatePost from 'pages/Post/PrivatePost';

function App(props) {
  const {
    getMe,
    setAuthStatus,
    isAuth,
    user,
    showLoginModal,
    showRegisterModal,
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
          <ProtectedRoute
            protectedRole={['USER', 'ADMIN']}
            exact
            path='/post/:postId'
            component={Post}
          />
          <Route exact path='/post/public/:postId' component={PublicPost} />
          <ProtectedRoute
            protectedRole={['USER', 'ADMIN']}
            exact
            path='/post/private/:postId'
            component={PrivatePost}
          />
          <Redirect to='/' />
        </Switch>
      </Router>
      <ToastContainer position='top-right' autoClose={3000} />

      {showLoginModal && <Login />}
      {showRegisterModal && <Register />}
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state?.app?.auth?.login?.isAuth,
  user: state?.app?.me?.index.user,
  showLoginModal: state.app.auth.login.modal,
  showRegisterModal: state.app.auth.register.modal,
});

const mapDispatchToProps = {
  getMe: meActions.me,
  setAuthStatus: loginActions.setAuthStatus,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
