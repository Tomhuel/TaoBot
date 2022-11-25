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

// Log in to Discord with your client's token
// Inicia sesión a Discord con el token del cliente (el bot)
TaoBot.login(token);


const fs = require('node:fs');
const path = require('node:path');

TaoBot.commands = new Collection();

// CommandsPath: join ayuda a construir una ruta para poder acceder la carpeta commands. 
const commandsPath = path.join(__dirname, 'commands');
// readdirSync devuelve un array con todos los ficheros de la ruta que se le indice (carpeta commands en este caso)
// y además con el .filter filtramos los archivos a que sean exclusivos javascript.
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));