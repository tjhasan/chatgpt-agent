import { SlashCommandBuilder } from "discord.js";
import { RepeatMode } from "discord-music-player";

export const data = new SlashCommandBuilder()
  .setName("get_queue")
  .setDescription("Mimir will tell you all the songs in your queue")

export async function execute(interaction, client) {
    let guildQueue = client.player.getQueue(interaction.guild.id);
    let songs = []
    for(let i = 0; i < guildQueue.songs.length; i++) {
      let number = i + 1;
      songs.push(number + ". " + guildQueue.songs[i].name);
    }

    let finalArray = songs.join('\n')

    return String(finalArray);
}