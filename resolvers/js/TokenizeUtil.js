const esprima = require('esprima');

exports.TokenizeUtil = class TokenizeUtil{
    constructor(lines){
        this.tokenList = [];
        this.lines = lines;
    }
    getTokenizedList(){
        this.tokenList = esprima.tokenize(this.lines,{comment:true,range:true});
        //console.log(this.tokenList);
        return this.tokenList;
    }
}