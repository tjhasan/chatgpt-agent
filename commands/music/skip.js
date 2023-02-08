import { SlashCommandBuilder } from "discord.js";
import { RepeatMode } from "discord-music-player";

export const data = new SlashCommandBuilder()
  .setName("skip")
  .setDescription("Skip song")

export async function execute(interaction, client) {
    let guildQueue = client.player.getQueue(interaction.guild.id);

    guildQueue.skip();

    return "Mimir skipped the song";
}