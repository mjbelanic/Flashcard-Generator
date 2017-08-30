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

module.exports = ClozeCard;