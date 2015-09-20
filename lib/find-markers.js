var compose = require('ramda').compose
var filter = require('ramda').filter
var map = require('ramda').map
var match = require('ramda').match
var nth = require('ramda').nth
var prop = require('ramda').prop
var reverse = require('ramda').reverse
var test = require('ramda').test

var matchMarker = match(/\[(.*)\]/)
var getMatch = nth(1)
var markerRegex = /\[(.*)\]/

function parseLine (commit) {
  return {
    marker: getMatch(matchMarker(commit.body)),
    message: commit.subject
  }
}

module.exports = function (commits) {
  var validCommits = reverse(filter(compose(test(markerRegex), prop('body')), commits))
  return map(parseLine, validCommits)
}
