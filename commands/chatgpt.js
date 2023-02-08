import { SlashCommandBuilder } from "discord.js";
import "dotenv/config.js";
import { Configuration, OpenAIApi } from "openai";

//import { openai } from "../OpenAI/openAIroutes.js"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_TOKEN,
});

const openai = new OpenAIApi(configuration);

async function completion(prompt) {
    let response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 256,
    })

    return response;
};

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
  let prompt = interaction.options.getString("input");
  console.log(prompt);
  let response = await completion(prompt);
  console.log(response)
  await interaction.reply(response.data.choices[0].text);
}
