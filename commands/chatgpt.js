import { SlashCommandBuilder } from "discord.js";

<<<<<<< HEAD
const data = new SlashCommandBuilder().setName("chat").setDescription("Interact with ChatGPT in this Discord Channel");
=======
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
>>>>>>> 035a0e0cc371b686eb3d6f99acab387a159bf1d1

export async function execute(interaction) {
  await interaction.reply(completion.data.choices[0].text);
}
