import React from "react";
import styled from "styled-components";
import theme from "../../theme/theme";

export default props => (
  <MessageBox>
    <MessageSender>
      #{props.sender.name || "anon"}
    </MessageSender>
    <MessageText>
      {props.text}
    </MessageText>
  </MessageBox>
);

const MessageBox = styled.div`
  background-color: ${theme.dark.backgroundDarker};
  max-width: 24rem;
  text-align: start;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const MessageSender = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-weight: bold;
  color: ${theme.dark.foreground};
  margin-right: 0.6em;
`;
  
const MessageText = styled.span`
  font-family: 'Roboto Mono', monospace;
  color: ${theme.dark.foreground};
  padding-top: 5px;
`;