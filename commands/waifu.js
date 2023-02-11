import { SlashCommandBuilder } from "discord.js";
import { PythonShell } from "python-shell";

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
        {
          name: "AnythingV3",
          value: "anything-v3.safetensors",
        },
        {
          name: "SFW_AbyssOrangeMix2",
          value: "AbyssOrangeMix2_sfw.safetensors",
        },
        {
          name: "NSFW_AbyssOrangeMix2",
          value: "AbyssOrangeMix2_nsfw.safetensors",
        },
        {
          name: "SFW_EerieOrangeMix2",
          value: "EerieOrangeMix2_base.ckpt",
        },
        {
          name: "NSFW_EerieOrangeMix2",
          value: "EerieOrangeMix2_night.safetensors",
        }
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
  .addStringOption((option) =>
    option
      .setName("seed")
      .setDescription(
        "What seed do you want to generate on? Can be a positive whole number."
      )
      .setRequired(true)
  );

let options = {
  scriptPath: "./image_download",
  args: [
    "model",
    "prompt",
    "negative_prompt",
    "seed",
    "sampler",
    "steps",
    "denoise_strength",
  ],
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
  let model = interaction.options.getString("model");
  let prompt = interaction.options.getString("prompt");
  let negative_prompt = interaction.options.getString("negative_prompt");
  let seed = interaction.options.getString("seed");

  let sampler = "DPM++ SDE Karras";

  if (model === "anything-v3.safetensors") {
    sampler = "DPM++ 2M Karras";
  }

  let steps = 20;
  let denoise_strength = 0.5;

  if (
    model === "EerieOrangeMix2_base.ckpt" ||
    "EerieOrangeMix2_night.safetensors"
  ) {
    steps = 24;
    denoise_strength = 0.45;
  }

  options.args[0] = model;
  options.args[1] = prompt;
  options.args[2] = negative_prompt;
  options.args[3] = seed;
  options.args[4] = sampler;
  options.args[5] = steps;
  options.args[6] = denoise_strength;

  await runpythoncode();

  if (pyResult === "Success") {
    return { files: [{ attachment: "./waifu.png" }] };
  } else {
    return "Can't connect to server. Ask TJ to turn it on or go do something else.";
  }
}
