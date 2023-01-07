import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
} from "discord.js";

import loadEvents from "../../handlers/eventHandler.js";
import loadCommands from "../../handlers/slashCommandHandler.js";

export default {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads commands or events")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((option) =>
      option.setName("events").setDescription("Reload events")
    )
    .addSubcommand((option) =>
      option.setName("commands").setDescription("Reload commands")
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();
    switch (subCommand) {
      case "events":
        {
          for (const [key, value] of client.events)
            client.removeListener(`${key}`, value, true);
          loadEvents(client);
          interaction.reply({ content: "Reloaded Events", ephemeral: true });
        }
        break;
      case "commands":
        {
          loadCommands(client);
          interaction.reply({ content: "Reloaded Commands", ephemeral: true });
        }
        break;
    }
  },
};
