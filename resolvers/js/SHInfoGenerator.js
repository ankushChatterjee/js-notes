const {FileMarkupGenerator} = require('./FileMarkupGenerator');
const {LineManager} = require('./LineManager');
const {TokenizeUtil} = require('./TokenizeUtil');

exports.SHInfoGenerator = class SHInfoGenerator{
    constructor(fileList){
        this.fileList = fileList;
        this.info = [];
    }
    getInfo(){
        let lines, tokens, markup;
        let fileMarkupGenerator,lineManager,tokenizeUtil;
        for(let file of this.fileList){
            lineManager = new LineManager(file);
            lines = lineManager.getLines();

            tokenizeUtil = new TokenizeUtil(lines);
            tokens = tokenizeUtil.getTokenizedList();

            fileMarkupGenerator = new FileMarkupGenerator(lines, tokens, file);
            markup = fileMarkupGenerator.generateMarkup();

            this.info.push({
                filename:file,
                markup:markup
            });
        }
        return this.info;
    }
}