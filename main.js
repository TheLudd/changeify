var createMessage = require('./lib/crate-message')
var determineNext = require('./lib/determine-next')
var execSync = require('child_process').execSync
var findMarkers = require('./lib/find-markers')
var getLog = require('./lib/get-log')
var fs = require('fs')
var path = require('path')
var pluck = require('ramda').pluck
var program = require('commander')
var semver = require('semver')

module.exports = function (baseDir) {
  function getPath (p) {
    return path.join(baseDir, p)
  }
  function getChangeLog () {
    try {
      return fs.readFileSync(changeLogPath, 'utf-8')
    } catch (e) {
      return ''
    }
  }

  program
    .version(require('./package').version)
    .option('-p, --publish', 'Bump, tag, publish and push new version')
    .option('-n, --dry-run', 'Only print changelog and new version')
    .parse(process.argv)

  var changeLogPath = getPath('./CHANGELOG.md')
  var version = require(getPath('./package')).version
  var tag = 'v' + version
  getLog(tag, function (e, log) {
    if (e) {
      console.error(e.message)
      console.error(e.stack)
      process.exit(1)
    }

    var markers = findMarkers(log)
    var nextVersionType = determineNext(version, pluck('marker', markers))
    var nextVersion = semver.inc(version, nextVersionType)
    var nextTag = 'v' + nextVersion
    var message = createMessage(nextVersion, markers)

    if (program.dryRun) {
      console.log('New version:', nextVersion)
      console.log('Tag:', nextTag)
      console.log('Prepend to change log:')
      console.log(message)
    } else {
      var changelog = getChangeLog()
      fs.writeFileSync(changeLogPath, message + changelog)
      execSync('git add CHANGELOG.md')
      execSync('git commit -m "Update changelog for ' + nextTag + '"')

      if (program.publish) {
        execSync('npm version ' + nextVersionType)
        execSync('npm publish')
        execSync('git push --follow-tags')
      }
    }

  })
}
