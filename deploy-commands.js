// Importamos los archivos desde discord.js
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

// Creamos un array de comandos
const commands = [];

// Grab all the command files from the commands directory you created earlier
// Crea un array con todos los files .js de la carpeta ./commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Recorre el array de todos los archivos JS de commands para pushear al array commands el archivo JS JSONparseado
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
// Construye y prepara una instancia del modulo REST
const rest = new REST({ version: '10' }).setToken(token);

// y despliega tus comandos!
// and deploy your commands!
(async () => {
	try {
        // loguea un mensaje
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // La función put es usada para llenar "guild?" con los comandos actualizados
		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		// Si se cargan correctamente, devuelve este mensaje
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// Si hay error, pues esta vergada
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
