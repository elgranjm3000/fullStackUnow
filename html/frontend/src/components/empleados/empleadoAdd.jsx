import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem,CircularProgress } from '@mui/material';
import { createEmpleado, updateEmpleado,positionEmpleado } from '../../services/api';  

const EmpleadoAdd = ({ open, onClose, onAddEmpleado, onEditEmpleado, empleadoToEdit }) => {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [puesto, setPuesto] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cargosList, setCargosList] = useState([]);
  const [loadingCargos, setLoadingCargos] = useState(false);

  useEffect(() => {
    if (empleadoToEdit) {
      setNombre(empleadoToEdit.nombre);
      setApellido(empleadoToEdit.apellido);
      setPuesto(empleadoToEdit.puesto);
      setFechaNacimiento(empleadoToEdit.fechaNacimiento);
      setEmail(empleadoToEdit.email);
    }else{
      setNombre('');
      setApellido('');
      setPuesto('');
      setFechaNacimiento('');
      setEmail('');
    }
  }, [empleadoToEdit]);


  useEffect(() => {
    const fetchPuestos = async () => {
      setLoadingCargos(true);
      try {
        const response = await positionEmpleado();
        setCargosList(response.data.data.positions);  
      } catch (error) {
        console.error('Error fetching puestos:', error);
      } finally {
        setLoadingCargos(false);
      }
    };

    fetchPuestos();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !apellido || !puesto || !fechaNacimiento || !email) {
      setError('Todos los campos son obligatorios');
      return;
    }
    const newEmpleado = { nombre, apellido, puesto, fechaNacimiento, email };

    try {
      if (empleadoToEdit) {
        const response = await updateEmpleado(empleadoToEdit.id, newEmpleado);
        onEditEmpleado(response.data.data);
      } else {
        const response = await createEmpleado(newEmpleado);
        onAddEmpleado(response.data.data);
      }
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      setError('Error al agregar el empleado. Intente nuevamente.');
    }
  };



  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Nuevo Empleado</DialogTitle>
      <DialogContent>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>} {/* Mostrar error */}

        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          fullWidth
          variant="outlined"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Apellido"
          fullWidth
          variant="outlined"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <Select
          label="Puesto"
          value={puesto}
          onChange={(e) => setPuesto(e.target.value)}
          disabled={loadingCargos} 
          fullWidth
        >
          <MenuItem value="" disabled>
    Seleccione cargo
  </MenuItem>
          {loadingCargos ? (
            <MenuItem value="">
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            cargosList.map((puestoname) => (
              <MenuItem key={puestoname} value={puestoname}>
                {puestoname}  
              </MenuItem>
            ))
          )}
        </Select>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Fecha de Nacimiento"
          type="date"
          fullWidth
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmpleadoAdd;