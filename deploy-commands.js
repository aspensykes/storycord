const dotenv = require('dotenv');
const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const myArgs = process.argv.slice(2);

dotenv.config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const clientId = '947624885088301077';
const guildId = '533880804229513217';

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
        switch (myArgs[0]) {
            case 'development':
                await rest.put(
                    Routes.applicationCommands(clientId, guildId),
                    { body: commands },
                );
                console.log('Successfully reloaded application (/) commands in development.');
                break;

            case 'production':
                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: commands },
                );
                console.log('Successfully reloaded application (/) commands in production.');
                break;
            
            default:
                console.log("Usage: node deploy-commands.js <environment>");
                process.exit(1);
        }
	} catch (error) {
		console.error(error);
	}
})();