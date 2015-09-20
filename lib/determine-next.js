module.exports = determineNext

var contains = require('ramda').contains
var toLower = require('ramda').toLower
var map = require('ramda').map
var semver = require('semver')

var hasAdd = contains('add')
var hasBreaking = contains('breaking')
var isAbove1 = function(version) {
  return semver.gte(version, '1.0.0')
}

function determineNext (current, changeTypes) {
  var changeTypesLc = map(toLower, changeTypes)
  if (hasBreaking(changeTypesLc)) {
    if (isAbove1(current)) {
      return 'major'
    } else {
      return 'minor'
    }
  } else if (hasAdd(changeTypesLc) && isAbove1(current)) {
    return 'minor'
  }
  return 'patch'
}
