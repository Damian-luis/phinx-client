import React, { useState } from 'react';
import { Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

const FloatingButtonWithDialog = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNavigateToHistory = () => {
    setOpen(false);
    navigate('/battles');
  };

  return (
    <>
      <Fab color="success" aria-label="info" onClick={handleClickOpen} style={{ position: 'fixed', bottom: 16, right: 16 }}>
        <InfoIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Acerca de la App</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Esta aplicación permite que los Pokémon luchen entre sí. Cada batalla se guarda en una base de datos y puedes ver el historial de batallas.
          </Typography>
          <Typography variant="body1" style={{ marginTop: '10px' }}>
            Accede al historial de batallas desde el siguiente enlace:
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNavigateToHistory} color="success">
            Ver Historial de Batallas
          </Button>
          <Button onClick={handleClose} color="error">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FloatingButtonWithDialog;
