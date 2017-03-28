# Webpack loader for replacing a text and other data in a file
# replace-string-loader
## Instalation:
```
npm install --save-dev replace-string-loader
```
## Options:
```
options: {
    search: "string or /regExp/",
    replace: "string",
    flags: "string",
    file: bool
}
search - a string or a regular expresion what will find in replace in a file. 
replace - string to replace a match string.
flags - regExp flags (g, i, m) Use if search is string and ignore if search is regExp.
file: if true - a match result will save to a file.
```
## Usage:
Search and replace all (flags: 'g' - global search) search text ('105px') in scss files and replace matches to a replace text ('200px'). Result will save to a json file.
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
Json file:
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
or, without saving to a file
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
