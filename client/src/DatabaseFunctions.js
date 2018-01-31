const request = require('request');

const apiKey = '5a5b8bd87d7ef24c5cf08c84';
const url = `${window.location}`.includes('localhost')
  ? 'http://localhost:3001'
  : 'https://www.georgegillams.co.uk';

class DatabaseFunctions {
  static getComments(pageId, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/comments`,
      headers: { page_id: pageId },
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      cb(JSON.parse(body));
    });
  }

  static getPageIds(cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/comments/page_ids`,
      headers: {},
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      cb(JSON.parse(body));
    });
  }

  static postNewComment(pageId, commenterName, comment, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/comments`,
      headers: {
        'Api-Key': apiKey,
      },
      body: {
        page_id: pageId,
        commenter_name: commenterName,
        comment,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      console.log(body);
      cb(body);
    });
  }

  static deleteComment(privateApiKey, pageId, pattern, cb) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/comments`,
      headers: {
        'Api-Key': privateApiKey,
      },
      body: {
        page_id: pageId,
        pattern,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      }
      console.log(body);
      cb(body);
    });
  }
}

module.exports = DatabaseFunctions;
