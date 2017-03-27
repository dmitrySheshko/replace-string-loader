/**
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * Author Dmitry Sheshko
 * dm.sheshko@gmail.com
 */
import fs from 'fs';

module.exports = function(source, map) {
    let loader = this;
    let { flags, search, replace, file } = loader.query;

    if(!isUndefined(search) && !isUndefined(replace)){
        let fullFilePath = loader.resourcePath;

        let regExp = getRegExp(search, flags);
        let searchMap = {
            file: '',
            fullFilePath: '',
            matches: []
        };
        source = replaceString(source, regExp, replace, searchMap, flags);
        if(file) {
            createMatchFile(fullFilePath, searchMap);
        }
    }
    this.callback(null, source, map);
};

function replaceString(source, regExp, replace, fileMap, flags){
    let sourceByLines = source.split('\n');
    let replaceSource = [];
    let line;
    for(let i = 0; i < sourceByLines.length; i++){
        line = sourceByLines[i];
        if(regExp.test(line)){
            line = line.replace(regExp, replace);
            fileMap.matches.push(setMatch(i, sourceByLines[i], line));
            replaceSource.push(line);
            if(!isGlobalReplace(flags)){
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

function isGlobalReplace(flags){
    return ~flags.indexOf('g');
}

function getRegExp(search, flags){
    if(typeof search !== 'object') {
        search = new RegExp(search, flags);
    }
    return search;
}

function basename(name) {
    if(name.indexOf("/") < 0) return name;
    return name.substr(name.lastIndexOf("/") + 1);
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

    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
    fs.writeFile(`${path + fileName}.json`, JSON.stringify(searchMap, null, 4));
}