import React from 'react';
import styled from 'styled-components';

export default class AppBar extends React.Component {
  state = {
    menuState: false
  };

  handleShowMenu = () => {
    this.setState(prevState => ({
      menuState: !prevState.menuState
    }));
  };

  render() {
    if (this.props.show) {
      return (
        <TopBar>
          <Navigation>
            <Logo>
              interspace
            </Logo>
            <TopBarMenu>
              <TopBarMenuButton onClick={this.handleShowMenu}>
                <a>menu</a>
              </TopBarMenuButton>
              {
                this.state.menuState ?
                  <div>
                    <MenuView>
                      <p>teste 1</p>
                      <p>teste 2</p>
                      <p>teste 3</p>
                      <QRCodeContainer>
                        <p>qr code</p>
                      </QRCodeContainer>
                    </MenuView>
                    <BackgroundScreenMenu />
                  </div>
                  :
                  <div />
              }
            </TopBarMenu>
          </Navigation>
        </TopBar>
      );
    } else {
      return (
        <div />
      );
    }
  }
}

const TopBar = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1024;
  font-size: 17px;
  height: 48px;
  position: fixed;
  background: #000;
  border-bottom: 1px solid rgba(0,0,0,0.33);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.13);
`;

const Navigation = styled.nav`
  display: block;
  color: #FFF;
`;

const Logo = styled.a`
  display: inline-block;
  margin-left: 2%;
  margin-top: 2%;
  margin-bottom: 2%;
`;

const TopBarMenu = styled.div`
  display: block;
  position: absolute;
  right: 0px;
  top: 0px;
`;

const TopBarMenuButton = styled.a`
  color: #FFF;
  display: inline-block;
  margin-left: 2%;
  margin-top: 2%;
  margin-bottom: 2%;
`;

const MenuView = styled.div`
  position: absolute;
  right: -3px;
  padding: 5px 10px;
  text-align: left;
  color: #FFF;
  background: #000;
  border: 1px solid #dbdee1;
  border-top: 0px;
  display: block;
  width: calc(100vw - 18px);
  top: 45px;
`;

const BackgroundScreenMenu = styled.div`
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(17,17,17,0.88);
  z-index: -5;
  top: 40px;
`;

const QRCodeContainer = styled.div`
  margin: 10px;
`;