var request = require('supertest');

describe('<%=nameC%>Controller', function() {
  describe('index', function() {
    it('should return success', function (done) {
      request(sails.hooks.http.app)
        .get('/<%=name%>')
        .expect(200, done);
    });
  });

  describe('show', function() {
    it('should return success', function (done) {
      request(sails.hooks.http.app)
        .get('/<%=name%>/1')
        .expect(200, done);
    });
    it('should return not found', function (done) {
      request(sails.hooks.http.app)
        .get('/<%=name%>/9999')
        .expect(404, done);
    });
  });

  describe('edit', function() {
    it('should return success', function (done) {
      request(sails.hooks.http.app)
        .get('/<%=name%>/edit/1')
        .expect(200, done);
    });
    it('should return not found', function (done) {
      request(sails.hooks.http.app)
        .get('/<%=name%>/edit/9999')
        .expect(404, done);
    });
  });
});
