var map = require('ramda').map
var match = require('ramda').match
var nth = require('ramda').nth
var reverse = require('ramda').reverse

var matchLineWithMarker = match(/^\s+\[.+$/gm)
var matchMarker = match(/\[(.*)\]/)
var matchMessage = match(/^\s*\[.*\]\s*(.*)$/)
var getMatch = nth(1)

function parseLine (line) {
  return {
    marker: getMatch(matchMarker(line)),
    message: getMatch(matchMessage(line))
  }
}

module.exports = function (logString) {
  var validLines = reverse(matchLineWithMarker(logString))
  return map(parseLine, validLines)
}
