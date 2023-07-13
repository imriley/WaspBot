import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the song(s)")
    .addIntegerOption((option) =>
      option.setName("amount").setDescription("Number of songs to skip")
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    const amount = interaction.options.get("amount")?.value;
    if (!queue) return await interaction.reply("No song in queue");
    try {
      if (amount) {
        const song = await client.distube.jump(interaction, amount);
        return await interaction.reply(
          `Skipped ${amount} songs! Now playing:\n${song.name}`
        );
      } else {
        const song = await queue.skip();
        return await interaction.reply(`Skipped! Now playing:\n${song.name}`);
      }
    } catch (e) {
      return await interaction.reply(`${e}`);
    }
  },
};
