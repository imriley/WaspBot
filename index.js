import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
import loadEvents from "./handlers/eventHandler.js";
import dotenv from "dotenv"; // For Environment variables
dotenv.config();
// Handlers import
import messageCreateHandler from "./handlers/messageCreateHandler.js";

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

client.events = new Collection();
client.publicCommands = new Collection();
client.devCommands = new Collection();
client.uptimeTrackerTimestamp = new Date();
loadEvents(client);

// TODO: Better Messages handler for normal messages
client.on("messageCreate", messageCreateHandler);

// Turning it on
client.login(TOKEN);
