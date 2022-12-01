const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shithead')
		.setDescription('Te insulta'),
	async execute(interaction) {
		await interaction.reply('Gillipollas');
	},
};