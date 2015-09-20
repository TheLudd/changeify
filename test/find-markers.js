var findMarkers = require('../lib/find-markers.js')
var chai = require('chai')
chai.should()

describe('findMarkers', function () {

  it('returns a list with an entry for each line with a marker', function () {
    var input = [
      'Some title',
      '',
      '  [foo] c1',
      '    [bar] c2',
      '    [foo] c3',
      '  Some message row'
    ].join('\n')
    var result = findMarkers(input)
    result.should.have.length(3)
    result.should.deep.equal([{
      marker: 'foo',
      message: 'c3'
    }, {
      marker: 'bar',
      message: 'c2'
    }, {
      marker: 'foo',
      message: 'c1'
    }])
  })

})
