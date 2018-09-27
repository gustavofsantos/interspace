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
  channels: [],
  feed: []
}

/**
 * Return the app feed
 */
export function appFeed() {
  return app.feed;
}

/**
 * Resolve to TRUE if IPFS is online
 */
export function ipfsReady() {
  return new Promise(resolve => {
    if (app.ready) {
      resolve(true);
    }
    resolve(ipfs.isOnline());
  });
}

/**
 * Get actual user profile
 */
export function userProfile() {
  return app.user;
}

/**
 * Create an local user profile
 * @param {string} name
 * @param {string} description
 * @param {Buffer} picture
 */
export function userCreateProfile(name, description, key=null, picture = null) {
  return new Promise((resolve, reject) => {
    ipfsReady().then(() => {
      ipfs.id().then(id => {
        app.user = {
          name,
          description,
          picture,
          id: id.id,
          friends: [],
          feed: []
        }

        console.log('userCreateProfile app.user', app.user);
        const profileString = JSON.stringify(app.user);

        // encrypt with key
        localStorage.setItem('interspaceprofile', profileString);
        ipfs.files.add(Buffer.from(profileString), (err, files) => {
          if (err) reject(err);
          else {
            localStorage.setItem('interspaceprofile', JSON.stringify({ profileHash: files[0].hash,  ...app.user }));
            resolve(app.user);
          }
        });
      });
    });
  });
}

/**
 * add an friend to user array of friends
 * @param {string} friendCID IPFS CID string
 */
export function userAddFriend(friendCID) {
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

/**
 * Create a new publication of the user
 * @param {string} title Publication title
 * @param {string} content Publication content
 */
export function userNewPublication(title, content) {
  return new Promise((resolve, reject) => {
    const now = new Date;
    const publication = {
      title,
      content,
      date: now.toUTCString()
    }

    const publicationString = JSON.stringify(publication);

    app.user.feed.push(publicationString);
    ipfsReady().then(state => {
      if (state) {
        ipfs.files.add(Buffer.from(publicationString), (err, files) => {
          if (err) reject(err);
          else {
            const publicationHash = files[0].hash;
            const feedPublication = {
              hash: publicationHash,
              author: app.user,
              ...publication
            }

            app.feed.push(feedPublication);
            resolve(feedPublication);
          }
        });
      }
    });
  });
}

/**
 * Save the current state of user profile in the local storage
 */
export function userSaveProfile() {
  const profileString = JSON.stringify(app.user);
  localStorage.setItem('interspaceprofile', profileString);
}

/**
 * Load an profile into application
 * @param {string} profile IPFS CID or JSON string
 */
export function userLoadProfile(profile = null) {
  return new Promise((resolve, reject) => {
    if (profile) {
      // do some magic with profile.json
    } else {
      const profileString = localStorage.getItem('interspaceprofile');
      const profileJson = JSON.parse(profileString);
      app.user = { ...profileJson };
      resolve(profileJson);
    }
  });
}

/**
 * export saved profile to json file
 */
export function userExportProfileToString() {
  return JSON.stringify(app.user);
}

/**
 * Enter user to an channel
 * @param {string} channel Channel id
 */
export function chatHandleJoinChannel(channel) {
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

export function chatHandleQuitChannel(channel) {
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

export function chatHandleReceiveMessage(message) {
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

export function chatHandleSendMessage(message, channel, type='text') {
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

export function chatHandleConfirmReceiveMessage(channel, messageId) {
  return new Promise((resolve, reject) => {
    resolve('not done');
  });
}

export function chatHandleNewParticipantChannel(name) {
  return new Promise((resolve, reject) => {
    resolve('not done');
  });
}

export function chatSendAnnouncement(channel) {
  return new Promise((resolve, reject) => {
    resolve('not done');
  });
}

export function chatParticipantsActiveInChannel(channel) {
  return new Promise((resolve, reject) => {
    resolve('not done');
  })
}

// export {
//   ipfsReady,
//   userCreateProfile,
//   userAddFriend,
//   userExportProfileToString,
//   userLoadProfile,
//   userSaveProfile,
//   chatHandleReceiveMessage,
//   chatHandleConfirmReceiveMessage,
//   chatHandleJoinChannel,
//   chatHandleQuitChannel,
//   chatHandleNewParticipantChannel,
//   chatHandleSendMessage,
//   chatSendAnnouncement,
//   chatParticipantsActiveInChannel,
// }