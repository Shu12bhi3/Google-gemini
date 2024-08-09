// const apiKey = "AIzaSyAqcV_25oDqyHEHRPO8j8lGN1qi1m5BgG8"
// AIzaSyCrI4CjdpQ1YqQ0DMmX6i2giOTU53fBj2Y
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import{
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  }from "@google/generative-ai"
  const apiKey = "AIzaSyCrI4CjdpQ1YqQ0DMmX6i2giOTU53fBj2Y";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.0-pro",
  });
  
  const generationConfig = {
    temperature: 0.9,
    topP: 1,
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt)
    const response = result.response;
    console.log(result.response.text());
    return response.text();
  }
  
 export default run;