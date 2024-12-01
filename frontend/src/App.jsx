import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import EmpleadoPage from './components/empleados/page'
import Login from './components/login';
import theme from './theme';
import PrivateRoute from './components/guards/private';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'


function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <EmpleadoPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App
