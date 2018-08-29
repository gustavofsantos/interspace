import React from "react";
import styled from "styled-components";
import Message from "../atoms/Message";
import MessageBox from "../atoms/MessageBox";

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.ipfs = props.ipfs;

        this.state = {
            peers: [],
            messages: [],
            channelId: '',
            myId: ''
        };

        this.ipfs.on('ready', async () => {
            const id = await this.ipfs.id();
            this.setState({ myId: id.id });
        })

        this.createChatRoom = this.createChatRoom.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
        this.exitRoom = this.exitRoom.bind(this);
        this.sendMessageRoom = this.sendMessageRoom.bind(this);
        this.getPeersInRoom = this.getPeersInRoom.bind(this);
        this.handleReceiveMessage = this.handleReceiveMessage.bind(this);
        this.handleSubmitMessage = this.handleSubmitMessage.bind(this);

        // setup from props
        if (props.channelId) {
            this.joinRoom(props.channelId);
        }
    }

    createChatRoom() {
        // return new Promise((resolve, reject) => {
        //     this.ipfs.on('ready', () => {
        //         this.ipfs.key.gen(
        //             'chat-room',
        //             {
        //                 type: 'rsa',
        //                 size: 2048
        //             },
        //             (err, key) => {
        //                 if (err) reject(err);
        //                 else resolve(key);
        //             }
        //         );
        //     });
        // });
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
                    else {
                        this.setState({ channelId: id });
                        resolve(id);
                    }
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

    getPeersInRoom(id) {
        return new Promise((resolve, reject) => {
            this.ipfs.pubsub.peers(id, (err, peers) => {
                if (err) reject(err);
                else resolve(peers);
            });
        });
    }

    componentWillMount() {
        this.ipfs.on('ready', () => {
            this.joinRoom('aaaaaabbbccccc');
        });
    }

    render() {
        return (
            <Container>
                <Layout>
                    <p>curent channel: {this.state.channelId}</p>
                    <MessagesContainer>
                        {
                            this.state.messages.map((message, key) =>
                                <Message sender={message.author} text={message.message} key={key} />
                            )
                        }
                    </MessagesContainer>
                    <MessageBox handleSubmit={this.handleSubmitMessage} />
                </Layout>
            </Container>
        );
    }
}


const Container = styled.div`
    text-align: center;
`;

const MessagesContainer = styled.div`
    padding-bottom: 3.2rem;
`;

const Layout = styled.div`
    padding-top: 3.4rem;
    display: inline-block;
    max-width: 60rem;
    width: 100vw;
`;