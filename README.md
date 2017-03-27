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
