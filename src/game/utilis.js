const Question = require("../models/question")
const Player = require("../models/players")

function getSingleTriviaQuestions(){
    const triviaQuestion = {
        question:"¿cuantos años tienes?",
        answers:[
            "20",
            "30",
            "40",
            "35"
        ],
        correctAnswer: "30"
    }
    
    insertQuestionIntoDataBase(triviaQuestion)

    return triviaQuestion
}

function insertQuestionIntoDataBase(question){
    Question.create({
        question: question.question,
        answer: question.correctAnswer
    }).catch((error)=>{
        console.log(error)
    })
}

async function verifyAnswer(question,answer){
    const trivia = await Question.findOne({question})
    if(trivia != null && trivia.answer == answer){
        return true
    }
    return false
}

async function updatePlayerScore(userName,winner){
    const player = await Player.findOne({name:userName})
    if(player == null){
        throw new Error("El jugador no existe")
    }
    if(winner == true){
        player.score ++
        player.save()
    }
    return player.score
}

module.exports = {getSingleTriviaQuestions, verifyAnswer, updatePlayerScore}
