var findMarkers = require('../lib/find-markers.js')
var chai = require('chai')
chai.should()

describe('findMarkers', function () {

  it('returns a list with an entry for each line with a marker', function () {
    var input = [
      { body: 'Some text', subject: 'ignore' },
      { body: '', subject: 'ignore' },
      { body: '  [foo]', subject: 'c1' },
      { body: '    [bar]', subject: 'c2' },
      { body: '    [foo]', subject: 'c3' },
      { body: '  Some message row', subject: 'foo' }
    ]
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
