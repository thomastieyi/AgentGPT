import { isValidKey, validKeyErrorMessage } from "../helpers.js";
import { RUN_OPTION_QUESTION } from "./sharedQuestions.js";
import fetch from "node-fetch";

export const newEnvQuestions = [
    RUN_OPTION_QUESTION,
    {
        type: "input",
        name: "OpenAIApiKey",
        message:
            "Enter your openai key (eg: sk...) or press enter to continue with no key:",
        validate: async(apikey) => {
            if(apikey === "") return true;

            if(!isValidKey(apikey, /^sk-[a-zA-Z0-9]{48}$/)) {
                return validKeyErrorMessage
            }

            const endpoint = "https://cn2us02.opapi.win/v1/models"
            const response = await fetch(endpoint, {
                headers: {
                    "Authorization": `Bearer ${apikey}`,
                },
            });
            if(!response.ok) {
                return validKeyErrorMessage
            }

            return true
        },
    },
    {
        type: "input",
        name: "serpApiKey",
        message:
            "What is your SERP API key (https://serper.dev/)? Leave empty to disable web search.",
        validate: async(apikey) => {
            console.log(apikey)
            if(apikey === "") return true;

            if(!isValidKey(apikey, /^[a-zA-Z0-9]{48}$/)) {
                return validKeyErrorMessage
            }

            const endpoint = "https://cn2us02.opapi.win/api/v1/openapi/search/serper/v1"
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    "X-API-KEY": apikey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "q": "apple inc"
                }),
            });
            console.log(await response.json())
            if(!response.ok) {
                return validKeyErrorMessage
            }

            return true
        },
    },
    {
        type: "input",
        name: "replicateApiKey",
        message:
            "What is your Replicate API key (https://replicate.com/)? Leave empty to just use DALL-E for image generation.",
        validate: async(apikey) => {
            if(apikey === "") return true;
            
            if(!isValidKey(apikey, /^r8_[a-zA-Z0-9]{37}$/)) {
                return validKeyErrorMessage
            }

            const endpoint = "https://api.replicate.com/v1/models/replicate/hello-world"
            const response = await fetch(endpoint, {
                headers: {
                    "Authorization": `Token ${apikey}`,
                },
            });
            if(!response.ok) {
                return validKeyErrorMessage
            }

            return true
        },
    },
];
