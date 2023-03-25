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

/*
    let embed;
    switch (interaction.commandName) {
      // Ping Command
      case "ping":
        embed = {
          title: "Pong!!",
          description: "ponged you back 🤓",
          color: 0xeeee00,
        };
        await interaction.reply({ embeds: [embed] });
        break;

      // Emojify Command
      case "emojify":
        let msg = interaction.options.get("message").value;
        await interaction.reply(emojify(msg));
        break;

      // Stone Paper Scissor Command
      case "sps":
        let choice = interaction.options.get("choice").value; //will receive int from {0,1,2}
        await interaction.reply({ embeds: [stonePaperScissors(choice)] });
        break;

      default:
        embed = {
          title: "Well this is awkward",
          description:
            "Seems like this command doesn't exist... How did you reach here 🤔",
          color: 0xff0000,
        };
        await interaction.reply({ embeds: [embed] });
    }*/
