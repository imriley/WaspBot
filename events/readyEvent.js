import {
  loadPublicCommands,
  loadDevCommands,
} from "../handlers/slashCommandHandler.js";

export default {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`😈 ${client.user.tag} is in 🤓!`);
    loadPublicCommands(client);
    loadDevCommands(client);
  },
};
