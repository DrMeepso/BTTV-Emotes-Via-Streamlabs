const UserID = 219012725 // Your twitch channel ID that is linked to your BTTV account
var ChannelEmotes = [] // this dosnt need to be changed but dont remove it

fetch(`https://api.betterttv.net/3/cached/users/twitch/${UserID}`)
	.then((response) => response.json())
	.then((data) => {
  	data.channelEmotes.forEach(e => {
      ChannelEmotes.push(e)
    })
    data.sharedEmotes.forEach(e => {
      ChannelEmotes.push(e)
    })
	});

fetch(`https://api.betterttv.net/3/cached/emotes/global`)
	.then((response) => response.json())
	.then((data) => {
  	data.forEach(e => {
      ChannelEmotes.push(e)
    })
	});

document.addEventListener('onEventReceived', function(obj) {
  	var messages = Object.values(document.getElementsByClassName("message"))
    messages.forEach(object => {
      ChannelEmotes.forEach(emote => {
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
            "name": "twitch:"+UserID
        }
    }))
}

BTTVEmote.onmessage = (data) => {
	var message = JSON.parse(data.data)
  switch(message.name){
    case "emote_create":
      	ChannelEmotes.push(message.data.emote)
      break
    case "emote_delete":
      	ChannelEmotes = ChannelEmotes.filter( e => e.id != message.data.emoteID )
    	break
  }
}
