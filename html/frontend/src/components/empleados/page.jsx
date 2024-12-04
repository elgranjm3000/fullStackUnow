import React, { useState } from 'react';
import EmpleadoList from './list';
import EmpleadoDetail from './details';
import EmpleadoAdd from './empleadoAdd';
import { Grid, Container, Paper, Typography, Button } from '@mui/material';
import { deleteEmpleado } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const EmpleadoPage = () => {
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [editingEmpleado, setEditingEmpleado] = useState(null);
  const navigate = useNavigate();


  const handleSelectEmpleado = (empleado) => {
    setSelectedEmpleado(empleado);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenForm = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingEmpleado(null);
    setFormOpen(false);
  };

  const loadSelectEmpleado = (empleadosData) => {
    setEmpleados(empleadosData);
  };

  const handleAddEmpleado = (nuevoEmpleado) => {
    setEmpleados(prevEmpleados => [...prevEmpleados, nuevoEmpleado]);

  };

  const handleEditEmpleado = (empleadoEditado) => {
    setEmpleados(prevEmpleados =>
      prevEmpleados.map(empleado =>
        empleado.id === empleadoEditado.id ? empleadoEditado : empleado
      )
    );
    setEditingEmpleado(empleadoEditado);
    setFormOpen(true);
  };

  const handleDeleteEmpleado = async (empleadoId) => {
    try {
      await deleteEmpleado(empleadoId);
      setEmpleados((prevEmpleados) => prevEmpleados.filter((empleado) => empleado.id !== empleadoId));
    } catch (error) {
      console.error('Error deleting empleado:', error);
    }
  };


  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };


  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f4f7fc',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          textAlign: 'center',
          marginBottom: '24px',
          color: '#3f51b5',
        }}
      >
        Gestión de Empleados
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={logout}
      >
        Cerrar session
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={handleOpenForm}
      >
        Agregar Empleado
      </Button>

      <Grid container spacing={3} sx={{ flex: 1 }}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 2 }}>
            <EmpleadoList
              onSelectEmpleado={setSelectedEmpleado}
              handleSelectEmpleado={handleSelectEmpleado}
              empleados={empleados}
              loadSelectEmpleado={loadSelectEmpleado}
              onEditEmpleado={handleEditEmpleado}
              handleDeleteEmpleado={handleDeleteEmpleado}

            />
          </Paper>
        </Grid>
      </Grid>

      {selectedEmpleado && (
        <EmpleadoDetail
          empleado={selectedEmpleado}
          open={modalOpen}
          onClose={handleCloseModal}

        />
      )}

      <EmpleadoAdd
        open={formOpen}
        onClose={handleCloseForm}
        onAddEmpleado={handleAddEmpleado}
        onEditEmpleado={handleEditEmpleado}
        empleadoToEdit={editingEmpleado}
      />
    </Container>
  );
};

export default EmpleadoPage;
