import { REST, Routes } from "discord.js";
import "dotenv/config.js";

import { data as chatGptData } from "./commands/chatgpt.js";
import { data as pingData } from "./commands/ping.js";
import { data as dalleData } from "./commands/dall-e.js";

const commands = [];

commands.push(pingData);
commands.push(chatGptData);
commands.push(dalleData);

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

// Deploy commands
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
      {
        body: commands,
      }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
