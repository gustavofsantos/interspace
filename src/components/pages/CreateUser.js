import React from 'react';
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { userCreateProfile, userLoadProfile } from '../../lib/lib'
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

  handleCreateUser = async () => {
    const user = await userCreateProfile(this.state.name, this.state.description)
    console.log('created user: ', user);
    if (user) {
      this.setState({
        ready: true
      });
    }
  }

  handleImportUser = ipfsCID => {
    console.log('import user profile from ipfs cid: ', ipfsCID);
    // loadProfile({});
  }

  handlePhotoUpload = ev => {
    console.log('handlePhotoUpload', ev.fileList);
  }

  checkOfflineProfile = async () => {
    const profile = await userLoadProfile();
    if (profile) {
      return (
        <div>
          <button>load user profile</button>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }

  render() {

    if (this.state.ready) {
      return <Redirect to="/feed" />
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

        <div>
          {this.checkOfflineProfile}
        </div>
      </FormContainer>
    );
  }
}

const FormContainer = styled.div`
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
  padding: 12px;
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
  background-color: ${baseTheme.colorBackgroundDarker};
  color: ${baseTheme.colorForeground};
  border: none;
  border-radius: 6px;
  padding: 8px;
  min-width: 128px;
  font-size: ${baseTheme.buttonFontSize};
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