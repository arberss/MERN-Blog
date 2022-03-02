import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import { actions as navigation } from 'store/sagas/app/navigation';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Nav from 'components/Nav';
import DashboardUsers from 'pages/Dashboard/Users/Users';
import ProtectedRoute from 'components/ProtectedRoute';

const Dashboard = (props) => {
  const { navigate, users } = props;

  let { path, url } = useRouteMatch();

  return (
    <div className='dashboard'>
      <Nav />
      <div className='container'>
        <div className='dashboard__content'>
          <ul className='dashboard__links'>
            <li
              className='dashboard__link'
              onClick={() => navigate(`${url}/users`)}
            >
              Users
            </li>
          </ul>
          <Switch>
            <ProtectedRoute path={`${path}/:link`} protectedRole={['ADMIN']}>
              <DashboardUsers users={users} />
            </ProtectedRoute>
          </Switch>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state?.app?.users?.index.users,
});
const mapDispatchToProps = {
  navigate: navigation.navigate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
