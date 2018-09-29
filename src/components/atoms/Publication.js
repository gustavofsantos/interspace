import React from "react";
import styled from "styled-components";
import { baseTheme } from "../../theme/theme";

export default props => (
  <PublicationContainer onClick={props.handlePublicationClick}>
    <PublicationTitle>
      {props.title}
    </PublicationTitle>
    <PublicationDate>
      {props.date}
    </PublicationDate>
    <PublicationContent>
      {props.content}
    </PublicationContent>

    <PublicationFooterContainer>
      <p>{props.hash}</p>
    </PublicationFooterContainer>
  </PublicationContainer>
);

const PublicationContainer = styled.div`
  background-color: ${baseTheme.colorBackground};
`;

const PublicationContent = styled.p`

`;

const PublicationTitle = styled.h4`

`;

const PublicationDate = styled.p`

`;

const PublicationFooterContainer = styled.div`
  bottom: 0px;
`;