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
  scriptPath: "../image-download",
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
    return { files: [{ attachment: "../waifu.png" }] };
  } else {
    return "Can't connect to server. Ask TJ to turn it on or go do something else.";
  }
}
