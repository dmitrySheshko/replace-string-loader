/**
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * Author Dmitry Sheshko
 * dm.sheshko@gmail.com
 */
const fs = require('fs');

module.exports = function(source, map) {
    let loader = this;

    if(loader.cacheable) loader.cacheable();

    let { flags, search, replace, file } = loader.query;

    if(!isUndefined(search) && !isUndefined(replace)){
        let fullFilePath = loader.resourcePath;

        let regExp = getRegExp(search, flags);
        let searchMap = {
            file: '',
            fullFilePath: '',
            matches: []
        };
        source = replaceString(source, regExp, replace, searchMap);
        if(file) {
            createMatchFile(fullFilePath, searchMap);
        }
    }
    this.callback(null, source, map);
};

function replaceString(source, regExp, replace, fileMap){
    let sourceByLines = source.split('\n');
    let replaceSource = [];
    let line;
    for(let i = 0; i < sourceByLines.length; i++){
        line = sourceByLines[i];
        if(regExp.test(line)){
            line = line.replace(regExp, replace);
            fileMap.matches.push(setMatch(i, sourceByLines[i], line));
            replaceSource.push(line);
            if(!regExp.global){
                replaceSource = replaceSource.concat(sourceByLines.slice(i));
                break;
            }
        }
        else {
            replaceSource.push(line);
        }
    }
    return replaceSource.join('\n');
}

function isUndefined(value) {
    return value === undefined;
}

function getRegExp(search, flags){
    if(typeof search !== 'object') {
        search = new RegExp(search, flags);
    }
    return search;
}

function basename(name) {
    if(name.indexOf("/") < 0) return name;

    let directories = name.split('/');
    let lastDirectory = directories[directories.length - 2];
    name = directories[directories.length - 1];
    return `${lastDirectory}-${name}`;
}

function setMatch(line, context, replace){
    return {
        matchLine: ++line,
        matchContent: context.trim(),
        replaceTo: replace.trim()
    }
}

function createMatchFile(fullFilePath, searchMap){
    let fileName = basename(fullFilePath);
    let path = './replace_text_loader/';

    searchMap.file = fileName;
    searchMap.fullFilePath = fullFilePath;

    checkFolder(path);

    searchMap.matches = searchMap.matches.concat(getFileMatches(path, fileName, fullFilePath));

    fs.writeFileSync(`${path + fileName}.json`, JSON.stringify(searchMap, null, 4), 'utf8');
}

function checkFolder(path){
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
}

function getFileMatches(path, fileName, fullFilePath){
    let filePath = `${path + fileName}.json`;
    let matches = [];
    if(fs.existsSync(filePath)){
        let data = {};
        try{
            data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
        catch(e){}

        if(data.fullFilePath == fullFilePath){
            matches = data.matches;
        }
    }
    return matches;
}