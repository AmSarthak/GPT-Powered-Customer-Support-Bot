const express = require('express');
const axios = require('axios');

const app = express ();
app.use(express.json());

const PORT = 5000;

app.post('/callgpt', (request, response) => {
    const keyword = request?.body?.keyword;
    if(keyword == ''){
        response.status(400).send("tor baper poisa bara?")
    }
    else{
        const prompt = "Pretend you are a customer support chatbot. Tell me the intent, product name , emotion of customer and important keywords like bike specifications, problem descriptions etc of the paragraph delimited by angular brackets. <" + keyword + ">. Classify intent among buy,talk_to_agent,raise_complaint,enquire_about_product,null. Suggest a suitable and polite reply assuring the customer. Give me the sample label and placeholder for the form input required as per intent. Give answer only in json format like emotion: intent: product_name: reply: keywords: label: placeholder: . Do not give any other output other than JSON."
        
        const object = {
            "prompt" : prompt
        }

        //microservice blackbox
        axios.post('http://localhost:4000/getprompt',object).then((res)=>{
            if(res.data.question!=''){
                isFollowUpQuestion = true;
            }
            else if(res.data.question==null){
                isFollowUpQuestion = false;
            }
            response.status(200).send(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    

 });

app.listen(PORT, () => {
    console.log("Channel Service Listening on PORT:", PORT);
  });

