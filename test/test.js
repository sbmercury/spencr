const app = require("../app.js");
const request = require('supertest')(app);
 
describe('Homepage', function() {
  it('check for 200 response code', function(done) {
    request
		.get('/')
		.expect(200)
        .end(done);
  });
});