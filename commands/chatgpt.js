import { SlashCommandBuilder } from "discord.js";
import "dotenv/config.js";

import { openai } from "../OpenAI/openAIroutes.js";

async function completion(prompt) {
  let response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 4000,
    echo: true,
  });

  return response;
}

export const data = new SlashCommandBuilder()
  .setName("chat")
  .setDescription("Interact with ChatGPT in this Discord Channel")
  .addStringOption((option) =>
    option
      .setName("input")
      .setDescription("What do you want to ask Mimir")
      .setRequired(true)
  );

export async function execute(interaction) {
  let prompt = interaction.options.getString("input");

  let response = await completion(prompt);
  // console.log(response);

  if(response.data.choices[0].text) {
    return response.data.choices[0].text;
  }
  else {
    return ("This idiot typed " + interaction.options.getString("input"))
  }
  
}
