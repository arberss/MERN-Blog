import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import threeDots  from '../../assets/img/three-dots.svg';

const CustomBtn = styled(IconButton)(() => ({
  '&.MuiButtonBase-root': {
    width: '30px',
    height: '30px',
  },
}));

const DropDownMenu = (props) => {
  const { lists, tooltip = '', className } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={`DropDownMenu ${className || ''}`}>
      <Box sx={styles.content}>
        <Tooltip title={tooltip}>
          <CustomBtn onClick={handleClick} size='small' sx={{ ml: 2 }}>
            <img src={threeDots} className='DropDownMenu__dots' alt='' />
          </CustomBtn>
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
        <ul className='DropDownMenu__lists'>
          {lists?.map((list, index) => {
            return (
              <li
                className='DropDownMenu__list'
                onClick={() => list.fn()}
                key={index}
              >
                {list?.name}
              </li>
            );
          })}
        </ul>
      </Menu>
    </div>
  );
};

export default DropDownMenu;

const styles = {
  menu: {
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 0.5,
      '& .MuiAvatar-root': {
        width: 20,
        height: 20,
      },
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
};
