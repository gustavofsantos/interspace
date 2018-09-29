import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Layout } from "antd";

import TopBar from './components/molecules/TopBar';
import Chat from './components/molecules/Chat';
import Loading from './components/atoms/Loading';
import CreateUser from './components/pages/CreateUser';
import ImportUser from './components/pages/ImportUser';
import JoinRoom from './components/pages/JoinRoom';
import AppBar from './components/molecules/AppBar';
import Feed from './components/pages/Feed';

const { Header, Content } = Layout;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myId: '',
      channel: ''
    }

    this.ipfs = new window.Ipfs({
      EXPERIMENTAL: {
        pubsub: true
      },
      config: {
        Addresses: {
          Swarm: [
            '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star', 
            '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ'
          ]
        }
      }
    });

    if (this.ipfs.on) { 
      this.ipfs.on('ready', async () => {
        const id = await this.ipfs.id();
        this.setState({ myId: id.id });
      })
    } else {
      this.ipfs.id().then(id => {
        this.setState({ myId: id.id });
      })
    }

    this.handleChannel = this.handleChannel.bind(this);
  }

  handleChannel(channel) {
    this.setState({ channel });
  }

  render() {
    return (
      <div>
        <AppBar show={true} />
        <Layout style={{
          height: '100vh'
        }}>
          <Header style={{
            background: '#000',
            color: '#FFF'
          }}>
          </Header>
          <Content>
            <Router>
              <div>
                <Route exact path="/" component={() => (<Loading loading={this.state.myId ? false : true} label="loading" />)} />
                <Route path="/createuser" component={CreateUser} />
                <Route path="/importuser" component={ImportUser} />
                <Route path="/feed" component={Feed} />
                <Route path="/chat" component={() => (
                  <Chat ipfs={this.ipfs}
                    myId={this.state.myId}
                    handleChannel={this.handleChannel} />)} />
                <Route path="/join" component={() => (<JoinRoom handleChannel={this.handleChannel} />)} />
              </div>
            </Router>
          </Content>
        </Layout>
      </div>
    );
  }
}
