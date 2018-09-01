import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../theme/theme';


export default class JoinRoom extends React.Component {

  state = {
    channel: ''
  }

  handleJoinClick = ev => {
    console.log('handle join click');
    console.log('channel: ', this.state.channel);
  }

  handleCreateClick = ev => {
    console.log('handle create click');
  }

  handleChannelChange = ev => {
    this.setState({ channel: ev.target.value });
  }

  render() {
    return (
      <JoinRoomContainer>
        <input onChange={this.handleChannelChange} onSubmit={this.handleJoinClick}/>
        <Link to={{ pathname: "/chat", state: { channel: this.state.channel } }}>
          join
        </Link>
        <Button onClick={this.handleCreateClick}>
          create
        </Button>
      </JoinRoomContainer>
    );
  }
}

const JoinRoomContainer = styled.div`
  background: ${theme.light.backgroundDarker};
  padding-top: 60px;
  display: inline-block;
  max-width: 60rem;
  width: 100vw;
`;

const Button = styled.button`
  padding: 0.4em;
`;