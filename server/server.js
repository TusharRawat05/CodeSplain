import 'dotenv/config';
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import  OpenAI  from 'openai';

const app=express();

//security middleware

app.use(helmet());
app.use(cors(
    {
        origin: process.env.FRONTEND_URL || "",
        credentials:true,
    }
))

const limiter=rateLimit({
    windowMs:15 * 60 * 1000,
    max:100,
    message:"Too many request from this IP, please try again after some times"
})

app.use(limiter)
app.use(express.json({limit:"10mb"}))

const API_KEY=process.env.NEBIUS_API_KEY
const client = new OpenAI({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: API_KEY,
});



app.post("/api/explain-code",async(req,res)=>{
    try {
        const{code,language}=req.body;
        if(!code){
            return res.status(400).json({error:"Code is required"})
        }

        const messages=[
            {
                role:"user",
                content:`Explain this ${language} code briefly and simply: ${code}and also tell the ${code} is in which language at top language `

            }
        ]
        const response=await client.chat.completions.create({
           model: "openai/gpt-oss-120b",
           messages,
           temperature:0.3,
           max_token:600,
        })
        const explaination=response?.choices[0]?.message?.content;
        if(!explaination){
            return res.status(500).json({error:"Failed to explain code"})
        }
        res.json({explaination,language:language||"unknown"});
    } catch (error) {
        console.error("code Explain API error:",error);
        res.status(500).json({error:"server error",details:error.message})
    }
    
})


const PORT=process.env.PORT || 3002;

app.listen(PORT,()=>{
    console.log(`API server is listening on https://localhost${PORT}`)
})