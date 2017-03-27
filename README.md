# Loader for replace a string
# replace-string-loader
## Instalation:
```
npm install --save-dev
```
## Options:
```
search - string/RegExp
replace - string
flags - string gim
file: true/false
```

## Usage:
Search and replace all search (105px) in scss files and replace it to 200px. Result will save to a json file.

```
module: {
        rules: [{
            test: /\.scss$/,
            use[{
                    loader: 'test-loader',
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
    "file": "[last-file-folder][file-name][ext]",
    "fullFilePath": "full-path-to-file/main.scss",
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

```
module: {
        rules: [{
            test: /\.scss$/,
            use[{
                    loader: 'test-loader',
                    options: {
                        search: /105px/g,
                        replace: '200px',
                        file: false
                    }
                }]
        }]
    }
```
