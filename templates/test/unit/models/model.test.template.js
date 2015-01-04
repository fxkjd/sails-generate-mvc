describe('<%=namePluralC%>', function() {

  it ('should not be empty', function(done) {
    <%=nameC%>.find().exec(function(err, <%=namePlural%>) {
      <%=namePlural%>.length.should.be.above(0);
      done();
    });
  });

  it ('should create one <%=name%>', function(done) {
    var paramObj = {
      <% for(var i in attributes) { %>"<%=attributes[i].name%>" : <%if(attributes[i].type == 'integer'){%>1<%}else{%><%if(attributes[i].type == 'boolean'){%>true<%}else{%><%if(attributes[i].type == 'array'){%>[]<%}else{%><%if(attributes[i].type == 'json'){%>{}<%}else{%>"<%=attributes[i].name%>"<%}%><%}%><%}%><%}%><%if(i < attributes.length - 1 ){%>,<%}%><% } %>
    }

    <%=nameC%>.create(paramObj, function (err, <%=name%>) {
      <%=nameC%>.find({id: <%=name%>.id}).exec(function(err, <%=namePlural%>) {
        <%=namePlural%>.length.should.be.eql(1);
        done();
      });
    });
  });

  it ('should update one <%=name%>', function(done) {
    <%=nameC%>.find({ where: {}, limit: 1, sort: 'createdAt DESC' }).exec(function(err, <%=namePlural%>) {
      var date = <%=namePlural%>[0].updatedAt;
      <%=nameC%>.update(<%=namePlural%>[0].id, {}, function (err, <%=name%>) {
        <%=name%>[0].updatedAt.should.be.above(date);

        done();
      });
    });
  });

  it ('should destroy one <%=name%>', function(done) {
    <%=nameC%>.find({ where: {}, limit: 1, sort: 'createdAt DESC' }).exec(function(err, <%=namePlural%>) {
      <%=nameC%>.destroy(<%=namePlural%>[0].id, function (err) {
        <%=nameC%>.find({id:<%=namePlural%>[0].id}).exec(function(err, <%=namePlural%>) {
          <%=namePlural%>.length.should.be.eql(0);

          done();
        });
      });
    });
  });

});
