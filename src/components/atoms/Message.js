import React from "react";
import styled from "styled-components";
import theme from "../../theme/theme";

export default props => (
    <MessageBox>
        <MessageSender>
            {props.sender}
        </MessageSender>
        <MessageText>
            {props.text}
        </MessageText>
    </MessageBox>
);

const MessageBox = styled.div`
    background-color: ${theme.light.backgroundDarker};
    max-width: 24rem;
    border-color: #333;
    border-radius: 0.6rem;
    text-align: start;
    margin-top: 24px;
    margin-bottom: 24px;
`;

const MessageSender = styled.p`
    padding: 10px
    color: ${theme.light.foregroundDarker}
`;

const MessageText = styled.p`
    color: ${theme.light.foreground}
    padding: 10px
`;