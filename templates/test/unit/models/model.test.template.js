describe('<%=namePluralC%>', function() {
  it ('should not be empty', function(done) {
    <%=nameC%>.find().exec(function(err, <%=namePlural%>) {
      <%=namePlural%>.length.should.be.eql(fixtures['<%=namePlural%>'].length);

      done();
    });
  });
  it ('should create a <%=name%>', function(done) {
    var paramObj = {

    <% for(var i in attributes) { %><%=attributes[i].name%> : "<%=attributes[i].name%>"<%if(i < attributes.length - 1 ){%>,<%}%>
    <% } %>
    }
    <%=nameC%>.create(paramObj, function (err, <%=name%>) {
      <%=nameC%>.find().exec(function(err, <%=namePlural%>) {
        <%=namePlural%>.length.should.be.eql(fixtures['<%=namePlural%>'].length+1);

        done();
      });
    });
  });
});
