# BTTV Emotes For Streamlabs
### Adds better Twitch.TV emotes to the chat box within Streamlabs!


## How to Install
Place the code form within Loader.js into the custom javascript box at the bottom of the [chat box options page](https://streamlabs.com/dashboard#/chatbox).

Make sure that you have "Enable Custom HTML/CSS" set to Enabled

Then select JS and place the code from [loader.js](https://github.com/DrMeepso/BTTV-Emotes-Via-Streamlabs/blob/main/loader.js) into the text box

You now need to find the Twitch Channel ID linked to your BTTV account (even if you use youtube BTTV stores your emotes under your twitch id) then replace ```const UserID = 219012725``` with ```const UserID = <Your Twitch ID>```. 

You can find a website to help you find your Twitch ID [Here](https://www.streamweasels.com/tools/convert-twitch-username-to-user-id/)

Then hit Save Settings and it should now reload any open chat widgets and it should now show any BTTV emotes you have added to your channel
#### What is should look like if install correctly 
![What it should look like](https://user-images.githubusercontent.com/50252724/195716642-cf2b2cf9-6edb-4c43-a832-eb5925f297ce.png)


## Todo
- [X] Better TTV Emotes
- [ ] FrankerFaceZ Emotes
- [X] Add emote reloading
