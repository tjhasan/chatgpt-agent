import { Configuration, OpenAIApi } from "openai";
import "dotenv/config.js";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_TOKEN,
});

export const openai = new OpenAIApi(configuration);
