const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	// Lo que se introduce
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),


	// Lo que ejecuta
	async execute(interaction) {
		interaction.reply('Pong!');
	},
};