import React from 'react';
import { Form, Icon, Input, Button, Upload } from 'antd';
import { Redirect } from "react-router-dom";
import { createUser, loadProfile } from '../../lib/lib'
import FormItem from 'antd/lib/form/FormItem';

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

const CreateUser = Form.create()(CreateUserForm);

export default CreateUser;