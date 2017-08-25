var exportBasicCard = require("./BasicCard");
var exportClozeCard = require("./ClozeCard");
var cardType = process.argv[2];

if(cardType === "BasicCard"){
    var userCard = new BasicCard(process.argv[3], process.argv[4]);
    console.log(userCard.frontSide);
    console.log(userCard.backSide);
}