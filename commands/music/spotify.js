import { SlashCommandBuilder } from "discord.js";
import { RepeatMode } from "discord-music-player";
import { DisTube } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
import { spotifyToYT } from "spotify-to-yt";

export const data = new SlashCommandBuilder()
  .setName("spotify")
  .setDescription("Play a spotify playlist")
  .addStringOption((option) =>
    option
      .setName("playlist")
      .setDescription("What songs shall Mimir sing for you")
      .setRequired(true)
  );

export async function execute(interaction, client) {

    let ytUrl = spotifyToYT.playListGet(interactions.options.getString("playlist"));

    const distube = new DisTube(client, {
        plugins: [new SpotifyPlugin()],
    });
    // let queue = client.player.createQueue(interaction.guild.id);
    // await queue.join(interaction.member.voice.channel.id);
    // let song = await queue.playlist(interaction.options.getString("playlist")).catch(err => {
    //     console.log(err);
    //     if(!guildQueue)
    //         queue.stop();
    // });

    console.log(distube)

    return "Here's your playlist";
}