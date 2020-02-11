const respondJSON = (request, response, status, object, type) => {
    response.writeHead(status, {
        'Content-Type': type,
        dorkus: 'true',
    });
    response.write(object);
    response.end();
};

// success
const success = (request, response, params, acceptedTypes) => {
    const responseJSON = {
        message: 'This is a successful response',
    };

    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} </response>`;

        return respondJSON(request, response, 200, responseXML, 'text/xml');
    }

    const successString = JSON.stringify(responseJSON);

    return respondJSON(request, response, 200, successString, 'application/json');
};

// badRequest
const badRequest = (request, response, params, acceptedTypes) => {
    const responseJSON = {
        message: 'This request has the required parameters',
    };

    if (!params.valid || params.valid !== 'true') {
        responseJSON.message = 'Missing valid query parameter set to true';
        responseJSON.id = 'badRequest';

        if (acceptedTypes[0] === 'text/xml') {
            let responseXML = '<response>';
            responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
            responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
            responseXML = `${responseXML} </response>`;

            return respondJSON(request, response, 400, responseXML, 'text/xml');
        }
    }

    const badString = JSON.stringify(responseJSON);

    return respondJSON(request, response, 400, badString, 'application/json');
};

// unauthorized
const unauthorized = (request, response, params, acceptedTypes) => {
    const responseJSON = {
        message: 'You have successfully viewed the content',
    };

    if (!params.loggedIn || params.loggedIn !== 'yes') {
        responseJSON.message = 'Missing loggedIn query parameter set to yes';
        responseJSON.id = 'unauthorized';

        if (acceptedTypes[0] === 'text/xml') {
            let responseXML = '<response>';
            responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
            responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
            responseXML = `${responseXML} </response>`;

            return respondJSON(request, response, 401, responseXML, 'text/xml');
        }
    }

    const unString = JSON.stringify(responseJSON);

    return respondJSON(request, response, 401, unString, 'application/json');
};

// forbidden
const forbidden = (request, response, params, acceptedTypes) => {
    const responseJSON = {
        message: 'You do not have access to this content.',
        id: 'forbidden',
    };

    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;

        return respondJSON(request, response, 403, responseXML, 'text/xml');
    }

    const forString = JSON.stringify(responseJSON);

    return respondJSON(request, response, 403, forString, 'application/json');
};

// internal
const internal = (request, response, params, acceptedTypes) => {
    const responseJSON = {
        message: 'Internal Server Error. Somethign went wrong.',
        id: 'internal',
    };

    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;

        return respondJSON(request, response, 500, responseXML, 'text/xml');
    }

    const inString = JSON.stringify(responseJSON);

    return respondJSON(request, response, 500, inString, 'application/json');
};

// notImplemented
const notImplemented = (request, response, params, acceptedTypes) => {
    const responseJSON = {
        message: 'A get request for this page has not been implemented yet. Check again later for updated content',
        id: 'notImplemented',
    };

    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;

        return respondJSON(request, response, 501, responseXML, 'text/xml');
    }

    const noString = JSON.stringify(responseJSON);

    return respondJSON(request, response, 501, noString, 'application/json');
};

// anythingElse
const anythingElse = (request, response, params, acceptedTypes) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };

    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;

        return respondJSON(request, response, 404, responseXML, 'text/xml');
    }

    const anyString = JSON.stringify(responseJSON);

    return respondJSON(request, response, 404, anyString, 'application/json');
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
