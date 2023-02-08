import { SlashCommandBuilder } from "discord.js";
import { RepeatMode } from "discord-music-player";

export const data = new SlashCommandBuilder()
  .setName("playlist")
  .setDescription("Play a playlist")
  .addStringOption((option) =>
    option
      .setName("playlist")
      .setDescription("What songs shall Mimir sing for you")
      .setRequired(true)
  );

export async function execute(interaction, client) {
    let queue = client.player.createQueue(interaction.guild.id);
    await queue.join(interaction.member.voice.channel.id);
    let song = await queue.playlist(interaction.options.getString("playlist")).catch(err => {
        console.log(err);
        if(!guildQueue)
            queue.stop();
    });

    return "Here's your playlist";
}