# level-mutex-batch

Make sure only one leveldb batch is running at the time

```
npm install level-mutex-batch
```

[![build status](http://img.shields.io/travis/mafintosh/level-mutex-batch.svg?style=flat)](http://travis-ci.org/mafintosh/level-mutex-batch)

## Usage

``` js
var lmbatch = require('level-mutex-batch')
var batch = lmbatch(db) // db is a levelup

batch([{type:'put', key:'hello', value:'world-1'}], function() {
  ...
})

batch([{type:'put', key:'hello', value:'world-2'}], function() {
  ...
})

batch([{type:'put', key:'hello', value:'world-3'}], function() {
  ...
})
```

The above example is guaranteed to always produce `world-3` as the end result

## License

MIT
