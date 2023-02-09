import { SlashCommandBuilder } from "discord.js";
import { PythonShell } from "python-shell";

export const data = new SlashCommandBuilder()
  .setName("waifu_vision")
  .setDescription("Ask Mimir to show you the anime girl of your dreams.")
  .addStringOption((option) =>
    option
      .setName("prompt")
      .setDescription("MUST be a comma separated list of delbooru tags.")
      .setRequired(true)
  );

let options = {
  scriptPath: "./",
  args: [],
};

function runpythoncode() {
  return new Promise((resolve) => {
    PythonShell.run("test.py", options, (err, result) => {
      err ? console.log(err) : console.log(result);
      resolve();
    });
  });
}

export async function execute(interaction) {
  try {
    let prompt = interaction.options.getString("prompt");
    options.args.push(prompt);
    await runpythoncode();
    console.log("python script returned");
  } catch (error) {}
}
