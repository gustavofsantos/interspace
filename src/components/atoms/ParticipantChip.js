import React from 'react';
import styled from 'styled-components';

export default props => (
  <ChipContainer color="magenta">{props.participant || 'anon'}</ChipContainer>
);

const ChipContainer = styled.div`
  background-color: #DDD;
  color: #444;
  border: none;
  border-radius: 12px;
`;