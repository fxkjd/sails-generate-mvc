describe('<%=namePluralC%>', function() {

  it ('should not be empty', function(done) {
    <%=nameC%>.find().exec(function(err, <%=namePlural%>) {
      <%=namePlural%>.length.should.be.above(0);
      done();
    });
  });

  it ('should create one <%=name%>', function(done) {
    var paramObj = {

    <% for(var i in attributes) { %>"<%=attributes[i].name%>" : <%if(attributes[i].type == 'integer'){%>1<%}else{%>"<%=attributes[i].name%>"<%}%><%if(i < attributes.length - 1 ){%>,<%}%>
    <% } %>
    }
    <%=nameC%>.count({}, function (err, num) {
      <%=nameC%>.create(paramObj, function (err, <%=name%>) {
        <%=nameC%>.find().exec(function(err, <%=namePlural%>) {
          <%=namePlural%>.length.should.be.eql(num+1);

          done();
        });
      });
    });
  });

  it ('should destroy one <%=name%>', function(done) {
    <%=nameC%>.count({}, function (err, num) {
      <%=nameC%>.find({ where: {}, limit: 1, sort: 'createdAt DESC' }).exec(function(err, <%=namePlural%>) {
        <%=nameC%>.destroy(<%=namePlural%>[0].id, function (err) {
          <%=nameC%>.find().exec(function(err, <%=namePlural%>) {
            <%=namePlural%>.length.should.be.eql(num-1);

            done();
          });
        });
      });
    });
  });

});
