import { SlashCommandBuilder } from "discord.js";
import { RepeatMode } from "discord-music-player";

export const data = new SlashCommandBuilder()
  .setName("resume")
  .setDescription("Resume song")

export async function execute(interaction, client) {
    let guildQueue = client.player.getQueue(interaction.guild.id);

    guildQueue.setPaused(false);

    return "Mimir resumed the song";
}