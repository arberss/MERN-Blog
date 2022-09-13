import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogComp({ isOpen, onClose, onConfirm, msg }) {
  return (
    <Dialog
      data-testid='dialog'
      open={isOpen}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle sx={{ fontSize: '1.8rem' }} id='alert-dialog-title'>
        {msg}
      </DialogTitle>
      <DialogActions>
        <Button sx={{ fontSize: '1.3rem' }} onClick={onClose}>
          Close
        </Button>
        <Button sx={{ fontSize: '1.3rem' }} onClick={onConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
