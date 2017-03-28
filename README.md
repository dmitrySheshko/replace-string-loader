# Webpack loader for replacing a text and other data in a file
## Instalation:
```
npm install --save-dev replace-string-loader
```
## Options:
```
options: {
    search: "string or /regExp/",
    replace: "string or function",
    flags: "string",
    file: bool
}
search: a string or a regular expression that will be found and replaced in the file.  
replace: a string or a function for replacing. 
    If an options.replace is a function: this function recieves next arguments:
        match – a found match,
        p1, p2, ..., pn – string content (if exist),
        offset – position where the match was found,
        s – a basic string.
    The function must return a string!!!
flags: regExp flags (g, i, m). Used if options.search is a string and ignored if options.search is a regular expression.
file: if true - a found result will save to the file.
```
## Usage:
Searching and replacing '105px' to '200px' in scss files: 
Result will be saved to a json file.
```
module: {
        rules: [{
            test: /\.scss$/,
            use[{
                    loader: 'replace-string-loader',
                    options: {
                        search: '105px',
                        replace: '200px',
                        flags: 'g',
                        file: true
                    }
                }]
        }]
    }
```
An output json file:
```
{
    "file": "[last-file-folder][file-name].[ext]",
    "fullFilePath": "full-path-to-file/[file-name].[ext]",
    "matches": [
        {
            "matchLine": 12,
            "matchContent": "min-height: 105px;",
            "replaceTo": "min-height: 200px;"
        },
        {
            "matchLine": 22,
            "matchContent": "min-height: 105px;",
            "replaceTo": "min-height: 200px;"
        }
    ]
}
```
or, without saving into the file
```
module: {
        rules: [{
            test: /\.scss$/,
            use[{
                    loader: 'replace-string-loader',
                    options: {
                        search: /105px/g,
                        replace: '200px',
                        file: false
                    }
                }]
        }]
    }
```
Searching and replacing 'exampleVarA' to 'exampleVarB' in js files:
```
module: {
        rules: [{
            test: /\.js$/,
            use[{
                    loader: 'replace-string-loader',
                    options: {
                        search: /exampleVarA/g,
                        replace: 'exampleVarB'
                    }
                }]
        }]
    }
```
Searching and replacing '105px' to '1050px' in css files:
```
module: {
        rules: [{
            test: /\.css$/,
            use[{
                    loader: 'replace-string-loader',
                    options: {
                        search: '105px',
                        replace: function(match){ return `${parseInt(match) * 10}px`;}
                    }
                }]
        }]
    }
```