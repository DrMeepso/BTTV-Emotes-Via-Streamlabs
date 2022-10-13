const UserID = "<TwitchID>" // Your twitch channel ID that is linked to your BTTV account
  var ChannelEmotes = [] // this dosnt need to be changed but dont remove it

// Get the users emotes
fetch(`https://api.betterttv.net/3/cached/users/twitch/${UserID}`)
  .then((response) => response.json())
  .then((data) => {
    // Loop through all persnal emotes to emote list
    data.channelEmotes.forEach(e => {
      ChannelEmotes.push(e)
    })
    // Loop through all shered emotes to emote list
    data.sharedEmotes.forEach(e => {
      ChannelEmotes.push(e)
    })
  });
// Get all the global BTTV emotes
fetch(`https://api.betterttv.net/3/cached/emotes/global`)
  .then((response) => response.json())
  .then((data) => {
    // Loop through all global emotes
    data.forEach(e => {
      // Add emote to emote list
      ChannelEmotes.push(e)
    })
  });

// This is triggerd when somthing happrend like a message
document.addEventListener('onEventReceived', function(obj) {
  // Find all message elements that havent been updated with BTTV emotes
  var messages = Object.values(document.getElementsByClassName("message"))
  // Loop through all of the elements
  messages.forEach(object => {
    // Sort emotes on length of name (Long to Short) then loop through all of them
    ChannelEmotes.sort((a, b) => b.code.length - a.code.length).forEach(emote => {
      // Replace all instances of the Emote name with the Emote Image
      object.innerHTML = object.innerHTML.replaceAll(emote.code, `<span class="emote" style="background-image: url(https://cdn.betterttv.net/emote/${emote.id}/3x);"><img src="https://cdn.betterttv.net/emote/${emote.id}/3x"></span>`)
      object.className = "messageBTTV"
    })
  })
});

// Websocket for relaoding emotes
const BTTVEmote = new WebSocket("wss://sockets.betterttv.net/ws")
BTTVEmote.onopen = () => {
  BTTVEmote.send(JSON.stringify({
    "name": "join_channel",
    "data": {
      "name": "twitch:" + UserID
    }
  }))
}

BTTVEmote.onmessage = (data) => {
  var message = JSON.parse(data.data)
  switch (message.name) {
    case "emote_create":
      ChannelEmotes.push(message.data.emote)
      break
    case "emote_delete":
      ChannelEmotes = ChannelEmotes.filter(e => e.id != message.data.emoteID)
      break
  }
}
