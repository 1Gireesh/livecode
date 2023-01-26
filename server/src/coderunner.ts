import express from 'express';
import {exec} from "child_process"
import fs from "fs"


export const coderunner=express.Router()



coderunner.post("/",(req,res)=>{
    let {code}=req.body || ""
    console.log(req.body)
    try{
        fs.writeFileSync("code.js",code)
        exec("node code.js",(error,stdout,stderr)=>{
            if (error){
                console.log(error)
                return res.status(200).send({res:stderr,fl:false})
            }
            if (stderr){
                return res.status(200).send({res:stderr,fl:false})
            }
            if (stdout){
                return res.status(200).send({res:stdout,fl:true})
            }
        })
    }catch(e){
        res.status(401).send(e)
    }
})




