import React from 'react';
import { styled } from "styled-components";
import { baseTheme } from "../../theme/theme";

export const UserProfile = props => (
  <UserProfileContainer>
    <UserNameContainer>
      {props.name}
    </UserNameContainer>
    <UserDescriptionContainer>
      {props.description}
    </UserDescriptionContainer>
  </UserProfileContainer>
);

const UserProfileContainer = styled.div`
  padding: ${baseTheme.paddingContainer};
`;

const UserNameContainer = styled.h1`
  margin: ${baseTheme.marginContainer};
`;

const UserDescriptionContainer = styled.p`
  margin: ${baseTheme.marginContainer};
`;