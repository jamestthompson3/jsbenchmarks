const Benchmark = require('benchmark')
const _ = require('lodash')
const d3 = require('d3-array')
const devData = require('./stats.json')
const u = require('underscore')
const testArray = devData.data
const testObjArray = devData.objArr
const suite = new Benchmark.Suite;
const bisectDate = d3.bisector((d) => d.time).right;
const testDate = "2018-01-17T04:00:00.000+02"

// add tests for arrays

suite.add('lodash#sortedIndex\n', function () {
    _.sortedIndex(testArray, testDate)
  })
    .add('d3#bisect\n', function () {
      d3.bisect(testArray, testDate)
    })
    .add('underscore#sortedIndex\n', function () {
      u.sortedIndex(testArray, testDate)
    })
    // add listeners
    .on('cycle', function (event) {
      console.log(String(event.target));
    })
    .on('complete', function () {
      console.log('\n********\nFastest for arrays is: \n' + this.filter('fastest').map('name') + '********');
    })
    // run async
    .run({ async: 'true', initCount: 200, minSamples: 100000 });

  // add tests for array of objects
  suite.add('lodash#sortedIndexBy\n', function () {
    _.sortedIndexBy(testObjArray, testDate, 'time')
  })
    .add('d3#bisectDate\n', function () {
      bisectDate(testObjArray, testDate)
    })
    .add('underscore#sortedIndex\n', function () {
      u.sortedIndex(testObjArray, testDate, 'time')
    })
    // add listeners
    .on('cycle', function (event) {
      console.log(String(event.target));
    })
    .on('complete', function () {
      console.log('\n********\nFastest for array of objects is: \n' + this.filter('fastest').map('name') + '********');
    })
    // run async
    .run({ async: 'true', initCount: 200, minSamples: 100000 });
