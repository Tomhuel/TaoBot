// Require the necessary discord.js classes 
// Traemos las clases necesarias de discord.js
const { Client, Events, GatewayIntentBits, messageLink, Message, SlashCommandBuilder } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance (the bot)
// Creamos una nueva instancia de Cliente (el bot)
const TaoBot = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'Taobot'
// Cuando el cliente está listo, corre este código
// Usamos 'c' para mantener el parametro del evento separado del ya definido 'Taobot'
TaoBot.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
// Inicia sesión a Discord con el token del cliente (el bot)
TaoBot.login(token);

const nomenclature = /\.\./;