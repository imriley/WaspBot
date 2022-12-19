// ============IMPORTS==============
// discord imports
import { Client, GatewayIntentBits, Partials } from "discord.js";
// For Environment variables
import dotenv from "dotenv";
dotenv.config();
// Handlers import
import messageCreateHandler from "./handlers/messageCreateHandler.js";
import interactionCreateHandler from "./handlers/interactionCreateHandler.js";

// making new client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  presence: {
    status: "online",
    afk: false,
    activities: [
      {
        name: "buzzing sounds",
        type: 1,
      },
    ],
  },
});

//setting up env variables
const TOKEN = process.env["TOKEN"];

// Confirmation on ready event
client.on("ready", () => {
  console.log(`😈 ${client.user.tag} is in 🤓!`);
});

// Messages handler for normal messages
client.on("messageCreate", messageCreateHandler);

// Slash commands handler
client.on("interactionCreate", interactionCreateHandler);

// Turning it on
client.login(TOKEN);
