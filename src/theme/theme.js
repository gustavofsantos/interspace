import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#1a1a1a',
      main: '#000',
      dark: '#000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#66ffa6',
      main: '#00e676',
      dark: '#00b248',
      contrastText: '#000',
    },
  },
});

const theme1 = {
  topBarColorBackground: "#212121",
  topBarColorForeground: "#fffdf6",
  colorBackground: "#f9f9f9",
  colorBackgroundDarker: "#d9d9d9",
  colorForeground: "#323232",
  colorForegroundDarker: "#212121",
  colorAccent: "#14ffec",
  colorAccentDarker: "#0d7377",
  labelFontSize: "16px",
  inputFontSize: "16px",
  headingFontSize: "18px",
  buttonFontSize: "16px",
  paddingContainer: "16px",
  marginContainer: "20px",
}

export const baseTheme = theme1;

export default theme;