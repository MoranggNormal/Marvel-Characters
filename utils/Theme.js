import { createTheme } from "@mui/material/styles";
import { red, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[50],
      light: red[300],
      dark: red[700],
    },
    secondary: {
      main: grey[900],
      light: grey[300],
      contrastText: "#fff",
    },
    text: {
      link: red[300],
    },
  },
});

export default theme;
