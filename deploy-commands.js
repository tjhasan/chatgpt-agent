import { REST, Routes } from "discord.js";
import "dotenv/config.js";

import { data as chatGptData } from "./commands/chatgpt.js";
import { data as pingData } from "./commands/ping.js";
import { data as dalleData } from "./commands/dall-e.js";
import { data as chatgptvoiceData } from "./commands/chatgptvoice.js";
import { data as clearQueueData } from "./commands/music/clearQueue.js";
import { data as getQueueData } from "./commands/music/getQueue.js";
import { data as pauseData } from "./commands/music/pause.js";
import { data as playData } from "./commands/music/play.js";
import { data as playlistData } from "./commands/music/playlist.js";
import { data as removeLoopData } from "./commands/music/removeLoop.js";
import { data as resumeData } from "./commands/music/resume.js";
import { data as seekData } from "./commands/music/seek.js";
import { data as setVolumeData } from "./commands/music/setVolume.js";
import { data as shuffleData } from "./commands/music/shuffle.js";
import { data as skipData } from "./commands/music/skip.js";
import { data as stopData } from "./commands/music/stop.js";
import { data as toggleLoopData } from "./commands/music/toggleLoop.js";
import { data as toggleQueueLoopData } from "./commands/music/toggleQueueLoop.js";

const commands = [];

commands.push(pingData);
commands.push(chatGptData);
commands.push(dalleData);
commands.push(clearQueueData);
commands.push(getQueueData);
commands.push(pauseData);
commands.push(playData);
commands.push(playlistData);
commands.push(removeLoopData);
commands.push(resumeData);
commands.push(seekData);
commands.push(setVolumeData);
commands.push(shuffleData);
commands.push(skipData);
commands.push(stopData);
commands.push(toggleLoopData);
commands.push(toggleQueueLoopData);
commands.push(chatgptvoiceData);


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
