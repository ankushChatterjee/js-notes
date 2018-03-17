const colors = require('./colors.json');
const links = require('./links.json')
exports.FileMarkupGenerator = class FileMarkupGenerator{
    constructor(orgstr,tokens,fileName){
        this.orgstr = orgstr;
        this.tokens = tokens;
        this.markupHead = `<pre>
        <h4>File : ${fileName}</h4>
        <code><br>`;
        this.markupFoot = `<br></code></pre><body></html>`;
    }
    safe_tags(str) {
        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
    }
    insertBrAndSpace(str){
        let brStr="";
        for(let s of str){
            if(s == '\r'){
                brStr+='<br>';
            }
            else if(s == ' ')
                brStr+='&nbsp;';
            else
                brStr+=s;
        }
        return brStr;
    }
    getLink(token,content){
        let link = "";
        if(token.type === 'Keyword'){
            link = links.keywords[token.value];
        }else{
            link = links.others[token.type];
        }
        return `<a href=${link}>${content}</a>`
    }
    getSpan(type,content,color){
        return `<span style="color:${color}"><span class="tooltip">${type}</span>${this.safe_tags(content)}</span>`;
    }
    generateMarkup(){
        let markup = "";
        markup+=this.markupHead;
        let span;
        let prevToken = null;
        for(let token of this.tokens){
            
            if(token.type === 'LineComment'){
                token.value = '//' + token.value;
            }else if(token.type == 'BlockComment'){
                token.value = '/*' + token.value + '*/';
            }
            if(token.type === 'Identifier' && token.value === 'undefined'){
                token.type = 'undefined';
            }
            if(token.type === 'Punctuator' && token.value === '=>'){
                token.type = 'arrow';
            }
            let aText = "";
            
            span = this.getSpan(token.type,token.value,colors[token.type]);
            
            if(token.type == "Identifier"){
                aText = span;
            }
            else{
                aText = this.getLink(token,span);
            }
            
            if(prevToken != null){
                let midStr = this.orgstr.substring(prevToken.range[1],token.range[0]);
                markup += midStr;
            }
            markup += aText;
            prevToken = token;
        }
        markup+=this.markupFoot;
        return markup;
    }

}