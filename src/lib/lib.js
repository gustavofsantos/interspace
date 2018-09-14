const profile = {}

/**
 * Create a user and save to localStorage
 * @param {string} name Name of the user
 * @param {string} picture Bytes of user profile avatar
 * @param {string} id 
 */
function createUser(name, picture, id) {
  const profileJson = {
    name,
    picture,
    id,
    friends: [],
    channels: []
  }

  const profileString = JSON.stringify(profileJson);
  localStorage.setItem('interspaceprofile', profileString);
}

/**
 * Add a new friend to the user
 * @param {string} friendId ipfs id from new friend
 * @param {object} friendAttr attributes from friend
 */
function makeFriend(friendId, friendAttr) {
  // push to friends array
  profile.friends.push({
    friendId: friendAttr
  });

  // create and push a new channel
  const channelId = `${profile.id}${genRandomString(24)}${friendId}`;
  profile.channels.push({
    with: friendAttr,
    channel: channelId
  });

  // returns the id of the channel
  return channelId;
}

function saveProfile() {
  const profileString = JSON.stringify(profile);
  localStorage.setItem('interspaceprofile', profileString);
}

function loadProfile(profile = null) {
  if (profile) {
    // do some magic
  } else {
    const profileString = localStorage.getItem('interspaceprofile');
    const profileJson = JSON.parse(profileString);
    profile = { ...profileJson };
  }
}

function exportToClone() {
  return JSON.stringify({
    name: profile.name,
    id: profile.id
  });
}

function genRandomString(size) {
  return 'aaaaaa';
}

module.exports = {
  createUser,
  makeFriend,
  saveProfile,
  loadProfile,
  exportToClone
}