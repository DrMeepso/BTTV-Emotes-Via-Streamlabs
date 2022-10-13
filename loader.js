/*
	This isnt the whole script. 
	This just loads the latest vertion of the script so any fixes that get added will automaticly apply.
	
	The actual script can be found under the name Index.js!
*/
var TwitchID = 219012725 // Your twitch channel ID that is linked to your BTTV account
//----------------------------------------------------------------------------------//
// Dont edit any of this code! unless you know what your doing
var Script = document.createElement("script")
fetch("https://raw.githubusercontent.com/DrMeepso/BTTV-Emotes-Via-Streamlabs/main/index.js")
	.then( data => data.text() )
	.then( js => {
		Script.innerHTML = js.replace("<TwitchID>", TwitchID)
  	document.body.append(Script)
	})
