import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder().setName("chat").setDescription("Interact with ChatGPT in this Discord Channel");

export async function execute(interaction) {
  await interaction.reply("Pong");
}