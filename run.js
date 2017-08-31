var inquirer = require('inquirer');
var questions = require('./questions.json');
var questions2 = require("./questions2.json");
var exportBasicCard = require("./BasicCard");
var exportClozeCard = require("./ClozeCard");



function checkCard(question, cloze){
    var regex = '\\b';
    regex += cloze.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    regex += '\\b';
    if(new RegExp(regex, "i").test(question)){
        console.log( "Your question was accepted. Card is now being created.");
        return true;
    }else{
        console.log("The answer is not in the sentence you provided. Please try again.");
        return false;
    }
}

function BasicCardQuiz(i){
    if(i < questions.length){
        var card = exportBasicCard(questions[i].frontSide , questions[i].backSide);
        inquirer.prompt([
            {
                type: "input",
                message: card.frontSide,
                name: "quizAnswer"
            }
            ]).then(function (response){
                if(response.quizAnswer === card.backSide){
                    console.log("CORRECT");
                }else{
                    console.log("YOU FOOL! THIS WAS THE ANSWER:" + card.backSide);
                }
                i++;
                BasicCardQuiz(i);
        });
    }
}

function ClozeCardQuiz(i){
    if(i < questions2.length){
        var card = exportClozeCard(questions2[i].fullText , questions2[i].cloze);
        inquirer.prompt([
            {
                type: "input",
                message: card.partialText,
                name: "quizAnswer"
            }
            ]).then(function (response){
                if(response.quizAnswer === card.cloze){
                    console.log("CORRECT");
                }else{
                    console.log("YOU FOOL! THIS WAS THE ANSWER:" + card.fullText);
                }
                i++;
                ClozeCardQuiz(i);
        });
    }
}


function getInformation(type, question, answer){
    inquirer.prompt([
        {
            type: "input",
            message: question,
            name: "question"
        },
        {
            type: "input",
            message: answer,
            name: "answer"
        }
        ]).then(function (response){
            if(type == "Cloze"){
                var goodCloze = checkCard(response.question , response.answer);
                if(goodCloze){
                    var card = exportClozeCard(response.question , response.answer);
                    console.log("New card created");
                    console.log("Partial Text: " + card.partialText);
                    console.log("Cloze: " + card.cloze);
                    console.log("Full Text: " + card.fullText)
                }
            }
            if(type == "Basic"){
                var card = exportBasicCard(response.question , response.answer);
                console.log("New card created");
                console.log("Front: " + card.frontSide);
                console.log("Back: " + card.backSide);
            }

    });
}

inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    choices: ["Take Quiz" , "Create Question"],
    name: "action"
},
{
    type: "list",
    message: "What type of flashcard would you like to use?",
    choices: ["Basic" , "Cloze"],
    name: "cardType"
}
]).then(function (answers) {
    if(answers.action === "Take Quiz"){
        if(answers.cardType === "Cloze"){
            ClozeCardQuiz(0);
        }
        if(answers.cardType === "Basic"){
            BasicCardQuiz(0);
        }
    }
    else{
        if(answers.cardType === "Cloze"){
            getInformation(answers.cardType ,"What is your question?" , "What is the word you want to remove?");            
        }
        if(answers.cardType === "Basic"){
            getInformation(answers.cardType ,"What is your question?" , "What is the answer?");
        }
    }

});