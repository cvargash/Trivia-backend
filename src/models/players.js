const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const playerSchema = new mongoose.Schema({
    name:{
        type:String, //Tipo variable
        required:true, //Campo obligatorio
        trim:true, // Eliminar espacios en blanco
        unique:true, // No se puede repetir combinacion caracteres
        lowercase:true // todos los usuarios esten en minuscula
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        trim: true,
        validate(value){
            if(value == "12345678"){
                throw new Error("La contraseña no puede ser 12345678")
            }
        }
    },
    tokens:[
        {token:{
            type: String,
            required:true
        }}
    ],
    score:{
        type: Number,
        default: 0
    }
})

playerSchema.methods.hashPassword = async function(){
    this.password = await bcrypt.hash(this.password, 5)
}

playerSchema.methods.verifyPassword = async function(password){
    const isEqual = await bcrypt.compare(password, this.password)
    return isEqual
}

playerSchema.methods.generateToken = function(){
    const token=jwt.sign({_id:this.name.toString()}, process.env.AUTH_PASSWORD)
    this.tokens=this.tokens.concat({token})
    this.save()
    return token
}


const Player = mongoose.model("Player", playerSchema)
module.exports = Player

