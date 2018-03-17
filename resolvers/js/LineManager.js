const fs = require('fs');
exports.LineManager = class LineManager{
    constructor(fileName){
        this.fileName = fileName;
        this.lines = fs.readFileSync(fileName, 'utf-8');   
    }
    getLines(){
        return this.lines;
    }
}