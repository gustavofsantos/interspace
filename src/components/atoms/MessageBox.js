import React from 'react';
import { Input, Button } from 'antd';
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

  onUploadFileClick = ev => {
    console.log('onUploadFileClick')
  }

  render() {
    return (
      <MessageBoxContainer>
        <div style={{
          display: 'flex',
          flex: '1 1 auto',
          marginRight: '0.5em'
        }}>
          <Input 
            placeholder="message"
            value={this.state.message}
            onChange={this.onChange.bind(this)}
            onKeyDown={this.onSubmit.bind(this)}
          />
        </div>
        <div style={{
          display: 'block'
        }}>
          <Button type="primary" shape="circle" icon="file-add" onClick={this.onUploadFileClick} />
        </div>
      </MessageBoxContainer>
    )
  }
}

const MessageBoxContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  margin-bottom: 0em;
  justify-content: flex-end;
`;