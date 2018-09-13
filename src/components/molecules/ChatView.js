import React from 'react';
import { Layout } from 'antd';
import MessageBox from "../atoms/MessageBox";
import Messaging from "./Messaging";
import Participants from "../molecules/Participants";

const { Header, Content } = Layout;

export default props => (
  <Layout>
    <Header style={{
      background: '#101010'
    }}>
      <Participants participants={props.participants} channel={props.channelId} />
    </Header>
    <Content>
      <Messaging messages={props.messages} />
      <MessageBox handleSubmit={props.handleSubmitMessage} />
    </Content>
  </Layout>
);