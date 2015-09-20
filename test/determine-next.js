var determineNext = require('../lib/determine-next')
var chai = require('chai')
chai.should()

describe('determineNext', function() {

  it('returns patch for doc and fix', function() {
    determineNext(null, [ 'doc' ]).should.equal('patch')
    determineNext(null, [ 'fix' ]).should.equal('patch')
    determineNext(null, [ 'doc', 'fix' ]).should.equal('patch')
  })

  it('returns patch for add and version < 1.0.0', function() {
    determineNext('0.1.0', [ 'add' ]).should.equal('patch')
    determineNext('0.1.0', [ 'add', 'doc' ]).should.equal('patch')
    determineNext('0.1.0', [ 'add', 'fix' ]).should.equal('patch')
    determineNext('0.1.0', [ 'add', 'doc', 'fix' ]).should.equal('patch')
  })

  it('returns minor for add and version >= 1.0.0', function() {
    determineNext('1.0.0', [ 'add' ]).should.equal('minor')
    determineNext('1.1.2', [ 'add', 'doc' ]).should.equal('minor')
    determineNext('1.1.1', [ 'add', 'fix' ]).should.equal('minor')
    determineNext('1.3.0', [ 'add', 'doc', 'fix' ]).should.equal('minor')
  })

  it('returns minor for breaking and version < 1.0.0', function() {
    determineNext('0.1.0', [ 'breaking' ]).should.equal('minor')
    determineNext('0.1.0', [ 'breaking', 'add' ]).should.equal('minor')
    determineNext('0.1.0', [ 'breaking', 'add', 'doc' ]).should.equal('minor')
    determineNext('0.1.0', [ 'breaking', 'add', 'fix' ]).should.equal('minor')
    determineNext('0.1.0', [ 'breaking', 'add', 'doc', 'fix' ]).should.equal('minor')
  })

  it('returns major for breaking and version < 1.0.0', function() {
    determineNext('1.0.0', [ 'breaking' ]).should.equal('major')
    determineNext('1.1.2', [ 'breaking', 'add' ]).should.equal('major')
    determineNext('1.1.1', [ 'breaking', 'add', 'doc' ]).should.equal('major')
    determineNext('1.3.0', [ 'breaking', 'add', 'fix' ]).should.equal('major')
    determineNext('2.1.1', [ 'breaking', 'add', 'doc', 'fix' ]).should.equal('major')
  })

  it('should be case insensitive', function() {
    determineNext('1.1.1', [ 'Breaking', 'add', 'doc' ]).should.equal('major')
    determineNext('0.1.0', [ 'Breaking', 'add', 'Fix' ]).should.equal('minor')
    determineNext('1.3.0', [ 'Add', 'dOc', 'Fix' ]).should.equal('minor')
    determineNext(null, [ 'Doc', 'Fix' ]).should.equal('patch')
    determineNext('0.1.0', [ 'Add' ]).should.equal('patch')
  })
})
