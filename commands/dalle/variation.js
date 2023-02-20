import fs from "fs";

export async function execute(name, url) {
  fs.writeFileSync(`./${name}`, url);
  return 0;
}
