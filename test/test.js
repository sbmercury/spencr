var request = require('supertest');
 
var app = require('../app.js');
 
 
 
describe('GET /', function() {
 
  it('check for 200 reponse code', function(done) {
 
    request(app)
		.get('/')
		.expect(200, done);
 
  });
 
});