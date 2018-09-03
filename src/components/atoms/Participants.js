import React from "react";
import styled from "styled-components";
import theme from "../../theme/theme";

export default props => (
  <ParticipantsContainer>
    <ParticipantsNames>
      {
        props.participants ?
          props.participants.map((participant, key) =>
            <span key={key}>{participant || 'anon'} </span>
          )
          :
          <p>you're alone</p>
      }
    </ParticipantsNames>
    <ChannelInfo>
      <p>@ {props.channel}</p>
    </ChannelInfo>
  </ParticipantsContainer>
);

const ParticipantsContainer = styled.div`
  background: ${theme.background};
  color: ${theme.foreground};
`;

const ParticipantsNames = styled.div`
  margin-bottom: 0.4em;
`;

const ChannelInfo = styled.div`
  color: ${theme.foregroundDarker};
`;