import React from 'react';
import Nav from 'components/Nav';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as settingsActions } from 'store/sagas/app/settings';
import Profile from './Profile';
import MyPosts from './MyPosts';

const Settings = (props) => {
  const { setActiveTab, activeTab } = props;

  return (
    <div className='settings'>
      <Nav />
      <div className='container'>
        <div className='settings__tabs'>
          <div
            className={`settings__tabs-btn ${
              activeTab === 'profile' ? 'settings__tabs-active' : ''
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </div>
          <div
            className={`settings__tabs-btn ${
              activeTab === 'posts' ? 'settings__tabs-active' : ''
            }`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </div>
        </div>

        {activeTab === 'profile' ? <Profile /> : <MyPosts />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeTab: state?.app?.settings?.index.activeTab,
});
const mapDispatchToProps = {
  updateUser: settingsActions.updateUser,
  setActiveTab: settingsActions.setActiveTab,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Settings));
