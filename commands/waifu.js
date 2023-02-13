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
          name: "Dreamshaper -> Great general use model. Good for landscapes, portraits, anime, etc.",
          value: "dreamshaper.safetensors",
        },
        {
          name: "Robo Diffusion -> Robot / Mech centered art",
          value: "robodiffusion.safetensors",
        },
        {
          name: "Pastel Mix -> Unique, pastel style pictures.",
          value: "pastelwaifu.safetensors",
        },
        {
          name: "Cetus-Mix -> Good for anime art with more detailed backgrounds.",
          value: "cetusmix.safetensors",
        },
        {
          name: "Ligne Clair -> Great for 'Ghibli' style art. Strong lines, flat colors, low gradient.",
          value: "ligneclaire.safetensors",
        },
        {
          name: "(NSFW) Corneo's 7th Heaven Mix -> Great for general use. Really good for NSFW.",
          value: "corneos7thheavenmix.safetensors",
        },
        {
          name: "(NSFW) Counterfeit-V2.5 -> Great for highly detailed SFW ~ soft NSFW anime pictures.",
          value: "counterfeitV25.safetensors",
        },
        {
          name: "(NSFW) Babes -> Generate babes. Mostly western style.",
          value: "babes.safetensors",
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
        "What seed do you want to generate on? Can be a positive whole number. Default -1"
      )
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

  let sampler = "DPM++ 2M Karras";
  let steps = 20;
  let denoise_strength = 0.5;
  let vae = "None";
  let cfg_scale = 7;

  if (seed == null) {
    seed = -1;
  }

  console.log(seed);

  switch (model) {
    case "robodiffusion.safetensors":
      prompt += ", nousr robot, mdjrny-v4 style";
      sampler = "DPM++ SDE Karras";
      steps = 23;
      break;
    case "corneos7thheavenmix.safetensors":
      sampler = "Euler a";
      steps = 30;
      cfg_scale = 10;
      break;
    case "counterfeitV25.safetensors":
      cfg_scale = 10;
      break;
    case "pastelwaifu.safetensors":
      vae = "pastelwaifu.vae.pt";
      break;
    case "cetusmix.safetensors":
      vae = "pastelwaifu.vae.pt";
      break;
    case "ligneclaire.safetensors":
      prompt +=
        ", ligne claire, flat color, limited palette, low contrast, high contrast, chromatic aberration";
      steps = 13;
      break;
    case "babes.safetensors":
      vae = "babes.vae.pt";
      steps = 24;
      cfg_scale = 5;
      break;
  }

  options.args[0] = model;
  options.args[1] = prompt;
  options.args[2] = negative_prompt;
  options.args[3] = seed;
  options.args[4] = sampler;
  options.args[5] = steps;
  options.args[6] = denoise_strength;
  options.args[7] = vae;
  options.args[8] = cfg_scale;

  await runpythoncode();

  if (pyResult === "Success") {
    return { files: [{ attachment: "./waifu.png" }] };
  } else {
    return "Can't connect to server. Ask TJ to turn it on or go do something else.";
  }
}
