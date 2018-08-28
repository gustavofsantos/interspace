import React, { Component } from 'react';
import TopBar from './components/molecules/TopBar';
import Chat from './components/molecules/Chat';

class App extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <Chat />
      </div>
    );
  }
}

export default App;
