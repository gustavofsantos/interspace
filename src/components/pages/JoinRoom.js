import React from 'react';
import QRCode from "qrcode.react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import QrReader from 'react-qr-reader'
import styled from 'styled-components';
import theme from '../../theme/theme';

export default class JoinRoom extends React.Component {
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

  render() {
    return (
      <JoinRoomContainer>
        <div>
          <TextField
            autoFocus
            placeholder="channel"
            value={this.state.channel}
            onChange={this.handleChannelChange}
            onKeyDown={this.handleChannelSubmit}
          />
          <TextField
            placeholder="your name"
            value={this.state.name}
            onChange={this.handleNameChange}
            onKeyDown={this.handleNameSubmit}
          />
        </div>
        <Button onClick={this.handleChannelSubmit} variant="outlined">
          join
        </Button>
        <Button onClick={this.handleChanelQRCodeReader} variant="outlined">
          read
        </Button>
        <div>
          {
            this.state.reader ?
              <QrReader
                onError={() => console.log('error')}
                onScan={data => console.log('scan', data)}
              />
              :
              <QRCode value={this.state.channel}
                fgColor={theme.accent}
                bgColor={theme.backgroundDarker}
              />
          }
        </div>
      </JoinRoomContainer>
    );
  }
}

const JoinRoomContainer = styled.div`
  background: ${theme.backgroundDarker};
  color: ${theme.foreground};
  padding-top: 60px;
  display: inline-block;
  max-width: 60rem;
  width: 100vw;
`;
