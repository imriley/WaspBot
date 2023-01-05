import { SlashCommandBuilder } from "@discordjs/builders";

const Emojify = new SlashCommandBuilder()
  .setName("emojify")
  .setDescription("Emojifies your messages")
  .addStringOption((option) => {
    option
      .setName("message")
      .setDescription("Your message to emojify")
      .setRequired(true);
  });
/*
const Emojify = {
  name: "emojify",
  description: "Emojifies your message",
  options: [
    {
      name: "message",
      description: "your message to emojify",
      type: 3, // string
      required: true
    }
  ]
}
*/

export default Emojify.toJSON();
