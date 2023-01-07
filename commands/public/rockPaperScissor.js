import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} from "discord.js";
import stonePaperScissors from "../../functions/sps.js";

export default {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Play Rock Paper Scissors with me")
    .addIntegerOption((option) =>
      option
        .setName("choice")
        .setDescription("Chooose your item")
        .addChoices(
          {
            name: "Rock 🪨",
            value: 0,
          },
          {
            name: "Paper 📃",
            value: 1,
          },
          {
            name: "Scissors ✂️",
            value: 2,
          }
        )
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    let choice = interaction.options.get("choice").value; //will receive int from {0,1,2}
    await interaction.reply({ embeds: [stonePaperScissors(choice)] });
  },
};
