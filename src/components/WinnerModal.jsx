import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Grid, DialogActions } from '@mui/material';

const WinnerModal = ({ open, onClose, winner }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>¡Tenemos un ganador!</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <img src={winner.imageUrl} alt={winner.name} style={{ width: '150px', height: '150px' }} />
          </Grid>
          <Grid item>
            <Typography variant="h5">{winner.name} ha ganado la pelea</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WinnerModal;
