'use strict';
let BuildWaterLine = require('../hack/BuildWaterLine');
let ExtendModelDao = require('../hack/ExtendModelDao');
let _ = require('underscore');
let start_time = Date.now()
before(function (done) {
  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(10000);

  // Initialize Waterline
  BuildWaterLine.buildORM('testMongodb', {migrate: 'drop'}, function (err, models) {
    if (err) throw err;
    ExtendModelDao.doExtend('/api/services/dao', 'dao', models);
    console.log('buildORM models', Object.keys(models));
    console.log('waterline init time %s s', (Date.now() - start_time) / 1000);
    done();
  })
});

after(function (done) {
  done();
  // here you can clear fixtures, etc.
});
