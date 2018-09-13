import React from "react";
import styled from "styled-components";
import theme from "../../theme/theme";
import ParticipantChip from "../atoms/ParticipantChip";

export default props => (
  <ParticipantsContainer>
    <ParticipantsNames>
      {
        props.participants.map((participant, key) =>
          <ParticipantChip participant={participant} key={key} />
        )
      }
    </ParticipantsNames>
  </ParticipantsContainer>
);

const ParticipantsContainer = styled.div`
  background: ${theme.background};
  color: ${theme.foreground};
  text-align: start;
`;

const ParticipantsNames = styled.div`
  margin-bottom: 0.4em;
`;

const ChannelInfo = styled.div`
  color: ${theme.foregroundDarker};
`;