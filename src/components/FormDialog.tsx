import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface FormDialogProps {
  formDialogIsOpen: boolean;
  handleCloseFormDialog: () => void;
  handleSubmitForm: (event: React.FormEvent<HTMLFormElement> ) => void;
}

const FormDialog: React.FC<FormDialogProps> = ({ formDialogIsOpen, handleCloseFormDialog, handleSubmitForm}) => {
  return (
    <React.Fragment>
      <Dialog
        open={formDialogIsOpen}
        onClose={handleCloseFormDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleSubmitForm(event)
            handleCloseFormDialog();
          },
        }}
      >
        <DialogTitle>Cadatro de Alunos</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nome"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="E-mail"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Senha"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFormDialog}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default FormDialog;