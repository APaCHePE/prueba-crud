import Productos from '../../view/Products';
import Header from "../Header/index";
// import "fontsource-roboto";
import { Paper, Container } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import './App.scss';


function App() {

  const theme = createMuiTheme({
    typography: {
      h1: {
      /* this will change the font size for h1, we can also do 
          it for others, */
        fontSize: "3rem",
      },
    },
    palette: {
      /* this is used to turn the background dark, but we have 
          to use Paper for this inOrder to use it. */
      type: "light",
      primary: {
       // main: colorName[hue],
       // we have to import the color first to use it
        main: '#0178fd',
      //   main: grey[500],
      },
      secondary: {
        main: '#c0c0c0',
      },
      background: {
        paper: {
          main: "#ffffff"
        }
      }
    },
  });

  return (
    
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "200vh" }}>
        <Container>
          <Header />
        </Container>
      </Paper>
    </ThemeProvider>
    
    // <div className="App">
    //   <header className="App-header">
    //     <p>lorem ipsum</p>

    //     <Productos />

    //   </header>
    // </div>
  );
}

export default App;
