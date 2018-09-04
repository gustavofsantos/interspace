import React from "react";
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import theme from '../../theme/theme';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function ButtonNormal(props) {
  const { classes } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <Button onClick={props.onClick} variant="outlined" className={classes.button}>
        {props.label}
      </Button>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(ButtonNormal);