// discord imports
import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import dotenv from "dotenv"; // For Environment variables

dotenv.config();

// setting up env variables
const TOKEN = process.env["TOKEN"];
const CLIENT_ID = process.env["CLIENT_ID"];
const GUILD_ID = process.env["GUILD_ID_WaspbotDev"];

//setting up REST for discord
const rest = new REST({ version: "10" }).setToken(TOKEN);

export default async function main() {
  // const commands = [Ping, Emojify, RPS];

  // const globalCommands = [Emojify];

  try {
    // console.log("Started refreshing application (/) commands.");
    // // For Dev server Deployment
    // await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
    //   body: commands,
    // });

    // // For global Deployment
    // await rest.put(Routes.applicationCommands(CLIENT_ID), {
    //   body: globalCommands,
    // });
    // console.log("Registered Commands Successfully");

    // For removing all global Commands
    rest.get(Routes.applicationCommands(CLIENT_ID)).then((data) => {
      const promises = [];
      for (const command of data) {
        const deleteUrl = `${Routes.applicationCommands(CLIENT_ID)}/${
          command.id
        }`;
        promises.push(rest.delete(deleteUrl));
      }
    });
  } catch (err) {
    console.log(err);
  }
}

main();
