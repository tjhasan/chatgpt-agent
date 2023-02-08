import { SlashCommandBuilder } from "discord.js";
import { RepeatMode } from "discord-music-player";

export const data = new SlashCommandBuilder()
  .setName("pause")
  .setDescription("Pause song")

export async function execute(interaction, client) {
    let guildQueue = client.player.getQueue(interaction.guild.id);

    guildQueue.setPaused(true);

    return "Mimir paused the song";
}