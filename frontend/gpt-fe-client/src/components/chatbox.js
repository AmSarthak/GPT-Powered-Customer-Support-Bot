import React, { useState } from 'react';
import '../../src/App.css';
import axios from 'axios';
import { Audio, InfinitySpin } from  'react-loader-spinner'


function ChatBot () {
    const [typedText,setTypedText] = React.useState('')
    const [chatMsg,setChatMsg] = React.useState('')
    const [responseModel,setResponseModel] = useState({

    })
    const [loading,setLoading] = useState(false)

    function handleSubmit(){
        setChatMsg(typedText)
        setTypedText('')
        setResponseModel({})
        setLoading(true)
        axios.post('http://localhost:5000/callgpt',{
            "keyword":typedText
        }).then((res)=>{
            setResponseModel(res.data)
            setLoading(false)
        }).catch((err)=>{
            console.log(err)
        })
    }
    function clearData(){
        setChatMsg('');
        setTypedText('');
        setResponseModel({})
    }

    function handleDataSubmit(){}

    return(
        <div>
            <div className='outline-box'>
                <div className='mb-2 bg-primary text-white header'>
                    <span>GPT CHATBOT</span>
                </div>
                <div className='chat-area'>
                    {chatMsg &&
                        <div className='user-msg'>
                        <span>{chatMsg}</span>
                        </div>

                    }
                    {responseModel.reply && 
                        <div className='support-msg'>
                            <span>{responseModel.reply}</span>
                        </div>
                    }
                </div>
                <br/>
                <div className='input-area'>
                    <input value={typedText} onChange={(e)=>setTypedText(e.target.value)} type='text' placeholder='Submit your query'></input>
                </div>
                <br/>
                <div className='submit-btn'>
                    <button className='btn btn-primary' onClick={()=>handleSubmit()} type='button'>Submit</button>
                    <button className='btn btn-default' onClick={()=>clearData()} type='button'>Clear</button>
                </div>
                <br/>
                {loading && <InfinitySpin 
                    width='200'
                    color="#0d6efd"
                />}
                {!loading && responseModel.intent &&
                    <div>
                        <br/>
                        <div className='gen-input'>
                            <label for="ip-data">{responseModel.label}</label>
                            <br/>
                            <input type='text' placeholder={responseModel.placeholder}></input>
                            <br/>
                            <button className='btn btn-primary' onClick={()=>handleDataSubmit()} type='button'>Submit</button>
                        </div>
                    </div>
                }
            </div>
            <br></br>
            {responseModel.intent && 
                <div className='output'>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Parameter</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Intent</td>
                                <td>{responseModel.intent}</td>
                            </tr>
                            <tr>
                                <td>Product Name</td>
                                <td>{responseModel.product_name}</td>
                            </tr>
                            <tr>
                                <td>Emotion</td>
                                <td>{responseModel.emotion}</td>
                            </tr>
                            <tr>
                                <td>Keywords</td>
                                <td>{responseModel.keywords}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
            
        </div>
    )
}

export default ChatBot;