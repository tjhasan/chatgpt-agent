import { SlashCommandBuilder } from "discord.js";
import { RepeatMode } from "discord-music-player";

export const data = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Play a song")
  .addStringOption((option) =>
    option
      .setName("song")
      .setDescription("What song shall Mimir sing for you")
      .setRequired(true)
  );

export async function execute(interaction, client) {
    let queue = client.player.createQueue(interaction.guild.id);
    await queue.join(interaction.member.voice.channel);
    
    let song = await queue.play(interaction.options.getString("song")).catch(err => {
        console.log(err);
        if(!guildQueue)
            queue.stop();
    });

    return ("Now playing: " + queue.nowPlaying);
}