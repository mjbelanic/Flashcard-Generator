var exportBasicCard = require("./BasicCard");
var exportClozeCard = require("./ClozeCard");
var cardType = process.argv[2];
var question = "";
var answer = process.argv[process.argv.length-1];

for(i = 3; i < process.argv.length - 1; i++){
    question += process.argv[i] + " ";
}

if(cardType === "BasicCard"){
    var card = new exportBasicCard(question, answer);
    console.log(card.frontSide);
    console.log(card.backSide);
}

if(cardType === "ClozeCard"){
    var card = new exportClozeCard(question, answer);
    console.log(card.fullText);
    console.log(card.cloze);
    console.log(card.partialText)
}