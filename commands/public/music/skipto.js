import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("skipto")
    .setDescription("Skips to the song")
    .addIntegerOption((option) =>
      option
        .setName("num")
        .setDescription("Song number to skip to")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    const num = interaction.options.get("num")?.value;
    if (!queue) return await interaction.reply("No song in queue");
    try {
      const song = await client.distube.jump(interaction, num);
      return await interaction.reply(`Skipped! to:\n${song.name}`);
    } catch (e) {
      return await interaction.reply(`${e}`);
    }
  },
};
