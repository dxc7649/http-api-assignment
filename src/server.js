const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  anythingElse: jsonHandler.anythingElse,
};

const onRequest = (request, response) => {
  // parse the url using the url module
  // This will let us grab any section of the URL by name
  const parsedUrl = url.parse(request.url);

  // grab the query parameters (?key=value&key2=value2&etc=etc)
  // and parse them into a reusable object by field name
  // NOT USING yet - but we can test with ?name=Kirby
  const params = query.parse(parsedUrl.query);

  const acceptedTypes = request.headers.accept.split(',');

  console.log(parsedUrl.pathname);
  console.log(params);

  // check if the path name (the /name part of the url) matches
  // any in our url object. If so call that function. If not, default to index.
  if (urlStruct[parsedUrl.pathname]) {
    // urlStruct[parsedUrl.pathname](request, response, params);
    urlStruct[parsedUrl.pathname](request, response, params, acceptedTypes);
  } else {
    urlStruct.anythingElse(request, response, params, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
