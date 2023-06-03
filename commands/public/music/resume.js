import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumes the song"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);

    if (!queue) return await interaction.reply("No song in queue");
    if (queue.paused) {
      queue.resume();
      return interaction.reply("Resumed the song");
    }
    await interaction.reply("Song already playing");
  },
};
