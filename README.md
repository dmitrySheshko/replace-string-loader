# Webpack loader for replacing a text and other data in a file
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
search: a string or a regular expresion that will be found and replaced in the file.
replace: a string for replacing.
flags: regExp flags (g, i, m). Used if options.search is a string and ignored if options.search is a regular expresion.
file: if true - a found result will save to the file.
```
## Usage:
Searching and replacing '105px' to '200px' in scss files in the example below. 
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
