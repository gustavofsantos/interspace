import React from 'react';
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { userCreateProfile } from '../../lib/lib'
import { baseTheme } from "../../theme/theme";

export default class CreateUserForm extends React.Component {

  state = {
    name: '',
    description: '',
    id: '',
    ready: false
  }

  handleNameChange = ev => {
    this.setState({
      name: ev.target.value
    })
  }

  handleDescriptionChange = ev => {
    this.setState({
      description: ev.target.value
    });
  }

  handleCreateUser = (ev) => {
    ev.preventDefault();
    userCreateProfile(this.state.name, this.state.description)
    .then(user => {
      console.log('created user: ', user);
    })
    // this.setState({
    //   ready: true
    // });
  }

  handleImportUser = ipfsCID => {
    console.log('import user profile from ipfs cid: ', ipfsCID);
    // loadProfile({});
  }

  handlePhotoUpload = ev => {
    console.log('handlePhotoUpload', ev.fileList);
  }

  render() {

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
          <FormLabel for="name">Description</FormLabel>
          <FormInput id="name" name="name" type="text" placeholder="Your description"
            value={this.state.description} onChange={this.handleDescriptionChange} />
        </FormRow>

        <FormRow>
          <FormButton onClick={this.handleCreateUser}>
            Create
          </FormButton>
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

const FormButton = styled.button`

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