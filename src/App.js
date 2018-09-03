import React, { Component } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import TopBar from './components/molecules/TopBar';
import Chat from './components/molecules/Chat';

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
        <TopBar title={this.state.myId} channel={this.state.channel} />
        {
          this.state.myId ?
            <Chat ipfs={this.ipfs}
              myId={this.state.myId}
              handleChannel={this.handleChannel} />
            :
            <GridLoader color={'#FAFAFA'} loading={this.state.myId ? false : true} />
        }
      </div>
    );
  }
}
