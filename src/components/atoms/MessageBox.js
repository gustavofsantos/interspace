import React from 'react';
import styled from 'styled-components';

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
          border: 'none',
          borderRadius: '1.6rem',
          padding: '0.6rem',
          backgroundColor: '#555',
          
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
  max-width: 60rem;
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  padding-bottom: 1.6rem;
  boxShadow: 'box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.24)'
`;