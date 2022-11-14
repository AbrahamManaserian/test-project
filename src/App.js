import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './containerPages/HomePage';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat'
    ].join(','),
    h1:{
      fontSize:'24px',
      fontWeight:600,
      height:'36px'
    },
    h2:{
      fontSize:'16px',
      fontWeight:600
    },
    h3:{
      fontSize:'16px',
      fontWeight:500
    },
    button:{
        fontSize:'16px',
        fontWeight:700
    }
  },
  components:{
    MuiButton:{
      styleOverrides:{
        outlined:{
          color:'#18397A',
          borderColor:'#18397A',
          '&:hover':{
            borderColor:'#18397A',
            backgroundColor:'white'
          },
          height:'48px',
          
        },
        contained:{
          backgroundColor:'#18397A',
          '&:hover':{
            backgroundColor:'#18397A',
          },
          height:'48px',
        },
      }
    },
    
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  
]);

function App() {
  
  return (
    <ThemeProvider theme={theme}>
       <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
