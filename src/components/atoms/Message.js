import React from "react";
import styled from "styled-components";
import { baseTheme } from "../../theme/theme";

export default props => {
  if (props.isFile) {
    return MessageFileContainer(props);
  } else {
    return MessageTextContainer(props);
  }
};

const MessageTextContainer = props => (
  <MessageBox>
    <MessageSender>
      {props.sender.name || "anon"}:
    </MessageSender>
    <MessageText>
      {props.text}
    </MessageText>
  </MessageBox>
);

const MessageFileContainer = props => (
  <MessageBox>
    <MessageSender>
      {props.sender.name || "anon"}:
    </MessageSender>
    <MessageFileLink onClick={props.downloadFile(props.text)}>
      {props.text}
    </MessageFileLink>
  </MessageBox>
);

const MessageBox = styled.div`
  background-color: ${baseTheme.colorBackgroundDarker};
  max-width: 24rem;
  min-width: 6rem;
  text-align: start;
  padding: 5px;
  box-sizing: border-box;
`;

const MessageSender = styled.span`
  font-weight: bold;
  color: ${baseTheme.colorForeground};
  margin-right: 0.6em;
`;

const MessageText = styled.span`
  color: ${baseTheme.colorForeground};
  padding-top: 5px;
`;

const MessageFileLink = styled.a`
  color: ${baseTheme.colorAccentDarker}
`;