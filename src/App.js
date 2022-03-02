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
import { actions as socketActions } from 'store/sagas/app/socket';
import { actions as notificationActions } from 'store/sagas/app/notifications';
import { connect } from 'react-redux';
import Posts from 'pages/Posts';
import PublicPost from 'pages/Post/PublicPost';
import PrivatePost from 'pages/Post/PrivatePost';
import Favorites from 'pages/Favorites';
import Settings from 'pages/Settings';
import ResetPw from 'pages/Auth/ResetPw';
import CreatePost from 'pages/Posts/Create/index';
import Dashboard from 'pages/Dashboard';
import { io } from 'socket.io-client';

function App(props) {
  const {
    getMe,
    setAuthStatus,
    isAuth,
    showLoginModal,
    showRegisterModal,
    showForgotModal,
    clearUserState,
    connectSocket,
    user,
    getNotifications,
    addNotification,
  } = props;

  useEffect(() => {
    checkUser();
  }, [isAuth]);

  useEffect(() => {
    const socket = io('http://localhost:8080');

    // client-side
    socket.on('connect', () => {
      console.log('connected');
      connectSocket(socket);

      socket.emit('newUser', {
        userId: user?._id,
        socketId: socket.id,
        userName: user?.name,
      });
      socket.on('newNotification', (data) => {
        addNotification(data);
      });

      socket.on('disconnect', () => {
        console.log('user disconnect');
      });
    });
  }, [user]);

  const checkUser = () => {
    const user = getCurrentUser();

    if (user?.userId) {
      setAuthStatus({ isAuth: true, token: user.token });
      getMe();
      getNotifications();
    } else {
      setAuthStatus({ isAuth: false, token: null });
      clearUserState();
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
            path='/posts/create'
            component={CreatePost}
          />
          <ProtectedRoute
            protectedRole={['USER', 'ADMIN']}
            exact
            path='/posts/update/:postId'
            component={CreatePost}
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
          <ProtectedRoute
            protectedRole={['ADMIN']}
            path='/dashboard'
            component={Dashboard}
          />
          <Route exact path='/user/reset-password/:token' component={ResetPw} />
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
  clearUserState: meActions.clearUserState,
  setAuthStatus: loginActions.setAuthStatus,
  connectSocket: socketActions.connectSocketSuccess,
  getNotifications: notificationActions.getNotifications,
  addNotification: notificationActions.addNotification,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
