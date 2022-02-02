import { createTheme } from "@mui/material/styles";
import { red, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: red[700],
      light: grey[50],
      dark: grey[900],
      contrastText: "#fff",
    },
    secondary: {
      main: red[600],
      light: grey[300],
      dark: grey[900],
      contrastText: "#fff",
    },
    text: {
      light: grey[50],
      link: red[300],
    },
  },
});

export default theme;
