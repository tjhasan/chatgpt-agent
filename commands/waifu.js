import { SlashCommandBuilder } from "discord.js";
import { PythonShell } from "python-shell";

/*
Need to add the following options:
  model: which model should they run the prompt on (should be a list to choose from)
  
*/
export const data = new SlashCommandBuilder()
  .setName("waifu_vision")
  .setDescription("Ask Mimir to show you the anime girl of your dreams.")
  .addStringOption((option) =>
    option
      .setName("prompt")
      .setDescription(
        "MUST be a comma separated list of descriptors. Use \\waitfu-help for more info."
      )
      .setRequired(true)
  );

/*
Need to add the following options to args:
  user input:
    - model: Which model to use (can do)
    - prompt: What the user wants to see (can do)
    - negative prompt: What the user doesn't want to see (can do)
    - seed: Random if not given. Print out seed when used.

  Depends on user chosen model:
    - sampler: Which sampler to use (can do)
    - steps: How many steps the diffuser should take: (can do)
    - Denoise Strength: (can do)
*/
let options = {
  scriptPath: "./image_download",
  args: [""],
};

let pyResult = "";

function runpythoncode() {
  pyResult = "";
  return new Promise((resolve) => {
    PythonShell.run("waifu.py", options, (err, result) => {
      if (err) {
        pyResult = "Error";
      } else {
        pyResult = "Success";
      }
      resolve();
    });
  });
}

export async function execute(interaction) {
  let prompt = interaction.options.getString("prompt");
  options.args[0] = prompt;
  await runpythoncode();

  if (pyResult === "Success") {
    return { files: [{ attachment: "./waifu.png" }] };
  } else {
    return "Can't connect to server. Ask TJ to turn it on or go do something else.";
  }
}
