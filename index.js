// Require the necessary discord.js classes 
// Traemos las clases necesarias de discord.js
const { Client, Events, GatewayIntentBits, messageLink, Message, SlashCommandBuilder, Collection } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance (the bot)
// Creamos una nueva instancia de Cliente (el bot)
const TaoBot = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'Taobot'
// Cuando el cliente está listo, corre este código
// Usamos 'c' para mantener el parametro del evento separado del ya definido 'Taobot'
TaoBot.once(Events.ClientReady, c => {
	console.log(`Listo, sesión iniciada como: ${c.user.tag}`);
});

const fs = require('node:fs');
const path = require('node:path');

TaoBot.commands = new Collection();

// CommandsPath: join ayuda a construir una ruta para poder acceder la carpeta commands. 
const commandsPath = path.join(__dirname, 'commands');
// readdirSync devuelve un array con todos los ficheros de la ruta que se le indice (carpeta commands en este caso)
// y además con el .filter filtramos los archivos a que sean exclusivos javascript.
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Bucle que recorre cada archivo de la carpeta de commands (los comandos que hemos creado)
for (const file of commandFiles) {
	// filePath es la ruta del fichero ./commands/fichero.js
	const filePath = path.join(commandsPath, file);
	// Importamos el comando
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	
	// Si tenemos definido el data (data:) y la respuesta del comando (async execute(interaction){}) seteará el comando
	if ('data' in command && 'execute' in command) {
		TaoBot.commands.set(command.data.name, command);
		console.log("Comando "+command.data.name+" es válido");
	// Sino dará error porque falta o el dato, o la respuesta del comando.
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


// Creamos un listener de eventos, que cuando reciba un comando ejecutará el código
function crearListenerTest() {
	TaoBot.on(Events.InteractionCreate, interaction => {
		console.log(interaction);
	});
}

// Comprueba si es un comando introducido por chat (el típico "/ping")
function comprobarComandoInputChat() {
	TaoBot.on(Events.InteractionCreate, interaction => {
		if (!interaction.isChatInputCommand()) return;
		console.log(interaction);
	});
}

// Toda la respuesta de la interacción del bot con el servidor
TaoBot.on(Events.InteractionCreate, async interaction => {
	// Comprobamos que sea un comando introducido por chat
	if (!interaction.isChatInputCommand()) return;
	console.log("ChatInputValido");

	// Declaramos la constante comando como el nombre del comando
	const command = interaction.client.commands.get(interaction.commandName);

	// Si el comando no existe, devolvemos en la consola que no hay comando que coincida con el nombre del comando
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	console.log("Intentando ejecutar comando...");

	// Intenta ejecutar el comando, si falla, devuelve por la consola el error correspondiente al comando
	// el comando a lo mejor falla a la hora de yo que sé, index out of bounds, pues ahí se imprimiría el error.
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Log in to Discord with your client's token
// Inicia sesión a Discord con el token del cliente (el bot)
TaoBot.login(token);