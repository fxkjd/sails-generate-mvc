describe('Local Service', function() {

  it ('should create one content', function(done) {
    local.createLocal("test", "ES", "42", function(err, content){
      content.parent.should.be.eql("42");
      content.lang.should.be.eql("ES");
      content.text.should.be.eql("test");
      done();
    });
  });

  it ('should find one content', function(done) {
    local.findLocal("EN", "0", function(err, content){
      content.should.be.eql("test-content");
      done();
    });
  });

});
