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

client.on("messageCreate", async (message) => {
  if (message.content == "qwerty") {
    await message.reply("asdf");
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = pingExecute;

  if (!command) {
    console.error(
      `This shouldn't happen. ${interaction.commandName} doesn't exist.`
    );
    return;
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
