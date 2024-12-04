import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    // Aplica estilos globales a través de los componentes
    MuiCssBaseline: {
      styleOverrides: {
        // Estilos para el #root
        '#root': {
          width: '100%',
          height: '100vh', // Opcional: ocupa toda la altura
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

export default theme;
