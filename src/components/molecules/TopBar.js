import React from "react";
import styled from "styled-components";
import QRCode from "qrcode.react";
import theme from "../../theme/theme";

export default props => (
  <TopBarDiv>
    {console.log(theme)}
    <Title>
      {props.title ? props.title : "interspace"}
    </Title>
    <QRCodeButtonContainer onClick={() => console.log('should open qrcode')}>
      <QRCode value={props.channel} style={{ width: "100%", height: "100%" }} />
    </QRCodeButtonContainer>
  </TopBarDiv>
);

const TopBarDiv = styled.div`
  background-color: ${theme.dark.background};
  color: ${theme.dark.foreground};

  border: 1px;
  border-bottom: ${theme.dark.backgroundDarker};
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  z-index: 24;

  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  flex: auto;

  width: 100%;
  height: 24px;
  min-height: 64px;
  margin: 0px auto;
`;

const Title = styled.a`
  color: ${theme.dark.foreground};
  margin-left: 24px;
  font-family: 'VT323', monospace;
`;

const QRCodeButtonContainer = styled.div`
  max-width: 24px;
  max-height: 24px;
  margin-right: 24px;
`