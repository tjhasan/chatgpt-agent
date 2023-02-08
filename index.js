import "dotenv/config.js";
import { Client, GatewayIntentBits, Collection, Events } from "discord.js";
import { execute as pingExecute } from "./commands/ping.js";
import { execute as chatGptExecute } from "./commands/chatgpt.js";
import { execute as chatGptVoiceExecute } from "./commands/chatgptvoice.js";
import { execute as dalleExecute } from "./commands/dall-e.js";
import { Player } from "discord-music-player";

// intialize client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
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
  if (interaction.commandName == "ping") {
    command = pingExecute;
  } else if (interaction.commandName == "chat") {
    command = chatGptExecute;
  } else if (interaction.commandName == "voice") {
    command = chatGptVoiceExecute;
    voiceFlag = true;
  } else if (interaction.commandName == "vision") {
    command = dalleExecute;
  }

  if (!command) {
    console.error(
      `This shouldn't happen. ${interaction.commandName} doesn't exist.`
    );
    return;
  }

  try {
    if(flag) {
      await interaction.reply("Of course, one second while I think");
      const result = await command(interaction, client);
      await interaction.editReply(result);
    }
    else {
      try {
        await interaction.reply("Of course, one second while I think");
        const result = await command(interaction);
        await interaction.editReply(result);
      }
      catch(e) {
        interaction.editReply("this idiot typed " + interaction.options.getString("input"))
      }
    }
    
  } catch (error) {
    console.error(error);
    await interaction.editReply({
      content:
        "There was an error when trying to execute this command. Let TJ know.",
    });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
