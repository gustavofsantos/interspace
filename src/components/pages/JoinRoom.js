import React from 'react';
import QRCode from "qrcode.react";
import styled from 'styled-components';
import theme from '../../theme/theme';


export default class JoinRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: '',
      name: ''
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

  render() {
    return (
      <JoinRoomContainer>
        <div>
          <TextInputLabel>
            channel name:
          </TextInputLabel>
          <TextInput 
            autoFocus
            value={this.state.channel}
            onChange={this.handleChannelChange}
            onKeyDown={this.handleChannelSubmit} />
        </div>
        <div>
          <TextInputLabel>
            your name:
          </TextInputLabel>
          <TextInput
            value={this.state.name}
            onChange={this.handleNameChange}
            onKeyDown={this.handleNameSubmit} />
        </div>
        <div>
          <QRCode value={this.state.channel} 
            fgColor={theme.accent}
            bgColor={theme.backgroundDarker}/>
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
 
const TextInput = styled.input`
  color: ${theme.foreground};
  background: none;
  border: none;
  padding: 0.2em;
  margin-left: 10px;
  font-family: 'Roboto Mono', monospace;
`;

const TextInputLabel = styled.span`
  font-family: 'Roboto Mono', monospace;
`;

const Button = styled.button`
  padding: 0.4em;
`;