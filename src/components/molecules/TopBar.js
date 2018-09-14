import React from "react";
import QRCode from "qrcode.react";

import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from "../../theme/theme";
import { DialogContent } from "@material-ui/core";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class TopBar extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      showcode: false
    }

    this.bindItems = this.bindItems.bind(this);

    this.bindItems();
  }

  bindItems() {
    this.handleOpenQRCodeDialog = this.handleOpenQRCodeDialog.bind(this);
    this.handleCloseQRCodeDialog = this.handleCloseQRCodeDialog.bind(this);
  }

  handleOpenQRCodeDialog() {
    this.setState({ showcode: true });
  }

  handleCloseQRCodeDialog() {
    this.setState({ showcode: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <span>
          {this.props.channel || "interspace"}
        </span>
        {
          this.props.channel ? 
            <Button color="inherit" onClick={this.handleOpenQRCodeDialog}>QRCode</Button>
            :
            <div></div>
        }
        <Dialog
          open={this.state.showcode}
          onClose={this.handleCloseQRCodeDialog} >
          <DialogContent>
            <QRCode value={this.props.channel} style={{ width: "100%", height: "100%" }} />
          </DialogContent>
        </Dialog>
      </div>
      
    );
  }
}

{/* <MuiThemeProvider theme={theme}>
        <div className={ classes.root }>
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {this.props.channel || "interspace"}
              </Typography>
              {
                this.props.channel ? 
                  <Button color="inherit" onClick={this.handleOpenQRCodeDialog}>QRCode</Button>
                  :
                  <div></div>
              }
            </Toolbar>
          </AppBar>

          <Dialog
            open={this.state.showcode}
            onClose={this.handleCloseQRCodeDialog} >
            <DialogContent>
              <QRCode value={this.props.channel} style={{ width: "100%", height: "100%" }} />
            </DialogContent>
          </Dialog>
        </div>
      </MuiThemeProvider> */}

export default withStyles(styles)(TopBar);