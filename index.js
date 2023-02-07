import "dotenv/config.js";
import { Client, GatewayIntentBits, Collection, Events } from "discord.js";
import { execute as pingExecute, data as pingData } from "./commands/ping.js";

// intialize client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  let command = null;
  if (interaction.commandName == "ping") {
    command = pingExecute;
  }

  try {
    await command(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content:
        "There was an error when trying to execute this command. Let TJ know.",
    });
  }
});

console.log(process.env.DISCORD_BOT_TOKEN);
client.login(process.env.DISCORD_BOT_TOKEN);
