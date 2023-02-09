import "dotenv/config.js";
import {
  Client,
  GatewayIntentBits,
  Collection,
  Events,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  ButtonStyle,
} from "discord.js";
import { execute as chatGptExecute } from "./commands/chatgpt.js";
import { execute as chatGptVoiceExecute } from "./commands/chatgptvoice.js";
import { execute as dalleExecute } from "./commands/dall-e.js";
import { execute as clearQueueExecute } from "./commands/music/clearQueue.js";
import { execute as getQueueExecute } from "./commands/music/getQueue.js";
import { execute as pauseExecute } from "./commands/music/pause.js";
import { execute as playExecute } from "./commands/music/play.js";
import { execute as playlistExecute } from "./commands/music/playlist.js";
import { execute as removeLoopExecute } from "./commands/music/removeLoop.js";
import { execute as resumeExecute } from "./commands/music/resume.js";
import { execute as seekExecute } from "./commands/music/seek.js";
import { execute as setVolumeExecute } from "./commands/music/setVolume.js";
import { execute as shuffleExecute } from "./commands/music/shuffle.js";
import { execute as skipExecute } from "./commands/music/skip.js";
import { execute as stopExecute } from "./commands/music/stop.js";
import { execute as toggleLoopExecute } from "./commands/music/toggleLoop.js";
import { execute as toggleQueueLoopExecute } from "./commands/music/toggleQueueLoop.js";
import { execute as waifuExecute } from "./commands/waifu.js";
import { Player } from "discord-music-player";

// intialize client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

// client auth
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// set up player for the music bot functionality
const player = new Player(client, {
  leaveOnEmpty: false, // This options are optional.
});

client.player = player;

// client looks for commands -- interaction is command object
client.on(Events.InteractionCreate, async (interaction) => {
  // ensure that command is a chat input command
  if (!interaction.isChatInputCommand()) return;

  // create command variable that will store the function to execute
  let command = null;
  //check if we are using the voice execute command
  let flag = false;

  // Check which command we are using and assign the import to the the command variable
  // Find command names in the respective files in the 'commands' folder
  if (interaction.commandName == "chat") {
    command = chatGptExecute;
  } else if (interaction.commandName == "voice") {
    command = chatGptVoiceExecute;
    flag = true;
  } else if (interaction.commandName == "vision") {
    command = dalleExecute;
  } else if (interaction.commandName == "clear_queue") {
    command = clearQueueExecute;
    flag = true;
  } else if (interaction.commandName == "get_queue") {
    command = getQueueExecute;
    flag = true;
  } else if (interaction.commandName == "pause") {
    command = pauseExecute;
    flag = true;
  } else if (interaction.commandName == "play") {
    command = playExecute;
    flag = true;
  } else if (interaction.commandName == "playlist") {
    command = playlistExecute;
    flag = true;
  } else if (interaction.commandName == "resume") {
    command = resumeExecute;
    flag = true;
  } else if (interaction.commandName == "remove_loop") {
    command = removeLoopExecute;
    flag = true;
  } else if (interaction.commandName == "seek") {
    command = seekExecute;
    flag = true;
  } else if (interaction.commandName == "set_volume") {
    command = setVolumeExecute;
    flag = true;
  } else if (interaction.commandName == "shuffle") {
    command = shuffleExecute;
    flag = true;
  } else if (interaction.commandName == "skip") {
    command = skipExecute;
    flag = true;
  } else if (interaction.commandName == "stop") {
    command = stopExecute;
    flag = true;
  } else if (interaction.commandName == "toggle_loop") {
    command = toggleLoopExecute;
    flag = true;
  } else if (interaction.commandName == "toggle_queue_loop") {
    command = toggleQueueLoopExecute;
    flag = true;
  } else if (interaction.commandName == "waifu_vision") {
    command = waifuExecute;
  }

  if (!command) {
    console.error(
      `This shouldn't happen. ${interaction.commandName} doesn't exist.`
    );
    return;
  }

  try {
    if (flag) {
      await interaction.reply("Of course, one second while I think");
      const embed = new EmbedBuilder()
        .setAuthor({
          name: `Started playing ${interaction.options.getString("song")}  🎧`,
        })
        .setColor("#13f857");

      const back = new ButtonBuilder()
        .setLabel("Back")
        .setCustomId(JSON.stringify({ ffb: "back" }))
        .setStyle("Primary");

      const skip = new ButtonBuilder()
        .setLabel("Skip")
        .setCustomId(JSON.stringify({ ffb: "skip" }))
        .setStyle("Primary");

      const resumepause = new ButtonBuilder()
        .setLabel("Resume & Pause")
        .setCustomId(JSON.stringify({ ffb: "resume&pause" }))
        .setStyle("Danger");

      const loop = new ButtonBuilder()
        .setLabel("Loop")
        .setCustomId(JSON.stringify({ ffb: "loop" }))
        .setStyle("Secondary");

      const queuebutton = new ButtonBuilder()
        .setLabel("Queue")
        .setCustomId(JSON.stringify({ ffb: "queue" }))
        .setStyle("Secondary");

      const row = new ActionRowBuilder().addComponents(
        back,
        resumepause,
        loop,
        skip
      );

      const result = await command(interaction, client);
      await interaction.editReply({ content: result, components: [row] });
    } else {
      try {
        await interaction.reply("Of course, one second while I think");
        const result = await command(interaction);
        await interaction.editReply(result);
      } catch (e) {
        interaction.editReply(
          "this idiot typed " + interaction.options.getString("input")
        );
      }
    }
  } catch (error) {
    console.error(error);
    await interaction.editReply({
      content:
        "There was an error when trying to execute this command. Let Matthew or TJ know.",
    });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
