import React from "react";
import styled from "styled-components";
import GridLoader from 'react-spinners/GridLoader';

export default props => (
  <LoadingContainer>
    <GridLoader
      color='#00e676'
      loading={props.loading} />
    <p>{props.label}</p>
  </LoadingContainer>
);

const LoadingContainer = styled.div`
  padding-top: 3.4rem;
  display: inline-block;
  max-width: 60rem;
`;