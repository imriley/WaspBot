import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("previous")
    .setDescription("Goes back"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    if (!queue) return await interaction.reply("No song in queue");
    try {
      const song = await queue.previous();
      return await interaction.reply(`Now playing:\n${song.name}`);
    } catch (e) {
      return await interaction.reply(`${e}`);
    }
  },
};
