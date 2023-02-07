import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder().setName("ping").setDescription("Test");

export async function execute(interaction) {
  await interaction.reply("Pong");
}
