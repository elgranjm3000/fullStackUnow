import React, { useEffect, useState } from 'react';
import { getEmpleados } from '../../services/api';
import { Typography, Box, CircularProgress, Paper, List, ListItem, ListItemText } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from '@mui/material';

const ListEmpleados = ({ onSelectEmpleado, handleSelectEmpleado, empleados, loadSelectEmpleado, onEditEmpleado, handleDeleteEmpleado }) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect(() => {
    if (!empleados || empleados.length === 0) {
      getEmpleados()
        .then((response) => {
          loadSelectEmpleado(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching empleados:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [empleados, loadSelectEmpleado]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };




  if (loading) {
    return <CircularProgress />;
  }


  return (
    <Paper>
      <Typography variant="h5" component="h2" style={{ margin: '16px' }}>
        Lista de Empleados
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          minWidth: 1000,
          margin: '0 auto',
        }}
      >
        <Table sx={{ width: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Apellido</TableCell>
              <TableCell align="right">Cargo</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="center">Acción</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {empleados
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((empleado) => (
                <TableRow key={empleado.id}>
                  <TableCell component="th"
                    scope="row"
                    onClick={() => handleSelectEmpleado(empleado)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}>
                    {empleado.id}
                  </TableCell>
                  <TableCell align="right">{empleado.nombre}</TableCell>
                  <TableCell align="right">{empleado.apellido}</TableCell>
                  <TableCell align="right">{empleado.puesto}</TableCell>
                  <TableCell align="right">{empleado.email}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSelectEmpleado(empleado)}
                    >
                      Ver Detalles
                    </Button>

                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => onEditEmpleado(empleado)}
                    >Editar</Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteEmpleado(empleado.id)} 
                    >Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={empleados.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
};

export default ListEmpleados;
