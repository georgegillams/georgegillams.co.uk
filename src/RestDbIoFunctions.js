const request = require('request');

const someFunction = () => {

};

const xApiKey = '5a5b8bd87d7ef24c5cf08c84';

class RestDbIoFunctions {
  static getComments(blogId, cb) {
    const url = `https://georegillamsdb-13ba.restdb.io/rest/blog-comments?q={"page_id": ${blogId}}`;

    const options = {
      method: 'GET',
      url,
      headers:
   {
     'cache-control': 'no-cache',
     'x-apikey': xApiKey,
   },
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      cb(JSON.parse(body));
    });
  }

  static postNewComment(pageId, commenterName, comment, cb) {
    const options = {
      method: 'POST',
      url: 'https://georegillamsdb-13ba.restdb.io/rest/blog-comments',
      headers:
   {
     'cache-control': 'no-cache',
     'x-apikey': xApiKey,
     'content-type': 'application/json',
   },
      body: { page_id: pageId, commenter_name: commenterName, comment },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      console.log(body);
      cb(body);
    });
  }
}

module.exports = RestDbIoFunctions;

