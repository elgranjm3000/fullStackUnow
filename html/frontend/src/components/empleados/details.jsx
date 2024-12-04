import React from 'react';
import { Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const Detail = ({ empleado,open,onClose }) => {
  if (!empleado) {
    return <Typography variant="body1">Selecciona un empleado para ver los detalles</Typography>;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Detalles del Empleado</DialogTitle>
      <DialogContent>
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h5">{`${empleado.nombre} ${empleado.apellido}`}</Typography>
          <Typography variant="body1">Puesto: {empleado.puesto}</Typography>
          <Typography variant="body1">Fecha de Nacimiento: {empleado.fechaNacimiento}</Typography>
          <Typography variant="body1">Email: {empleado.email}</Typography>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Detail;
