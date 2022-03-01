const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
const { getColorFromURL } = require('color-thief-node');
const GoogleImages = require('google-images');

const configuration = new Configuration({ apiKey: process.env.OPENAI_SECRET, });
const openai = new OpenAIApi(configuration);
const imagesClient = new GoogleImages(process.env.GCS_PROJECT_CX, process.env.GCS_API_KEY);

var completion, generatedStory, images, thumbUrl, color;

// Code that is re-used for initial generation and "again" generation
async function generateStory(givenTopic) {
    let re = /xxx[\x00-\x7F]+xxx/;
    givenTopic.replace(re, '');

    try {
        completion = await openai.createCompletion("text-curie-001", {
            prompt: "Tell me a short story about " + givenTopic, max_tokens: 256
            },
        )
        generatedStory = completion.data.choices[0].text;
    } catch {
        console.log("--- ERROR AT GPT-3 BLOCK ---\n" + err);
    }

    try {
        images = await imagesClient.search(givenTopic, { safe: 'high' });
        thumbUrl = images[0]['url'];
        color = await getColorFromURL(thumbUrl);
    } catch (err) {
        console.log("--- ERROR AT IMAGE BLOCK ---\n" + err);
        thumbUrl = 'https://cdn.discordapp.com/avatars/947624885088301077/f384e8281ef03fd8ea69e1d45d3f54c3.png?size=256';
        color = [165, 215, 246];
    }
}

// Command code to send to the command loader
module.exports = {
	data: new SlashCommandBuilder()
		.setName('story')
		.setDescription('Generate a short story with AI')
        .addStringOption(option =>
            option.setName('topic')
                .setDescription('What do you want the story to be about? (ie. a tropical bird)')
                .setRequired(true)),

	async execute(interaction) {
        try {
            await interaction.deferReply();
            
            const givenTopic = interaction.options.get('topic')?.value

            await generateStory(givenTopic);
        
            const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('A short story about ' + givenTopic)
                .setDescription(generatedStory)
                .setThumbnail(thumbUrl);

            const button = new MessageButton()
                .setCustomId('again')
                .setLabel('Again!')
                .setStyle('PRIMARY');

            const row = new MessageActionRow().addComponents(button);

            msg = await interaction.followUp({ embeds: [ embed ], components: [row] });

            const filter = i => i.customId === 'again' && i.user.id === interaction.user.id;
            const collector = msg.createMessageComponentCollector({ filter, time: 1000 * 60 * 15 });

            collector.on('collect', async i => {
                if (i.customId === 'again') {
                    try {
                        await i.deferReply();
                        await generateStory(givenTopic);
                        embed.setDescription(generatedStory).setThumbnail(thumbUrl).setColor(color);

                        await i.followUp({ embeds: [ embed ] });
                        // For when I figure out how to fix the follow-up issue:
                        // await i.followUp({ embeds: [ embed ], components: [row] });
                    } catch (err) {
                        console.log(err);
                        await i.followUp('There was an error generating your story.')
                    }
                }
            });
        } catch {
            await interaction.followUp('There was an error generating your story.');
        }
    }
};