import React from 'react';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import { baseTheme } from "../../theme/theme";

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
          <Button style={{ background: '#000' }} type="primary" shape="circle" icon="file-add" onClick={this.onUploadFileClick} />
        </div>
      </MessageBoxContainer>
    )
  }
}

const MessageBoxContainer = styled.div`
  position: fixed !important;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  justify-content: flex-end;
  bottom: 0px !important;
  left: 0px;
  right: 0px;
  max-width: 60rem;
`;