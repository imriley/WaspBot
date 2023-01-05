import { SlashCommandBuilder } from "@discordjs/builders";

const Ping = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pongs you back!! 🏓");

/*
const Ping = {
  name: "ping",
  description: "Pongs you back!! 🏓",
}
*/

export default Ping.toJSON();
