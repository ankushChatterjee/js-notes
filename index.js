const cons = require('consolidate');
const fs = require('fs');
const commander = require('commander');
const resolveTo = require('./resolveTo.json');
const pth = require('path');
// const format = 'js';

// const syntaxInfo = require('./resolvers/' + format + '/syntaxinfo.js')(['exp.js', 'testindex.js']);


commander
  .arguments('<dir>')
  .option('-a, --author <author>', 'Author of the project')
  .option('-p, --project <project>', 'Project Name')
  .action(function (dir) {
    let fullSyntaxInfo = [], currDirInfo;
    let path, fileExtension, format, items;
    let dirStack = [];
    let fileList = [];
    dirStack.push(dir);
     console.log(dirStack.length);

    if(typeof commander.author === 'undefined')
      commander.author = "";
    if(typeof commander.project === 'undefined')
      commander.project = "";


    do {
      fileList = [];
      path = dirStack.pop();
      let absPath = pth.resolve(path);
      items = fs.readdirSync(path);
      console.log(path);
      currDirInfo = {
        folderName:absPath,
        filesMarkup:[]
      }
      for (let item of items) {
        item = absPath + "/" + item;

        if (fs.lstatSync(item).isDirectory()) {
          //console.log("dir", item);
          dirStack.push(item);
          //console.log(dirStack);
        } else {
          //console.log(item);
          fileExtension = item.replace(/^.*\./, '');
          if (typeof resolveTo[fileExtension] !== 'undefined') {

            format = resolveTo[fileExtension];
            fileList.push({
              format: format,
              path: item
            });

          }
          else {
            console.log("Skipping " + item + "[Not Supported]");
          }
        }

      }
      for (let file of fileList) {
        console.log(file.path);
        const syntaxInfo = require('./resolvers/' + file.format + '/syntaxinfo.js')([file.path]);
        currDirInfo.filesMarkup.push(syntaxInfo);
      }
      fullSyntaxInfo.push(currDirInfo);
      //console.log(dirStack.length);
    } while (dirStack.length != 0);

    cons.ejs('templates/default.ejs',{
      author:commander.author,
      project:commander.project,
      shinfo:fullSyntaxInfo
  }, function(err, html){
      if (err) throw err;
      fs.writeFile("result.html", html, function(error) {
          if (error) {
            console.error("write error:  " + error.message);
          } else {
            console.log("Successful Write");
          }
      });
  });

  })
  .parse(process.argv);




//const renderedData = ejs.renderFile("./templates/default.ejs",);

//console.log(renderedData);