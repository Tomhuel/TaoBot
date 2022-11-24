// Conexion con el javascript de Discord
const { SlashCommandBuilder } = require('discord.js');

// module.exports es para poder exportar informacion en NodeJS, así poder implementarla en un require en otro archivo
module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};