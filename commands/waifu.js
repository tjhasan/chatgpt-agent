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
      .setName("model")
      .setDescription(
        "Which model would you like to choose? Use \\waifu-help for more info."
      )
      .setRequired(true)
      .addChoices(
        { name: "AOM2", value: "AOM2.safetensors" },
        { name: "BOM", value: "BOM.safetensors" },
        { name: "EOM2", value: "EOM2.safetensors" },
        { name: "WDModel", value: "WDmodel.ckpt" }
      )
  )
  .addStringOption((option) =>
    option
      .setName("prompt")
      .setDescription(
        "MUST be a comma separated list of descriptors you WANT to see. Use \\waifu-help for more info."
      )
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("negative_prompt")
      .setDescription(
        "MUST be a comma separated list of descriptors you DO NOT want to see. Use \\waifu-help for more info."
      )
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName("seed")
      .setDescription(
        "What seed do you want to generate on? Can be a positive whole number. Leave blank if you don't know."
      )
  );
/*
Need to add the following options to args:
  user input:
    done - model: Which model to use
    done - prompt: What the user wants to see (can do)
    done - negative prompt: What the user doesn't want to see (can do)
    done - seed: Random if not given. Print out seed when used.

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
