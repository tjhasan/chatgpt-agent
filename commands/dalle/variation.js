import fs from "fs";

let options = {
  scriptPath: "./image_download",
  args: [""],
};

function runpythoncode() {
  pyResult = "";
  return new Promise((resolve) => {
    PythonShell.run("variation.py", options, (err, result) => {
      pyResult = result[0];
      resolve();
    });
  });
}

export async function execute(name, url) {
  fs.writeFileSync(`./${name}`, url);
  await runpythoncode();
  return 0;
}
