//Basic Card as a scope safe constructor
function BasicCard(frontSide , backSide){
    if(this instanceof BasicCard){
        this.frontSide = frontSide;
        this.backSide = backSide;
    }else{
        return new BasicCard(frontSide, backSide);
    }
}

module.exports = BasicCard;