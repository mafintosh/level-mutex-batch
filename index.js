var noop = function() {}

module.exports = function(db) {
  var pending = null
  var callbacks = null
  var running = false

  var join = function(list) {
    return function(err) {
      for (var i = 0; i < list.length; i++) list[i](err)
    }
  }

  var mbatch = function(batch, cb) {
    if (running) {
      if (!pending) {
        pending = []
        callbacks = []
      }
      pending.push.apply(pending, batch)
      if (cb) callbacks.push(cb)
      return
    }

    running = true
    db.batch(batch, function(err) {
      running = false

      var nextBatch = pending
      var nextCallback = callbacks && join(callbacks)

      pending = callbacks = null
      if (nextBatch) mbatch(nextBatch, nextCallback)

      if (cb) cb(err)
    })
  }

  return mbatch
}