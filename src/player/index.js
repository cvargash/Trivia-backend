const Player = require("../models/players")
const express = require("express")
const router = new express.Router()


router.post("/players/register",async(req,res)=>{
    try{
        const request = req.body
        const player = await Player.create ({
            name: request.name,
            password: request.password
        }).catch(error =>{
            console.log(error)
            throw new Error("El usuario ya existe")
        })
        
        await player.hashPassword(request.password)
        await player.save()
        const token = player.generateToken(request.name)
        res.status(200).send({data:{token}, status:true, message:"Registro Exitoso"})
    }catch(error){
        console.log(error)
        res.status(200).send({data:{error:error.toString()}, status:false, message:"Error"})
    }
})

router.post("/player/login",async(req,res)=>{
    try{
    const request = req.body
    const player = await Player.findOne({
        name:request.name
    }).catch(error =>{
        console.log(error)
        throw new Error("El usuario no se encuentra")
    })
    if(player==null){
        throw new Error("No se encuentra el usuario")
    }
        const match = await player.verifyPassword(request.password)
        if(match==false){
            throw new Error("La constraseña es incorrecta")
        }
        const token = player.generateToken()
        res.status(200).send({data:{token}, status:true, message:"Acceso correcto"})
    }catch(error){
        console.log(error)
        res.status(200).send({data:{error:error.toString()}, status:false, message:"Error"})
    }
})

 

module.exports=router