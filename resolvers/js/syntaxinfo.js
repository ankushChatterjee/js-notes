module.exports = function (fileList) {
    const { SHInfoGenerator } = require('./SHInfoGenerator');
    const ejs = require('ejs');
    const cons = require('consolidate');
    const fs = require('fs');

    shInfoGenerator = new SHInfoGenerator(fileList);

    return shInfoGenerator.getInfo();
}