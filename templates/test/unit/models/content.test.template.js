describe('Contents', function() {

  it ('should not be empty', function(done) {
    Content.find().exec(function(err, contents) {
      contents.length.should.be.above(0);
      done();
    });
  });

  it ('should create one content', function(done) {
    var paramObj = {
      text : "test",

      lang : "EN",

      parent : "1"
    }

    Content.create(paramObj, function (err, content) {
      Content.find({id: content.id}).exec(function(err, contents) {
        contents.length.should.be.eql(1);
        done();
      });
    });
  });

  it ('should update one content', function(done) {
    Content.find({ where: {}, limit: 1, sort: 'createdAt DESC' }).exec(function(err, contents) {
      var date = contents[0].updatedAt;
      Content.update(contents[0].id, {}, function (err, content) {
        content[0].updatedAt.should.be.above(date);

        done();
      });
    });
  });

  it ('should destroy one content', function(done) {
    Content.find({ where: {}, limit: 1, sort: 'createdAt DESC' }).exec(function(err, contents) {
      Content.destroy(contents[0].id, function (err) {
        Content.find({id:contents[0].id}).exec(function(err, contents) {
          contents.length.should.be.eql(0);

          done();
        });
      });
    });
  });

});
