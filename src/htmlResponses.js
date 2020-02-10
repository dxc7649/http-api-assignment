const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getStatus = (request, response, acceptedTypes) => {
  const statusInfo = {
    status: 'mr.cat',
    response: 4,
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <status>${statusInfo.status}</status>`;
    responseXML = `${responseXML} <response>${statusInfo.response}</response>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml');
  }

  const statusString = JSON.stringify(stausInfo);
  return respond(request, response, statusString, 'application/json');
};

module.exports = {
  getIndex,
  getStatus,
};
