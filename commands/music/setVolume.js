import { SlashCommandBuilder } from "discord.js";
import { RepeatMode } from "discord-music-player";

export const data = new SlashCommandBuilder()
  .setName("set_volume")
  .setDescription("Set Mimir's volume")
  .addStringOption((option) =>
    option
      .setName("volume_level")
      .setDescription("How loud shall Mimir sing for you")
      .setRequired(true)
  );

export async function execute(interaction, client) {
    let guildQueue = client.player.getQueue(interaction.guild.id);

    guildQueue.setVolume(parseInt(interaction.options.getString("Volume Level")));

    return ("Mimir set volume to " + interaction.options.getString("Volume Level") ) ;
}