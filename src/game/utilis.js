const Question = require("../models/question")
const Player = require("../models/players")
const axios = require("axios")

async function getSingleTriviaQuestions(){
    const triviaQuestion = await getTriviaQuestionApi()
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

async function getTriviaQuestionApi() {
    const data = await axios.get("https://opentdb.com/api.php?amount=1")
    console.log(data.data.results)
    const respuestas = ["", "", "", ""]
    let j = 0;
    const position = Math.floor(Math.random() * 3);
    respuestas[position] = data.data.results[0].correct_answer
    for (let i = 0; i < 4; i++) {
        if (respuestas[i] == "") {
            respuestas[i] = data.data.results[0].incorrect_answers[j]
            j++
        }
    }
    const triviaQuestion = {
        question: data.data.results[0].question,
        answers: respuestas,
        correctAnswer: data.data.results[0].correct_answer
    }
    return triviaQuestion
}

module.exports = {getSingleTriviaQuestions, verifyAnswer, updatePlayerScore}
