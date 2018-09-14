import React from 'react';
import { Layout } from 'antd';
import MessageBox from "../atoms/MessageBox";
import Messaging from "./Messaging";
import Participants from "../molecules/Participants";

const { Header, Content } = Layout;

export default props => (
  <Layout style={{
    background: '#FFFFFF',
    height: '100vh'
  }}>
    <Header style={{
      background: '#101010'
    }}>
      <Participants participants={props.participants} channel={props.channelId} />
    </Header>

    <Content>
      <Messaging messages={props.messages} />
    </Content>
    <Content style={{
      position: 'fixed',
      bottom: 0,
      marginBottom: 0
    }}>
      <MessageBox handleSubmit={props.handleSubmitMessage} />
    </Content>
  </Layout>
);