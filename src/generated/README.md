## cherow
repo: https://github.com/cherow/cherow/
commit: #f78a65b4
command: 
`rollup /Users/user/projects/workspace/js_bot/node_modules/cherow/dist/es2015/cherow.js --file generated/cherow.iife.js --format iife --name Cherow --no-freeze --no-esModule --no-interop --no-strict --compact
`

# json-stringify-pretty-compact
"name": "json-stringify-pretty-compact",
"version": "2.0.0",

command: 
```
NODE_PATH=/Users/user/.config/yarn/global/node_modules babel --plugins transform-commonjs-es2015-modules ./node_modules/json-stringify-pretty-compact/index.js > json-stringify-pretty-compact.es6.js
```

```
rollup json-stringify-pretty-compact.es6.js --format iife --name JSON_PRETTY --compact > json-stringify-pretty-compact.life.js
```
