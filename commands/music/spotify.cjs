const { SlashCommandBuilder } = require("discord.js");
const fetch = require("isomorphic-unfetch");
const { getData, getTracks } = require('spotify-url-info')(fetch)
const yt = require("youtube-sr").default;


async function getPlaylist(url) {
  let data = await getData(url);
  let tracks = await getTracks(url);
  try {
    if (data.type !== "playlist") throw new Error("The URL is invalid!");
    var songs = [];
    for (const song of tracks) {
      let search = await yt.search(
        `${song.name} ${song.artist}`,
        { limit: 1, type: "video" }
      );
      songs.push(search[0].url);
    }
    var infoPlayList = await getData(url);
    return {
      songs: songs,
      info: infoPlayList,
    };
  } catch (e) {
    console.log(e);
    throw new Error(
      "An error occurred while trying to get information from the specified playlist.\n" +
        e
    );
  }
}

const data = new SlashCommandBuilder()
  .setName("spotify")
  .setDescription("Play a spotify playlist")
  .addStringOption((option) =>
    option
      .setName("playlist")
      .setDescription("What songs shall Mimir sing for you")
      .setRequired(true)
  );

async function execute(interaction, client) {

    let ytUrl = await getPlaylist(interaction.options.getString("playlist"));

    let queue = client.player.createQueue(interaction.guild.id);
    await queue.join(interaction.member.voice.channel);
    console.log(ytUrl.songs[0])

    for(let i = 0; i < ytUrl.songs.length; i++) {
      try {
        let song = await queue.play(String(ytUrl.songs[i])).catch(err => {
          console.log(err);
          if(!guildQueue)
              queue.stop();
        });
      }
      catch(e) {
        console.log("didn't find a song continuing")
        continue;
      }
      
      
    }


    return "Here's your playlist";
}

exports.data = data;
exports.execute = execute;