import { SlashCommandBuilder } from "discord.js";
import "dotenv/config.js";

import { openai } from "../OpenAI/openAIroutes.js";
import { joinVoiceChannel } from "discord.js/voice";


async function completion(prompt) {
  let response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 256,
    echo: true,
  });

  return response;
}

export const data = new SlashCommandBuilder()
  .setName("voice")
  .setDescription("Interact with ChatGPT in this Discord Channel");

export async function execute(interaction) {
    joinVoiceChannel()
//   let prompt = interaction.options.getString("input");

//   let response = await completion(prompt);
//   console.log(response);

//   return response.data.choices[0].text;
}