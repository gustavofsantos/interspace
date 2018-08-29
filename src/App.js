import React, { Component } from 'react';
import TopBar from './components/molecules/TopBar';
import Chat from './components/molecules/Chat';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myId: ''
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
        <Chat ipfs={this.ipfs} />
      </div>
    );
  }
}

export default App;
