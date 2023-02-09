import { SlashCommandBuilder } from "discord.js";
import { openai } from "../OpenAI/openAIroutes.js";
import { addImageToStorage } from "../lib/firebase/firebaseClient.js"
import * as https  from "https";
import { createWriteStream,  } from "fs";
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

export async function execute(interaction) {
  try {
    let prompt = interaction.options.getString("input");

    let response = await completion(prompt);
    //console.log(response);

    if (response?.data) {

      /////////
      /* OK SO BELOW IT SAVES THE IMAGE (THAT WORKS), WHAT WE NEED IS A FILE OR BLOB OBJECT TO PASS TO THE UPLOAD FOR FIREBASE AND ITS DRIVING ME CRAZY                                   */
      ///////



      // const file = createWriteStream("file.png");
      
      // const request = https.get(response.data.data[0].url, async (response) => {
      //   console.log("here");
      //   response.pipe(file);
        
        
        
      //   file.on("finish", async () => {
      //     file.close(async () => {
      //       let fileData = fs.createReadStream(file.path);
      //       console.log(fileData)
      //       const imageUrl = await addImageToStorage(fileData);
      //       return imageUrl;
            
      //     });
      //     console.log("Download Completed");
         
      //   });

        

        
      // });
      
      return response.data.data[0].url;

    } else {
      console.log("Shouldn't be here");
      interaction.editReply(
        "this idiot typed " + interaction.options.getString("input")
      );
    }
  } catch (e) {
    console.log(e)
    interaction.editReply(
      "this idiot typed " + interaction.options.getString("input")
    );
  }
}
