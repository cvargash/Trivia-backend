const express = require("express")
const router = new express.Router()
const {getSingleTriviaQuestions, verifyAnswer, updatePlayerScore} = require("./utilis")
const verifyToken = require("../middleware/auth")

router.get("/questions/single", verifyToken, (req,res)=>{
    try{
        const question = getSingleTriviaQuestions()
        res.status(200).send({data:{question}, status:true, message:"Consulta exitosa"})
    }catch(error){
        console.log("error", error)
        res.status(200).send({data:{}, status:false, message:"error consulta"})
    }
    
})

router.post("/questions/response", verifyToken, async (req,res)=>{
    try{const request = req.body
    const winner = await verifyAnswer(request.question,request.answer)
    const score = updatePlayerScore(req.headers["user"],winner)
    res.status(200).send({data:{score}, status:true, message: "Actualización completa"})
    }catch(error){
        console.log("Error", error)
        res.status(200).send({data:{error}, status:false, message:"Error"})
    }
})



module.exports = router
