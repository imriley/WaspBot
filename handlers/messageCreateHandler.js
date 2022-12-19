import hello from "./messageHandlers/hello.js";

// For Environment variables
import dotenv from "dotenv";
dotenv.config();

// Setting SuperUsers and prefix
const prefix = "^";
const SuperUsers = [
  process.env["SU_Bisskut"],
  process.env["SU_Shazam"],
  process.env["SU_Kuro"],
  process.env["SU_Rockstar"],
];

let result = "";
function print(String) {
  result += String;
}

export default async function messageCreateHandler(message) {
  console.log("🗨️  Message Create");

  // for later use
  const [client, guild] = [message.client, message.guild];

  if (
    !message.content.startsWith(prefix) ||
    message.author.bot ||
    !SuperUsers.includes(message.author.id)
  )
    return;
  const msg = message.content.slice(prefix.length);

  // OLD REGEX
  const command = /^\w+/.exec(msg)[0].toLowerCase();
  const args = msg?.replace(/^\w+/, "");

  // TODO: better regex?
  // const [, command, args] = msg.match(/^(\w+)\s(.+)/) || [];

  // logging stuff
  console.log(`Command: ${command};\n=====\nArgument: \t\n${args};`);

  if (command === "hello") {
    await message.channel.send(hello());
  }

  if (command == "eval") {
    let temp = args?.replace(/```js|```/g, "");
    console.log(`\nTEMP= ${temp}`);
    try {
      eval(temp);
      await message.react("✅");
    } catch (error) {
      result = error;
      await message.react("❌");
    }
    if (result) {
      await message.channel.send("```\n" + result + "\n```");
    }
    result = "";
  }
}
