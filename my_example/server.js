var http = require("http");
var url = require("url");

function start(route,handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    
    response.writeHead(200, {"Content-Type": "text/plain"});
    //route(pathname,handle, response);

    route(pathname, handle, response, request);
    /*
    request.setEncoding("utf8");

    var postData = "";
    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(pathname, handle, response, postData);
    });
    */

  }

  http.createServer(onRequest).listen(8887);
  console.log("Server has started.");
}

exports.start = start;
