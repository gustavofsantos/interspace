import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import TopBar from './components/molecules/TopBar';
import Chat from './components/molecules/Chat';
import JoinRoom from './components/pages/JoinRoom';

class App extends Component {
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
          Swarm: ['/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star']
        }
      }
    });

    this.ipfs.on('ready', async () => {
      const id = await this.ipfs.id();
      this.setState({ myId: id.id });
    });
  }

  render() {
    return (
      <div>
        <TopBar title={`my id: ${this.state.myId}`} />
        <BrowserRouter>
          <div>
            <Route path="/" component={JoinRoom} exact />
            <Route path="/chat" component={props => <Chat ipfs={this.ipfs} />} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
