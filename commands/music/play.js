import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder().setName("play").setDescription("Play a song");

export async function execute(interaction, client) {
  await interaction.reply("Pong");
}