import React, { useState, useEffect } from 'react';
import Table from 'components/Table';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions as usersAction } from 'store/sagas/app/users';
import { userColumns } from './userElements';
import RoleModal from './RoleModal';

const DashboardUsers = (props) => {
  const { fetchAllUsers, users, updateUserRole } = props;

  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSelectedRole('');
    setUserId(null);
    setOpen(false);
  };

  const handleSubmit = () => {
    updateUserRole({ userId, role: selectedRole, handleClose });
  };

  const actions = [
    {
      icon: 'edit',
      iconProps: { style: { fontSize: '18px' } },
      tooltip: 'Edit Client',
      onClick: (event, rowData) => {
        setSelectedRole(rowData?.role);
        setUserId(rowData?._id);
        handleOpen();
      },
    },
    {
      icon: 'delete',
      iconProps: { style: { fontSize: '18px' } },
      tooltip: 'Delete Client',
      onClick: (event, rowData) => console.log('clicked delete'),
    },
  ];

  return (
    <div>
      <RoleModal
        open={open}
        handleClose={handleClose}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        userId={userId}
        handleSubmit={handleSubmit}
      />
      <Table data={users} columns={userColumns} actions={actions} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state?.app?.users?.index.users,
});
const mapDispatchToProps = {
  fetchAllUsers: usersAction.fetchAllUsers,
  updateUserRole: usersAction.updateUserRole,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DashboardUsers));
