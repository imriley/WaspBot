import loadFiles from "../functions/fileLoader.js";
import ascii from "ascii-table";

async function loadCommands(client) {
  // table for formatted printing
  const table = new ascii().setHeading("Commands", "Status");
  // clear all commands first
  await client.commands.clear();

  let commandsArray = [];
  // Load all the files from commands folder
  const Files = await loadFiles("commands");

  for (const file of Files) {
    // importing those files
    const imported = await import("file://" + file);
    const command = imported.default;

    client.commands.set(command.data.name, command);
    commandsArray.push(command.data.toJSON());

    //formatting
    table.addRow(command.data.name, "🟩");
  }

  await client.application.commands.set(commandsArray);
  return console.log(table.toString(), "\nCommands loaded");
}

export default loadCommands;
