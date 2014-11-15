var tape = require('tape')
var memdb = require('memdb')
var mutex = require('./')

tape('works', function(t) {
  var db = memdb()
  var mbatch = mutex(db)

  mbatch([{type:'put', value:'world', key:'hello'}], function() {
    db.get('hello', function(err, value) {
      t.same(value, 'world')
      t.end()
    })
  })
})

tape('batches', function(t) {
  t.plan(3)

  var db = memdb()
  var mbatch = mutex(db)

  var cb = function() {
    db.get('hello', function(err, value) {
      t.same(value, '4')
    })
  }

  mbatch([{type:'put', key:'hello', value:'1'}])
  mbatch([{type:'put', key:'hello', value:'2'}], cb)
  mbatch([{type:'put', key:'hello', value:'3'}], cb)
  mbatch([{type:'put', key:'hello', value:'4'}], cb)
})

tape('same ticks', function(t) {
  t.plan(3)

  var db = memdb()
  var mbatch = mutex(db)

  var cb = function() {
    db.get('hello', function(err, value) {
      t.same(value, '4')
    })
  }

  mbatch([{type:'put', key:'hello', value:'1'}])
  mbatch([{type:'put', key:'hello', value:'2'}], cb)
  mbatch([{type:'put', key:'hello', value:'3'}], cb)
  mbatch([{type:'put', key:'hello', value:'4'}], cb)
})