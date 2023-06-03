import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Controls the volume")
    .addIntegerOption((option) =>
      option.setName("value").setDescription("volume value").setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    const volValue = interaction.options.get("value").value;

    queue.setVolume(volValue);
    await interaction.reply(`Volume changed to ${volValue}`);
  },
};
