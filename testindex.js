const fs = require('fs');

const { LineManager } = require('./LineManager');
const { TokenizeUtil } = require('./TokenizeUtil');
const { MarkupGenerator } = require('./MarkupGenerator');


const fileName = 'exp.js';
const lineManager = new LineManager(fileName);
const lines = lineManager.getLines();
//console.log(lines);

const tokenizeUtil = new TokenizeUtil(lines);
const tokens = tokenizeUtil.getTokenizedList();

const markupGenerator = new MarkupGenerator(lines, tokens, fileName);

let markup = markupGenerator.generateMarkup();

//console.log(markup);

fs.writeFile("result.html", markup, function (error) {
    if (error) {
        console.error("write error:  " + error.message);
    } else {
        console.log("Successful Write");
    }
});