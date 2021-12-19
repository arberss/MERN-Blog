import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ReactComponent as NotificationIcon } from 'assets/img/notifications.svg';

const Notification = (props) => {
  const { navigate, className, fill = '#757575', data } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      >
        {data?.map((dt) => {
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
        })}
      </Menu>
    </div>
  );
};

export default Notification;
