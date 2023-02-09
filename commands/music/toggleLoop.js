import { SlashCommandBuilder } from "discord.js";
import { RepeatMode } from "discord-music-player";

export const data = new SlashCommandBuilder()
  .setName("toggle_loop")
  .setDescription("Loop this song")

export async function execute(interaction, client) {
    let guildQueue = client.player.getQueue(interaction.guild.id);

    guildQueue.setRepeatMode(RepeatMode.SONG); // or 0 instead of RepeatMode.DISABLED

    return "Mimir started looping";
}