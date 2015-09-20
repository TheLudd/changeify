var log = require('git-log-parser')

module.exports = getLog

function getLog (sinceTag, cb) {
  var out = []

  var s = log.parse({
    _: sinceTag + '..HEAD'
  })

  s.on('data', out.push.bind(out))
  s.on('error', cb)
  s.on('end', function () {
    cb(null, out)
  })

}
