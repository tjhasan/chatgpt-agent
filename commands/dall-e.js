import { SlashCommandBuilder } from "discord.js";
import { openai } from "../OpenAI/openAIroutes.js";
import { PythonShell } from "python-shell";
import { addImageToStorage } from "../lib/firebase/firebaseClient.js";
import * as https from "https";
import { createWriteStream } from "fs";
import * as url from "url";
import * as fs from "fs";

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

let options = {
  scriptPath: "./image_download",
  args: ["", ""],
};

function runpythoncode() {
  return new Promise((resolve) => {
    PythonShell.run("vision.py", options, (err, result) => {
      if (err) throw err;
      resolve();
    });
  });
}

export async function execute(interaction) {
  try {
    let prompt = interaction.options.getString("input");
    options.args[0] = prompt;
    options.args[1] = process.env.OPENAI_TOKEN;
    await runpythoncode(prompt);

    return { files: [{ attachment: "../vision.png" }] };

    // if (response?.data) {
    //   return response.data.data[0].url;
    // } else {
    //   console.log("Shouldn't be here");
    //   interaction.editReply(
    //     "this idiot typed " + interaction.options.getString("input")
    //   );
    // }
  } catch (e) {
    console.log(e);
    interaction.editReply(
      "this idiot typed " + interaction.options.getString("input")
    );
  }
}
