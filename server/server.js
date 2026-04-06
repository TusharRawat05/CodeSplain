import 'dotenv/config';
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app=express();

//security middleware

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors(
    {
        origin: function (origin, callback) {
            callback(null, true);
        },
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

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

app.post("/api/explain-code",async(req,res)=>{
    try {
        const{code,language}=req.body;
        if(!code){
            return res.status(400).json({error:"Code is required"})
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `Explain this ${language} code briefly and simply:\n\n${code}\n\nAnd also state at the very top which programming language this is.`;
        
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 4096,
            }
        });
        
        const explaination = result.response.text();
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