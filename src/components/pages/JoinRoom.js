import React from 'react';
import QrReader from 'react-qr-reader'

import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// custom components
import theme from '../../theme/theme';
import ButtonNormal from '../atoms/ButtonNormal';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class JoinRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: '',
      name: '',
      reader: false
    }
  }

  handleJoinClick = ev => {
    console.log('handle join click');
    console.log('channel: ', this.state.channel);
    this.props.handleChannel(this.state.channel);
  }

  handleChannelSubmit = ev => {
    if (ev.key === "Enter") {
      this.props.handleChannel(this.state.channel);
    }
  }

  handleNameSubmit = ev => {
    if (ev.key === "Enter" && this.validadeFields()) {
      this.props.handleChannel(this.state.channel, this.state.name);
    }
  }

  handleChannelChange = ev => {
    this.setState({ channel: ev.target.value });
  }

  handleNameChange = ev => {
    this.setState({ name: ev.target.value });
  }

  validadeFields = () => {
    if (this.state.channel.length > 0) {
        return true;
    } else {
      alert("you should provide an channel name");
      return false;
    }
  }

  handleChanelQRCodeReader = () => {
    this.setState({ reader: true })
  }

  handleScanData = data => {
    if (data) {
      this.setState({ channel: data.toString(), reader: false });
    }
  }

  handleScanError = (error) => {
    alert('scan error: ', error);
    if (error.name === "NotFoundError") {
      this.setState({ reader: false });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Paper className={classes.root} elevation={1}>
            <List>
              <ListItem>
                <TextField
                  autoFocus
                  fullWidth
                  placeholder="channel"
                  value={this.state.channel}
                  onChange={this.handleChannelChange}
                  onKeyDown={this.handleChannelSubmit}
                />
              </ListItem>
              <ListItem>
                <TextField
                  fullWidth
                  placeholder="your name"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  onKeyDown={this.handleNameSubmit}
                />
              </ListItem>
            </List>

            <div>
              <ButtonNormal onClick={this.handleChanelQRCodeReader} label="read" />
            </div>

            <div>
              {
                this.state.reader ?
                  <QrReader
                    delay={300}
                    onError={this.handleScanError}
                    onScan={this.handleScanData}
                  />
                  :
                  <div></div>
              } 
            </div>
          </Paper>
        </MuiThemeProvider>
        
      </div>
    );
  }
}

export default withStyles(styles)(JoinRoom);
