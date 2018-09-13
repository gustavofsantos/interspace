import React from "react";
import styled from "styled-components";
import ChatView from './ChatView';
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
    this.handleNewParticipant = this.handleNewParticipant.bind(this);
    this.sendAnnouncementMessage = this.sendAnnouncementMessage.bind(this);
    this.confirmReceivedMessage = this.confirmReceivedMessage.bind(this);

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

  handleNewParticipant(name) {
    console.log('new participant: ', name);
    if (!this.state.participants.includes(name)) {
      console.log('if --')
      this.setState({
        participants: [ ...this.state.participants, name ]
      });
      // the new participant does not have me in their context
      this.sendAnnouncementMessage(this.state.channelId, this.state.self.name);
    }
  }

  handleReceiveMessage(message) {
    const msg = JSON.parse(message.data.toString());
    console.log('handleReceiveMessage: ', msg);
    if (msg.type === 'announce') {
      this.handleNewParticipant(msg.author.name || 'anon')
    } else if (msg.type === 'confirm') {
      console.log(`message was delivered`);
    } else {
      this.setState({
        messages: [...this.state.messages, {
          author: msg.author,
          message: msg.message,
          id: msg.id,
          confirmed: false
        }]
      });
      this.confirmReceivedMessage(this.state.channelId, msg.msgId);
    }
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

  sendMessageRoom(channel, author, message, type='message') {
    return new Promise((resolve, reject) => {
      this.ipfs.pubsub.publish(
        channel,
        Buffer.from(JSON.stringify({
          type,
          author: this.state.self,
          message,
          date: `${(new Date()).toLocaleDateString()} at ${(new Date()).toLocaleTimeString()}`,
          id: Date.now()
        })),
        err => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  sendAnnouncementMessage(channel, name) {
    this.sendMessageRoom(channel, name, '', 'announce');
  }

  confirmReceivedMessage(channel, msgId) {
    this.sendMessageRoom(
      channel,
      this.state.self.name,
      msgId,
      'confirm'
    );
  }

  handleSubmitMessage(message) {
    this.sendMessageRoom(
      this.state.channelId,
      this.state.self,
      message
    );
  }

  handleChannel(chanelId, name) {
    this.joinRoom(chanelId)
      .then(channelId => {
        this.props.handleChannel(channelId, name);
        this.setState({
          self: {
            name: name,
            id: this.state.myId
          },
          channelId
        });
        this.sendAnnouncementMessage(channelId, name);
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
              <ChatView 
                channelId={this.state.channelId}
                messages={this.state.messages}
                participants={this.state.participants}
                handleSubmitMessage={this.handleSubmitMessage} />
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
  display: inline-block;
  max-width: 60rem;
  width: 100vw;
`;