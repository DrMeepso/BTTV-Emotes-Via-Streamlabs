var TwitchID = 219012725 // Your twitch channel ID that is linked to your BTTV account
//----------------------------------------------------------------------------------//
var Script = document.createElement("script")
fetch("https://raw.githubusercontent.com/DrMeepso/BTTV-Emotes-Via-Streamlabs/main/index.js")
	.then( data => data.text() )
	.then( js => {
		Script.innerHTML = js.replace("<TwitchID>", TwitchID)
  	document.body.append(Script)
	})
