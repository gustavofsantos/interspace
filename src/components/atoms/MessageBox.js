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
          borderColor: theme.foreground,
          borderRadius: '2em',
          color: `${theme.foreground}`,
          background: `${theme.backgroundDarker}`
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
  margin-bottom: 1em;
`;