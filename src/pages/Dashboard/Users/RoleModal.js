import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DropDown from 'components/DropDown';
import Button from 'components/button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  px: 2,
  py: 3,
};

export const statusOpt = [
  {
    name: 'ADMIN',
    value: 'ADMIN',
  },
  {
    name: 'USER',
    value: 'USER',
  },
];

const RoleModal = (props) => {
  const { open, handleClose, selectedRole, setSelectedRole, handleSubmit } =
    props;

  return (
    <div className='roleModal'>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className='roleModal__title'>Change Role</div>
          <div className='roleModal__content'>
            <div className='roleModal__roles'>
              <DropDown
                value={selectedRole}
                handleChange={(e) => setSelectedRole(e.target.value)}
                label='Role'
                options={statusOpt}
                newClass='roleModal__dropdown'
                menuClass='roleModal__list'
                errorClass='errorClass'
              />
            </div>
            <Button
              title='Save'
              newClass='roleModal__btn'
              onClick={handleSubmit}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RoleModal;
