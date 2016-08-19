/*
 * function start() {
  console.log("Request handler 'start' was called.");
  function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }

  sleep(10000);
  return "Hello Start";
}
*/
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");
var React = require('react');
var ReactDOMServer = require('react-dom/server');
//var steepless = require('./steepless');

var exec = require("child_proces").exec;
//function start(response, postdata) {
function start(response, request) {
  console.log("Request handler 'start' was called.");
/*    
  exec("find /",
          { timeout: 10000, maxBuffer: 20000*1024 },
  //exec("ls -lah", 
    function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();    
  });
*/
/*
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="get">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
*/
/*
 * var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>'; 
*/
    //var element = React.createElement('div', null, 'Hello World!');
    //var body = ReactDOMServer.renderToString(element);

    var body = 
        '<meta charset="utf-8">' +
        '<title>Steepless</title>'+
        '<link rel="icon" type="image/png" href="./assets/favicon.png">' +
        '<link rel="stylesheet" href="//fonts.googleapis.com/css?family=RobotoDraft:400,500">' +
        '<link rel="stylesheet" href="./assets/steepless.css">' + 
        '<link rel="stylesheet" href="//code.ionicframework.com/ionicons/2.0.0/css/ionicons.min.css">' +
        '<div id="app"></div>' + 
        '<script src="//maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDEui5GK-jEzNimVqR-hEFeg-YMJ1TcLtM"></script>' + 
        '<script src="//cdnjs.cloudflare.com/ajax/libs/queue-async/1.0.7/queue.min.js"></script>' +
        '<script src="//cdnjs.cloudflare.com/ajax/libs/react/0.12.1/react.min.js"></script>' +
        '<script src="./assets/steepless.js"></script>'; 
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

//function upload(response, postdata) {
function upload(response, request) {
  console.log("Request handler 'upload' was called.");
  /*
    response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
    //response.writeHead(200, {"Content-Type": "text/plain"});
    //response.write("Hello Upload");
    //response.write("You've sent: " + urlencode(postdata, 'utf8'));
    response.write("You've sent: " + querystring.parse(postdata).text);
    response.end();
    */
  
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "/tmp/test.png");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;

