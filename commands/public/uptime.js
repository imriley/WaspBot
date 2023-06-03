import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";
import dateDiff from "../../functions/dateDifference.js";

export default {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Displays uptime of bot"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const res = dateDiff(Date.now() - client.uptimeTrackerTimestamp);
    const embed = {
      title: "Uptime",
      description: `Bot has been running for ${res[0]}days, ${res[1]}hr, ${res[2]}min, ${res[3]}s`,
      color: 0xeeee00,
    };
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
