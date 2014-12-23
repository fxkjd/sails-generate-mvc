var request = require('supertest');

describe('<%=nameC%>Controller', function() {
  describe('index', function() {
    it('should return success', function (done) {
      request(sails.hooks.http.app)
        .get('/<%=name%>')
        .expect(200, done);
    });
  });

  describe('add', function() {
    it('should return success', function (done) {
      request(sails.hooks.http.app)
        .get('/<%=name%>/add')
        .expect(200, done);
    });
  });

  describe('create', function() {
    it('should create one <%=name%>', function (done) {
      <%=nameC%>.count({}, function (err, num) {
        request(sails.hooks.http.app)
          .get('/<%=name%>/create')
          .expect(200, function (err) {
            <%=nameC%>.find().exec(function(err, <%=namePlural%>) {             
              <%=namePlural%>.length.should.be.eql(num+1);  
              done();                         
            });
          });
      });
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

  describe('update', function() {
    it('should update one <%=name%>', function (done) {
      <%=nameC%>.find({ where: {}, limit: 1, sort: 'createdAt DESC' }).exec(function(err, <%=namePlural%>) {
      var date = <%=namePlural%>[0].updatedAt;
        request(sails.hooks.http.app)
          .get('/<%=name%>/update/'+<%=namePlural%>[0].id)
          .expect(200, function(err){
            <%=nameC%>.find({id:<%=namePlural%>[0].id}).exec(function(err, <%=namePlural%>) {
              <%=namePlural%>[0].updatedAt.should.be.above(date);

              done();
            });                       
          });
      });
    });
  });

  describe('destroy', function() {
    it('should return not found', function (done) {   
      request(sails.hooks.http.app)
        .get('/<%=name%>/destroy/9999')
        .expect(404, done);         
    });

    it('should delete one <%=name%>', function (done) {            
      <%=nameC%>.count({}, function (err, num) {
        <%=nameC%>.find({ where: {}, limit: 1, sort: 'createdAt DESC' }).exec(function(err, <%=namePlural%>) {             
          request(sails.hooks.http.app)
            .get('/<%=name%>/destroy/'+<%=namePlural%>[0].id)
            .expect(200, function(err){
              <%=nameC%>.find().exec(function(err, <%=namePlural%>) {             
                <%=namePlural%>.length.should.be.eql(num-1);  
                done();                         
              });            
            });
        });
      });
    });
  });
});
