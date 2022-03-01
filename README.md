# Storycord
Storycord is a Discord bot that generates stories, poems, and song lyrics through user prompts using the power of artificial intelligence. Users can supply Storycord with a scenario to act out, and it will generate a story based on that prompt using OpenAI's GPT-3 and present it in a dynamic embed.

![Screenshot](https://i.imgur.com/d61zAjp.png)

## Usage
1. Install Node.js on your machine if it is not already installed.
2. Clone this repository and `cd` to the root directory.
3. For the embed thumbnail to work, do the following:
   - Visit https://console.developers.google.com and create a project.
   - Visit https://console.developers.google.com/apis/library/customsearch.googleapis.com and enable "Custom Search API" for your project.
   - Visit https://console.developers.google.com/apis/credentials and generate API key credentials for your project.
   - Visit https://cse.google.com/cse/all and in the web form where you create/edit your custom search engine enable the "Image search" option.
4. Create an `.env` file in the root directory with:
   - `DISCORD_CLIENT_ID`: your Discord bot user ID
   - `DISCORD_TOKEN`: your Discord bot user token
   - `OPENAI_SECRET`: your OpenAI API secret token
   - `GCS_API_KEY`: your Google Custom Search API key
   - `GCS_PROJECT_CX`: your Google Custom Search search engine ID (aka CX)
5. Install all dependecies by running `npm install`.
6. Run the bot by running `node index.js`.

**OPTIONAL:** If you want to add, remove, or modify any of the slash commands, you will need to run `deploy-commands.js` to update it on Discord's end. You have two options here:
1. Update it for a specified test server by setting `guildId` to the server's ID, and running `node deploy-commands.js development`. This is usually instant.
2. Update it Discord-wide by running `node deploy-commands.js production`. This can take up to an hour to update across servers.

Storycord uses Discord's Slash Commands interface for interacting with the bot. Type a forward slash in the message box and select Storycord's icon on the left sidebar to see all available commands and their arguments.

## License
Storycord uses the MIT License. [Learn  more about the conditions of the license here.](https://github.com/aspensykes/storycord/blob/main/LICENSE)
