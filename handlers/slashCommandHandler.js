import { Routes, REST } from "discord.js";

import loadFiles from "../functions/fileLoader.js";
import ascii from "ascii-table";

// setting up env variables
const TOKEN = process.env["TOKEN"];
const CLIENT_ID = process.env["CLIENT_ID"];
const GUILD_ID = process.env["GUILD_ID_WaspbotDev"];

//setting up REST for discord
const rest = new REST({ version: "10" }).setToken(TOKEN);

async function loadPublicCommands(client) {
  // table for formatted printing
  const table = new ascii().setHeading("PCommands", "Status");
  // clear all commands first
  await client.publicCommands.clear();

  let publicCommandsArray = [];
  // Load all the files from commands/public folder
  const publicCommandFiles = await loadFiles("commands/public");

  for (const file of publicCommandFiles) {
    // importing those files
    const imported = await import("file://" + file);
    const command = imported.default;

    client.publicCommands.set(command.data.name, command);
    publicCommandsArray.push(command.data.toJSON());

    //formatting
    table.addRow(command.data.name, "🟩");
  }

  await rest.put(Routes.applicationCommands(CLIENT_ID), {
    body: publicCommandsArray,
  });

  // await client.application.commands.set(publicCommandsArray);
  return console.log(table.toString(), "\nCommands loaded");
}

async function loadDevCommands(client) {
  // table for formatted printing
  const table = new ascii().setHeading("DCommands", "Status");
  // clear all commands first
  await client.devCommands.clear();

  let devCommandsArray = [];
  // Load all the files from commands/devloper folder
  const devCommandFiles = await loadFiles("commands/devloper");

  for (const file of devCommandFiles) {
    // importing those files
    const imported = await import("file://" + file);
    const command = imported.default;

    client.devCommands.set(command.data.name, command);
    devCommandsArray.push(command.data.toJSON());

    //formatting
    table.addRow(command.data.name, "🟨");
  }

  await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
    body: devCommandsArray,
  });
  return console.log(table.toString(), "\nCommands loaded");
}

async function removeGlobalCommands(client) {
  try {
    console.log("Started removing commands");

    rest.get(Routes.applicationCommands(CLIENT_ID)).then((data) => {
      const promises = [];
      for (const command of data) {
        const deleteUrl = `${Routes.applicationCommands(CLIENT_ID)}/${
          command.id
        }`;
        promises.push(rest.delete(deleteUrl));
      }

      console.log("Removed commands succesfully");
    });
  } catch {
    console.log("Failed to remove commands");
  }
}

export { loadPublicCommands, loadDevCommands, removeGlobalCommands };
