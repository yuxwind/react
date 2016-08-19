//function route(pathname, handle, response, postdata) {
function route(pathname, handle, response, request) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        //handle[pathname](response, postdata);
        handle[pathname](response, request);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found"); 
    }
}

exports.route = route;
