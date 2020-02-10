const respond = (request, response, status, object) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    dorkus: 'true',
  });
  response.write(JSON.stringify(object));
  response.end();
};

// success
const success = (request, response) => {
  const reply = {
    message: 'This is a successful response',
  };

  respond(request, response, 200, reply);
};

// badRequest
const badRequest = (request, response, params) => {
  const reply = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    reply.message = 'Missing valid query parameter set to true';
    reply.id = 'badRequest';
    return respond(request, response, 400, reply);
  }

  return respond(request, response, 200, reply);
};

// unauthorized
const unauthorized = (request, response, params) => {
  const reply = {
    message: 'You have successfully viewed the content',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    reply.message = 'Missing loggedIn query parameter set to yes';
    reply.id = 'unauthorized';
    return respond(request, response, 401, reply);
  }

  return respond(request, response, 200, reply);
};

// forbidden
const forbidden = (request, response) => {
  const reply = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  respond(request, response, 403, reply);
};

// internal
const internal = (request, response) => {
  const reply = {
    message: 'Internal Server Error. Somethign went wrong.',
    id: 'internal',
  };

  respond(request, response, 500, reply);
};

// notImplemented
const notImplemented = (request, response) => {
  const reply = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };

  respond(request, response, 501, reply);
};

// anythingElse
const anythingElse = (request, response) => {
  const reply = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respond(request, response, 404, reply);
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
