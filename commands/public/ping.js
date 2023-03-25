import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pongs you back!! 🏓"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const embed = {
      title: "Pong!!",
      description: `Ponged you back 🤓 in ${
        Date.now() - interaction.createdTimestamp
      }ms`,
      color: 0xeeee00,
    };
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
