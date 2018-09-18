import React from 'react';
import styled from "styled-components";
import { Form, Icon, Input, Button, Upload } from 'antd';
import { Redirect } from "react-router-dom";
import { createUser, loadProfile } from '../../lib/lib'
import FormItem from 'antd/lib/form/FormItem';
import { baseTheme } from "../../theme/theme";

class CreateUserForm extends React.Component {

  state = {
    name: '',
    picture: '',
    id: '',
    ready: false
  }

  handleNameChange = ev => {
    this.setState({
      name: ev.target.value
    })
  }

  handleCreateUser = () => {
    createUser(this.state.name, this.state.picture, 'smckmsdc');
    this.setState({
      ready: true
    });
  }

  handleImportUser = ipfsCID => {
    console.log('import user profile from ipfs cid: ', ipfsCID);
    // loadProfile({});
  }

  handlePhotoUpload = ev => {
    console.log('handlePhotoUpload', ev.fileList);
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.state.ready) {
      return <Redirect to="/chat" />
    }

    return (
      <FormContainer>
        <FormHeader>
          Create Yourself
        </FormHeader>

        <FormRow>
          <FormLabel for="name">Name</FormLabel>
          <FormInput id="name" name="name" type="text" placeholder="Your name"
            value={this.state.name} onChange={this.handleNameChange} />
        </FormRow>

        <FormRow>
          <FormLabel for="name">Photo</FormLabel>
          <FormInput id="name" name="name" type="text" placeholder="Your name"
            value={this.state.name} onChange={this.handleNameChange} />
        </FormRow>

        <FormRow>

          <FormQRCode>
            <FormDownloadQRCodeButton>
              Download it
            </FormDownloadQRCodeButton>
          </FormQRCode>
        </FormRow>
      </FormContainer>
    );

    return (
      <Form onSubmit={this.handleCreateUser} style={{
        maxWidth: '60rem'
      }}>
        <FormItem label="Username" >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username' }],
          })(
            <Input
              onChange={this.handleNameChange}
              value={this.state.name}
              prefix={
                <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="Username" />
          )}
        </FormItem>
        <FormItem
          label="Upload a photo"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.handlePhotoUpload,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Upload
              </Button>
            </Upload>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" onClick={this.handleCreateUser}>
            Create
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const FormContainer = styled.form`
  background-color: ${baseTheme.colorBackground};
  color: ${baseTheme.colorForeground};
  border-radius: 5px;
  margin: 10px;
  max-width: 60rem;
`;

const FormHeader = styled.h1`
  margin-bottom: 18px;
`;

const FormRow = styled.div`
  margin-bottom: 32px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
`;

const FormLabel = styled.label`
  margin-bottom: 16px;
  font-size: 18px;
`;

const FormInput = styled.input`
  background-color: ${baseTheme.colorBackgroundDarker};
  color: ${baseTheme.colorForeground};
  border: none;
  border-radius: 6px;
  width: 100%;
  padding: 6px;
  font-size: 14px;
`;

const FormQRCode = styled.div`

`;

const FormDownloadQRCodeButton = styled.button`
  background-color: ${baseTheme.topBarColorBackground};
  color: ${baseTheme.colorAccent};
  border: none;
  border-radius: 6px;
  padding: 8px;
  min-width: 128px;
  font-size: ${baseTheme.buttonFontSize};
`;

const CreateUser = Form.create()(CreateUserForm);

export default CreateUser;