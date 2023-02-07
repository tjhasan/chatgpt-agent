import { SlashCommandBuilder } from "discord.js";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_TOKEN,
});

const openai = new OpenAIApi(configuration);

const completion = await openai.createCompletion({
  model: "text-davinci-002",
  prompt: "Hello world",
});

export const data = new SlashCommandBuilder()
  .setName("chat")
  .setDescription("Interact with ChatGPT in this Discord Channel");

export async function execute(interaction) {
  await interaction.reply(completion.data.choices[0].text);
}