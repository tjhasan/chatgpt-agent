import { SlashCommandBuilder } from "discord.js";
import "dotenv/config.js";

import { openai } from "../OpenAI/openAIroutes.js";
import { joinVoiceChannel } from "@discordjs/voice";

import fs from "fs"


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

export async function execute(interaction, client) {
    try {
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });


        console.log(interaction.member);
        const audio = connection.receiver(interaction.member.user.username, { mode: 'pcm' });

        audio.pipe(fs.createWriteStream('user_audio'));
    }
    catch(e) {
        console.log(e);
    }

    return "talk to me friend";
//   let prompt = interaction.options.getString("input");

//   let response = await completion(prompt);
//   console.log(response);

//   return response.data.choices[0].text;
}