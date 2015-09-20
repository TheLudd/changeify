var __ = require('ramda').__
var append = require('ramda').append
var compose = require('ramda').compose
var concat = require('ramda').concat
var groupBy = require('ramda').groupBy
var indexOf = require('ramda').indexOf
var joinLines = require('ramda').join('\n')
var joinParagraphs = require('ramda').join('\n\n')
var keys = require('ramda').keys
var map = require('ramda').map
var mapObj = require('ramda').mapObj
var mapObjIndexed = require('ramda').mapObjIndexed
var prop = require('ramda').prop
var reduce = require('ramda').reduce
var sortBy = require('ramda').sortBy
var toLower = require('ramda').toLower

module.exports = createMessage

var order = [ 'breaking', 'add', 'fix', 'doc' ]
var orderIndex = indexOf(__, order)

var dictionary = {
  add: 'Additions',
  breaking: 'Breaking changes',
  fix: 'Bug fixes / improvemens',
  doc: 'Documentation'
}

function createMessage (version, markers) {
  var groups = createMessageGroups(markers)
  var body = joinParagraphs(getSortedTexts(mapObjIndexed(createGroupText, groups)))
  return prependHeader(version, body)
}

function prependHeader (version, text) {
  return joinParagraphs([ '# ' + version, text ])
}

function createMessageGroups (markers) {
  var groups = groupBy(compose(toLower, prop('marker')), markers)
  return mapObj(map(prop('message')), groups)
}

function getSortedTexts (obj) {
  var sortedKeys = sortBy(orderIndex, keys(obj))
  return reduce(function (acc, item) {
    var val = obj[item]
    if (val) {
      return append(val, acc)
    } else {
      return acc
    }
  }, [], sortedKeys)
}

function createGroupText (list, key) {
  var header = '## ' + dictionary[toLower(key)]
  var body = joinLines(map(concat(' * '), list))
  return joinLines([ header, body ])
}
