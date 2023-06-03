import { ChatInputCommandInteraction, Client } from "discord.js";

const SuperUsers = [
  process.env["SU_Bisskut"],
  process.env["SU_Shazam"],
  process.env["SU_Kuro"],
  process.env["SU_Rockstar"],
];

export default {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    //checking if Chat Input command or not
    if (!interaction.isChatInputCommand()) return;
    console.log("🕹️  Chat Input");

    // TODO: have a condtion if(command.dm && interaction.channel instanceof Discord.DMChannel) then return, also need to add dm property for each command
    const command =
      client.publicCommands.get(interaction.commandName) ||
      client.devCommands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "This is outdated",
        ephemeral: true,
      });

    if (command.devloper && !SuperUsers.includes(interaction.user.id))
      return interaction.reply({
        content: "This is for devs 🤓",
        ephemeral: true,
      });

    command.execute(interaction, client);
  },
};
