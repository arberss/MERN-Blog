import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as loginAction } from 'store/sagas/app/auth/login';
import { actions as registerAction } from 'store/sagas/app/auth/register';
import { actions as navigation } from 'store/sagas/app/navigation';
import { actions as notificationActions } from 'store/sagas/app/notifications';
import UserMenu from './UserMenu';
import { ReactComponent as BookmarkIcon } from 'assets/img/bookmark.svg';
import Notification from 'components/Notification';

const Nav = (props) => {
  const {
    navigate,
    setLoginModal,
    setRegisterModal,
    isAuth,
    routePaths = ['/posts'],
    match,
    notifications,
    readNotification,
    user,
  } = props;

  return (
    <nav className={`nav ${routePaths?.includes(match.path) && 'nav__white'}`}>
      <div className='container'>
        <div className='nav__content'>
          <div className='nav__logo' onClick={() => navigate('/')}>
            Blog
          </div>
          <ul className='nav__menu'>
            {!isAuth ? (
              <>
                <li className='nav__list' onClick={() => setLoginModal(true)}>
                  Sign In
                </li>
                <li
                  className='nav__list nav__list--register'
                  onClick={() => setRegisterModal(true)}
                >
                  Get Started
                </li>
              </>
            ) : (
              <>
                {user?.role === 'ADMIN' && (
                  <div
                    className='nav__list nav__list--dashboard'
                    onClick={() => navigate('/dashboard/users')}
                  >
                    Dashboard
                  </div>
                )}
                <BookmarkIcon
                  className='nav__authIcon'
                  onClick={() => navigate('/post/favorites/')}
                />
                <Notification
                  data={notifications}
                  navigate={navigate}
                  readNotification={readNotification}
                />
                <UserMenu />
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state?.app?.auth?.login?.isAuth,
  notifications: state?.app?.notifications?.index?.notifications,
  user: state?.app?.me?.index.user,
});

const mapDispatchToProps = {
  setLoginModal: loginAction.setModal,
  setRegisterModal: registerAction.setModal,
  navigate: navigation.navigate,
  readNotification: notificationActions.readNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
