import { SlashCommandBuilder } from "discord.js";
import { RepeatMode } from "discord-music-player";

export const data = new SlashCommandBuilder()
  .setName("toggle_queue_loop")
  .setDescription("Loop this Queue")

export async function execute(interaction, client) {
    let guildQueue = client.player.getQueue(interaction.guild.id);

    guildQueue.setRepeatMode(RepeatMode.QUEUE); // or 2 instead of RepeatMode.QUEUE

    return "Mimir started looping the queue";
}