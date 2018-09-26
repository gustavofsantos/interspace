/**
 * Create IPFS object with pubsub capability
 */
const ipfs = new window.Ipfs({
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

// runtime app object
const app = {
  user: {},
  ready: false,
  id: null,
  channels: []
}

function ipfsReady() {
  return new Promise(resolve => {
    if (app.ready) {
      resolve(true);
    }
    ipfs.on('ready', () => {
      app.ready = true;
      resolve(true);
    });
  });
}

/**
 * Create an local user profile
 * @param {string} name
 * @param {string} description
 * @param {Buffer} picture
 */
function userCreateProfile(name, description, key=null, picture = null) {
  console.log('userCreateProfile');
  return new Promise((resolve, reject) => {
    ipfsReady().then(() => {
      ipfs.id().then(id => {
        app.user = {
          name,
          description,
          picture,
          id: id.id,
          friends: []
        }

        
        console.log('userCreateProfile app.user', app.user);
        debugger;
        const profileString = JSON.stringify(app.user);
        
        debugger;
        // encrypt with key
        // localStorage.setItem('interspaceprofile', profileString);
        // debugger;
        
        ipfs.files.add(Buffer.from(profileString), (err, files) => {
          if (err) reject(err);
          else {
            console.log('ipfs profile added', files);
            debugger;
            resolve(app.user);
          }
        });
      });
    });
  });
}

function userAddFriend(friendCID) {
  return new Promise((resolve, reject) => {
    ipfsReady().then(() => {
      ipfs.files.cat(friendCID)
      .then(friend => {
        const friendString = friend.toString('utf8');
        const friendJson = JSON.parse(friendString);

        app.user.friends.push(friendJson);

        resolve(friendJson);
      })
      .catch(err => {
        reject(err);
      });
    });
  });
}

function userSaveProfile() {
  const profileString = JSON.stringify(app.user);
  localStorage.setItem('interspaceprofile', profileString);
}

function userLoadProfile(profile = null) {
  if (profile) {
    // do some magic with profile.json
  } else {
    const profileString = localStorage.getItem('interspaceprofile');
    const profileJson = JSON.parse(profileString);
    profile = { ...profileJson };
  }
}

/**
 * export saved profile to json file
 */
function userExportProfileToString() {
  return JSON.stringify(app.user);
}

function chatHandleJoinChannel(channel) {
  return new Promise((resolve, reject) => {
    ipfsReady().then(() => {
      ipfs.pubsub.subscribe(
        channel,
        chatHandleReceiveMessage,
        err => {
          if (err) reject(err);
          else {
            app.channels[channel] = {
              participants: [],
              messages: []
            }
            resolve(channel);
          }
        }
      )
    });
  });
}

function chatHandleQuitChannel(channel) {
  return new Promise((resolve, reject) => {
    ipfsReady().then(() => {
      ipfs.pubsub.unsubscribe(
        channel,
        chatHandleReceiveMessage,
        err => {
          if (err) reject(err);
          else {
            delete app.channels[channel];
            resolve(channel);
          }
        }
      );
    });
  });
}

function chatHandleReceiveMessage(message) {
  return new Promise((resolve, reject) => {
    const msg = JSON.parse(message.data.toString());
    console.log('handleReceiveMessage: ', msg);
    if (msg.type === 'announce') {
      this.handleNewParticipant(msg.author.name || 'anon')
    } else if (msg.type === 'confirm') {
      console.log(`message was delivered`);
    } else {
      app.channels[msg.channel].messages.push({
        author: msg.author,
        message: msg.message,
        id: msg.id,
        confirmed: false
      });

      chatHandleConfirmReceiveMessage(msg.channel, msg.id)
      .then(() => {
        resolve(message);
      })
      .catch(err => {
        reject(err);
      });
    }
  })
}

function chatHandleSendMessage(message, channel, type='text') {
  return new Promise((resolve, reject) => {
    this.ipfs.pubsub.publish(
      channel,
      Buffer.from(JSON.stringify({
        type,
        author: app.user,
        message,
        date: `${(new Date()).toLocaleDateString()} at ${(new Date()).toLocaleTimeString()}`,
        id: Date.now(),
        channel
      })),
      err => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

function chatHandleConfirmReceiveMessage(channel, messageId) {
  return new Promise((resolve, reject) => {
    resolve('not done');
  });
}

function chatHandleNewParticipantChannel(name) {
  return new Promise((resolve, reject) => {
    resolve('not done');
  });
}

function chatSendAnnouncement(channel) {
  return new Promise((resolve, reject) => {
    resolve('not done');
  });
}

function chatParticipantsActiveInChannel(channel) {
  return new Promise((resolve, reject) => {
    resolve('not done');
  })
}

module.exports = {
  ipfsReady,
  userCreateProfile,
  userAddFriend,
  userExportProfileToString,
  userLoadProfile,
  userSaveProfile,
  chatHandleReceiveMessage,
  chatHandleConfirmReceiveMessage,
  chatHandleJoinChannel,
  chatHandleQuitChannel,
  chatHandleNewParticipantChannel,
  chatHandleSendMessage,
  chatSendAnnouncement,
  chatParticipantsActiveInChannel,
}