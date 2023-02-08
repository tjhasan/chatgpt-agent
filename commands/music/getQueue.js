import { SlashCommandBuilder } from "discord.js";
import { RepeatMode } from "discord-music-player";

export const data = new SlashCommandBuilder()
  .setName("get_queue")
  .setDescription("Mimir will tell you all the songs in your queue")

export async function execute(interaction, client) {
    let guildQueue = client.player.getQueue(interaction.guild.id);

    return String(guildQueue);
}