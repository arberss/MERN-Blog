import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ReactComponent as NotificationIcon } from 'assets/img/notifications.svg';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  paper: {
    top: '55px !important',
    minWidth: '168px !important',
    maxHeight: '250px !important',
    overflowY: 'auto !important',
  },
});

const Notification = (props) => {
  const styles = useStyles();

  const {
    navigate,
    className,
    fill = '#757575',
    data,
    readNotification,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    readNotification();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkUnRead = data.some((dt) => dt.isRead === false);

  return (
    <div className={`notification ${className || ''}`}>
      <Button
        id='basic-button'
        aria-controls='basic-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <NotificationIcon fill={fill} />
        {checkUnRead && <div className='notification__red'></div>}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        classes={{ paper: styles.paper  }}
      >
        {data?.length > 0 ? data?.map((dt) => {
          return (
            <MenuItem
              className='notification__msg'
              key={dt?._id}
              onClick={() =>
                navigate(`/post/${dt?.post?.postStatus}/${dt?.post?._id}`)
              }
            >
              {dt.message}
            </MenuItem>
          );
        }) : 
          <div className="notification__noData">No notification at the moment.</div>
        }
      </Menu>
    </div>
  );
};

export default Notification;
