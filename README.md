# Storycord
Storycord is a Discord bot that generates stories, poems, and song lyrics through user prompts using the power of artificial intelligence. Users can supply Storycord with a scenario to act out, and it will generate a story based on that prompt using OpenAI's GPT-3 and present it in a visually appealing way.

![Screenshot](https://i.imgur.com/d61zAjp.png)

## About
Storycord is a Discord chatbot built with Discord.js. The bot generates AI stories using OpenAI's GPT-3 language model. The story is presented in a nice embed with a relevant image pulled from Google Images based on the user's prompt, and the color of the embed is determined by the dominant color of the pulled image, making for an embed that transforms as the stories do.

## Usage
1. Install Node.js on your machine if it is not already installed.
2. Clone this repository and `cd` to the root directory.
3. For the embed thumbnail to work, do the following:
   - Visit https://console.developers.google.com and create a project.
   - Visit https://console.developers.google.com/apis/library/customsearch.googleapis.com and enable "Custom Search API" for your project.
   - Visit https://console.developers.google.com/apis/credentials and generate API key credentials for your project.
   - Visit https://cse.google.com/cse/all and in the web form where you create/edit your custom search engine enable the "Image search" option.
4. Create an `.env` file in the root directory with:
   - `DISCORD_TOKEN`: a Discord bot user token
   - `OPENAI_SECRET`: an OpenAI API secret token
   - `GCS_API_KEY`: your Google Custom Search API key
   - `GCS_PROJECT_CX`: your Google Custom Search search engine ID (aka CX)
5. Install all dependecies by running `npm install`.
6. Run the bot by running `node index.js`.

Hosted solution: Invite the bot to your Discord server [using this link.](https://discord.com/api/oauth2/authorize?client_id=947624885088301077&permissions=2147551296&scope=applications.commands%20bot) Please make sure it has permissions to Send and Read Messages, and has access to Slash Commands. **Note: As this bot is still in active development, the hosted instance may go down frequently and/or for long periods of time.**

Storycord uses Discord's Slash Commands interface for interacting with the bot. Type a forward slash in the message box and select Storycord's icon on the left sidebar to see all available commands and their arguments.

## License
Storycord uses the MIT License. [Learn  more about the conditions of the license here.](https://github.com/aspensykes/storycord/blob/main/LICENSE)