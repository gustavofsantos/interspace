import React from "react";
import styled from "styled-components";
import MessageBox from "../atoms/MessageBox";
import Messaging from "./Messaging";
import JoinRoom from "../pages/JoinRoom";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.ipfs = props.ipfs;

    this.state = {
      participants: [],
      messages: [],
      channelId: '',
      myId: '',
      self: null
    };

    this.createChatRoom = this.createChatRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.exitRoom = this.exitRoom.bind(this);
    this.sendMessageRoom = this.sendMessageRoom.bind(this);
    this.getPeersInRoom = this.getPeersInRoom.bind(this);
    this.handleReceiveMessage = this.handleReceiveMessage.bind(this);
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
    this.handleChannel = this.handleChannel.bind(this);

    // setup from props
    if (props.channel) {
      console.log('Chat.constructor props.channel', props.channel);
      this.joinRoom(props.channel).then(id => {
        this.setState({ channelId: id });
      })
    }
  }

  createChatRoom() {
    return 'aaaaaaaaaaaaaaaabbbc';
  }

  handleReceiveMessage(message) {
    const msg = JSON.parse(message.data.toString());
    this.setState({
      messages: [...this.state.messages, {
        author: msg.author,
        message: msg.message
      }]
    })
  }

  joinRoom(id) {
    return new Promise((resolve, reject) => {
      this.ipfs.pubsub.subscribe(
        id,
        this.handleReceiveMessage,
        { discover: true },
        err => {
          if (err) reject(err);
          else resolve(id);
        }
      );
    });
  }

  exitRoom(id) {
    return new Promise((resolve, reject) => {
      this.ipfs.pubsub.unsubscribe(
        id,
        this.handleReceiveMessage,
        err => {
          if (err) reject(err);
          else resolve(id);
        }
      );
    });
  }

  sendMessageRoom(id, author, message) {
    console.log('sendMessageRoom', id, author, message)
    return new Promise((resolve, reject) => {
      this.ipfs.pubsub.publish(
        id,
        Buffer.from(JSON.stringify({
          author,
          message
        })),
        err => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  handleSubmitMessage(message) {
    this.sendMessageRoom(this.state.channelId, this.state.myId, message);
  }

  handleChannel(chanelId) {
    this.joinRoom(chanelId)
      .then(channelId => {
        this.props.handleChannel(channelId);
        this.setState({ channelId });
      });
  }

  getPeersInRoom(id) {
    return new Promise((resolve, reject) => {
      this.ipfs.pubsub.peers(id, (err, peers) => {
        if (err) reject(err);
        else resolve(peers);
      });
    });
  }

  render() {
    return (
      <Container>
        <Layout>
          {
            this.state.channelId ? 
              <div>
                <p>curent channel: {this.state.channelId}</p>
                <Messaging messages={this.state.messages} />
                <MessageBox handleSubmit={this.handleSubmitMessage} />
              </div>
              :
              <JoinRoom handleChannel={this.handleChannel} />
          }
          
        </Layout>
      </Container>
    );
  }
}


const Container = styled.div`
  text-align: center;
  font-family: 'Roboto Mono', monospace;
`;

const Layout = styled.div`
  padding-top: 3.4rem;
  display: inline-block;
  max-width: 60rem;
  width: 100vw;
`;