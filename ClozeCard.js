function ClozeCard(fullText, cloze){
    this.fullText = fullText;
    this.cloze = cloze;
    this.escapeRegExp = function(string){
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      }
    this.getPartialText = function(){
        var replacement = "";
        var regex = '\\b';
        regex += this.escapeRegExp(cloze);
        regex += '\\b';
        for(var i = 0; i < cloze.length; i++){
            replacement += "_";
        }
        if(new RegExp(regex, "i").test(fullText)){
            fullText = fullText.replace(new RegExp(regex, "i"), replacement);
            return fullText;
        }else{
            return "The answer is not in the sentence you provided. Please try again.";
        }
    }
    this.partialText = this.getPartialText();
}


var Card1 = new ClozeCard("Poland is a country." , "Poland");
console.log(Card1.fullText)
console.log(Card1.partialText);
console.log(Card1.cloze);

// var Card2 = new ClozeCard("The enemy is here." , "enemy");
// console.log(Card2.frontside());
// console.log(Card2.backside);

// var Card3 = new ClozeCard("Ae Be C", "Be");
// console.log(Card3.frontside());
// console.log(Card3.backside);