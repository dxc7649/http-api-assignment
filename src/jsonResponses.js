const respondJSON = (request, response, status, object) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    dorkus: 'true',
  });
  response.write(JSON.stringify(object));
  response.end();
};

// success
const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};

// badRequest
const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

// unauthorized
const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'You have successfully viewed the content',
  };

  if (!params.valid || params.valid !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

// forbidden
const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  respondJSON(request, response, 403, responseJSON);
};

// internal
const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error. Somethign went wrong.',
    id: 'internal',
  };

  respondJSON(request, response, 500, responseJSON);
};

// notImplemented
const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };

  respondJSON(request, response, 501, responseJSON);
};

// anythingElse
const anythingElse = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return our json with a 404 not found error code
  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  anythingElse,
};
