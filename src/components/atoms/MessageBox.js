import React from 'react';
import styled from 'styled-components';
import theme from "../../theme/theme";

export default class MessageBox extends React.Component {
  state = {
    message: ''
  }

  onChange = ev => {
    this.setState({ message: ev.target.value })
  }

  onSubmit = (ev) => {
    if (ev.keyCode === 13) {
      this.props.handleSubmit(this.state.message);
      this.setState({ message: '' })
    }
  }

  render() {
    return (
      <MessageBoxContainer>
        <input style={{
          width: '100%',
          display: 'inline-block',
          padding: '0.8em',
          borderTopWidth: '1px',
          borderTopColor: '#555',
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom:'none',
          color: `${theme.foreground}`,
          background: `${theme.background}`
        }}
        type="text"
        name="message"
        value={this.state.message}
        onChange={this.onChange.bind(this)}
        onKeyDown={this.onSubmit.bind(this)} />
      </MessageBoxContainer>
    )
  }
}

const MessageBoxContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  max-width: 60rem;
  width: 100vw;
  text-align: center;
  position: fixed;
  border-left: ${theme.accent};
  bottom: 0;
  padding-bottom: 0;
`;