import { SlashCommandBuilder } from "discord.js";
import { openai } from "../../OpenAI/openAIroutes.js";
import { PythonShell } from "python-shell";

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

let pyResult = "";

function runpythoncode() {
  pyResult = "";
  return new Promise((resolve) => {
    PythonShell.run("dalle.py", options, (err, result) => {
      pyResult = result[0];
      resolve();
    });
  });
}

export async function execute(interaction) {
  let prompt = interaction.options.getString("input");
  options.args[0] = prompt;
  options.args[1] = process.env.OPENAI_TOKEN;
  await runpythoncode(prompt);

  if (pyResult === "Success") {
    return { files: [{ attachment: "../vision.png" }] };
  } else {
    return "This idiot typed " + interaction.options.getString("input");
  }
}
