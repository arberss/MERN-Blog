import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as logoutAction } from 'store/sagas/app/auth/logout';
import { actions as navigateActions } from 'store/sagas/app/navigation';

const UserMenu = (props) => {
  const { navigate, logout, user } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='userMenu'>
      <Box sx={styles.content}>
        <Tooltip title='Account settings'>
          <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
            {!user?.imageUrl ? (
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.name?.charAt(0)}
              </Avatar>
            ) : (
              <img className='userMenu__img' src={user?.imageUrl} alt='' />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={styles.menu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <ul className='userMenu__lists'>
          <li
            className='userMenu__list'
            onClick={() => navigate('/user/settings')}
          >
            Settings
          </li>
          <li className='userMenu__list' onClick={logout}>
            Log Out
          </li>
        </ul>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state?.app?.auth?.login?.isAuth,
  user: state?.app?.me?.index.user,
});

const mapDispatchToProps = {
  logout: logoutAction.logout,
  navigate: navigateActions.navigate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserMenu));

const styles = {
  menu: {
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 16,
        width: 10,
        height: 10,
        bgcolor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
};
