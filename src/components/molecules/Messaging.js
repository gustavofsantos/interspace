import React from 'react'
import styled from 'styled-components';
import Message from '../atoms/Message';

export default Messaging = props => (
  <MessagesContainer>
    {
      props.messages.map((message, key) =>
        <Message sender={message.author} text={message.message} key={key} />
      )
    }
  </MessagesContainer>
);

const MessagesContainer = styled.div`
  padding-bottom: 3.2rem;
`;