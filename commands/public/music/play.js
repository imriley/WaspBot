import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Add a song to queue")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Name or link of song")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const query = interaction.options.get("query").value;
    client.distube
      .play(interaction.member.voice.channel, query, {
        interaction,
        textChannel: interaction.channel,
        member: interaction.member,
      })
      .catch((err) => {
        return interaction.reply(`\`\`\`\n${err}\n\`\`\``);
      });
    await interaction.reply(`Added to queue ${query}`);
  },
};
