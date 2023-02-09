import { SlashCommandBuilder } from "discord.js";
import { RepeatMode } from "discord-music-player";

export const data = new SlashCommandBuilder()
  .setName("seek")
  .setDescription("Seek")
  .addStringOption((option) =>
    option
      .setName("seek")
      .setDescription("How far to seek")
      .setRequired(true)
  );

export async function execute(interaction, client) {
    let guildQueue = client.player.getQueue(interaction.guild.id);

    guildQueue.seek(parseInt(interaction.options.getString("seek")) * 1000);

    return ("Mimir seeked " + parseInt(interaction.options.getString("seek")) * 1000 );
}