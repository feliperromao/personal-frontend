import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DeleteDialogProps {
  isOpen: boolean;
  handleCloseDeleteialog: (confirm: boolean) => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ isOpen, handleCloseDeleteialog}) => {
  const handleCloseConfirm = () => {
    handleCloseDeleteialog(true);
  };

  const handleCloseDisagree = () => {
    handleCloseDeleteialog(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Excluir Usuario"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h3>Tem certeza de que deseja excluir?</h3>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisagree}>Não</Button>
          <Button onClick={handleCloseConfirm} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DeleteDialog;