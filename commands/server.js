// Conexion con Discord.js
const { SlashCommandBuilder } = require('discord.js');

// module.exports es para poder exportar informacion en NodeJS, así poder implementarla en un require en otro archivo
module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};