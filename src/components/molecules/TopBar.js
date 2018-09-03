import React from "react";
import styled from "styled-components";
import QRCode from "qrcode.react";

import Dialog from '@material-ui/core/Dialog';

import theme from "../../theme/theme";
import { DialogContent } from "@material-ui/core";

export default class TopBar extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      showcode: false
    }

    this.bindItems = this.bindItems.bind(this);

    this.bindItems();
  }

  bindItems() {
    this.handleOpenQRCodeDialog = this.handleOpenQRCodeDialog.bind(this);
    this.handleCloseQRCodeDialog = this.handleCloseQRCodeDialog.bind(this);
  }

  handleOpenQRCodeDialog() {
    this.setState({ showcode: true });
  }

  handleCloseQRCodeDialog() {
    this.setState({ showcode: false });
  }

  render() {
    return (
      <TopBarDiv>
        {console.log(theme)}
        <Title>
          interspace
        </Title>
        <QRCodeButtonContainer onClick={this.handleOpenQRCodeDialog}>
          <QRCode value={this.props.channel} style={{ width: "100%", height: "100%" }} />
        </QRCodeButtonContainer>
        <Dialog
          open={this.state.showcode}
          onClose={this.handleCloseQRCodeDialog} >
          <DialogContent>
            <QRCode value={this.props.channel} style={{ width: "100%", height: "100%" }} />
          </DialogContent>
        </Dialog>
      </TopBarDiv>
    );
  }
}

const TopBarDiv = styled.div`
  background-color: ${theme.background};
  color: ${theme.foreground};

  border: 1px;
  border-bottom: ${theme.backgroundDarker};
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
  color: ${theme.foreground};
  margin-left: 24px;
  font-family: 'VT323', monospace;
`;

const QRCodeButtonContainer = styled.div`
  max-width: 24px;
  max-height: 24px;
  margin-right: 24px;
`