import { Integration, SlashCommandBuilder } from "discord.js";
import { openai } from "../OpenAI/openAIroutes.js";

async function completion(prompt) {
  let response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });

  return response;
}

export const data = new SlashCommandBuilder()
  .setName("vision")
  .setDescription("Ask Mimir to show you a vision of something wonderful")
  .addStringOption((option) =>
    option
      .setName("input")
      .setDescription("What do you want Mimir to show you?")
      .setRequired(true)
  );

export async function execute(interaction) {

    try {
        let prompt = interaction.options.getString("input");

        let response = await completion(prompt);
        console.log(response);

        if(response?.data) {
            return response.data.data[0].url;
        }
        else {
            interaction.editReply("this idiot typed " + interaction.options.getString("input"))
        }

       
    }
    catch(e) {
        interaction.editReply("this idiot typed " + interaction.options.getString("input"))
    }
  
}
