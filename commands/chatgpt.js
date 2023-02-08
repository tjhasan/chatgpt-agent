import { SlashCommandBuilder } from "discord.js";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_TOKEN,
});

const openai = new OpenAIApi(configuration);

let prompt = null;

const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: prompt,
  max_tokens: 2056,
});

export const data = new SlashCommandBuilder()
  .setName("chat")
  .setDescription("Interact with ChatGPT in this Discord Channel")
  .addStringOption((option) =>
    option
      .setName("input")
      .setDescription("What do you want to ask chatGPT")
      .setRequired(true)
  );

export async function execute(interaction) {
  prompt = interaction.options.getString("input");
  console.log(prompt);
  await interaction.reply(completion.data.choices[0].text);
}
