const express = require('express');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: "org-GFMlklBLSF0djyxS3y9m3Nbx",
    apiKey: "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"
});
const openai = new OpenAIApi(configuration);
const app = express ();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.post('/getprompt', (request, response) => {
    const prompt = request.body.prompt;
    openai
    .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature:0
    })
    .then((res) => {
        response.status(200).send(res.data.choices[0].message.content);
    })
    .catch((err)=>{
        console.log(err)
    })
 });

app.listen(PORT, () => {
    console.log("GPT microservice running on PORT:", PORT);
});

