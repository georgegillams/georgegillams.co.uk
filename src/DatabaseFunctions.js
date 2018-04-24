const request = require('request');
const HelperFunctions = require('./HelperFunctions');

const apiKey = '5a5b8bd87d7ef24c5cf08c84';
const url = HelperFunctions.includes(`${window.location}`, 'localhost')
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
      try {
        cb(JSON.parse(body));
      } catch (e) {
        cb([]);
      }
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
      try {
        cb(JSON.parse(body));
      } catch (e) {
        cb([]);
      }
    });
  }

  static getBlogs(privateApiKey, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/blog-posts`,
      headers: {
        'Api-Key': privateApiKey === '' ? apiKey : privateApiKey,
      },
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      try {
        cb(JSON.parse(body));
      } catch (e) {
        cb([]);
      }
    });
  }

  static getBlog(privateApiKey, blogId, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/blog-posts/single`,
      headers: {
        'Api-Key': privateApiKey === '' ? apiKey : privateApiKey,
        blog_id: blogId,
      },
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      try {
        cb(JSON.parse(body));
      } catch (e) {
        cb([]);
      }
    });
  }

  static updateBlog(privateApiKey, blog, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/blog-posts/update`,
      headers: { 'Api-Key': privateApiKey },
      body: {
        blog_id: blog.blogId,
        blog_name: blog.blogName,
        blog_content: blog.blogContent,
        blog_tags: blog.blogTags,
        blog_published: blog.blogPublished,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      cb(body);
    });
  }

  static addBlog(privateApiKey, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/blog-posts`,
      headers: { 'Api-Key': privateApiKey },
      body: {
        blog_name: 'new blog',
        blog_content: '',
        blog_tags: [],
        blog_published: false,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      cb(body);
    });
  }

  static deleteBlog(privateApiKey, blogId, cb) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/blog-posts`,
      headers: {
        'Api-Key': privateApiKey,
      },
      body: {
        blog_id: blogId,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) {
        throw new Error(error);
      }
      cb(body);
    });
  }

  static deletePayment(privateApiKey, paymentId, cb) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/payments`,
      headers: {
        'Api-Key': privateApiKey,
      },
      body: {
        payment_id: paymentId,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) {
        throw new Error(error);
      }
      cb(body);
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
      cb(body);
    });
  }

  static deleteComment(privateApiKey, pageId, pattern, commentId, cb) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/comments`,
      headers: {
        'Api-Key': privateApiKey,
      },
      body: {
        page_id: pageId,
        pattern,
        comment_id: commentId,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) {
        throw new Error(error);
      }
      cb(body);
    });
  }

  static createPaymentRequest(
    amount,
    accountNumber,
    monzoMeLink,
    sortCode,
    reference,
    cb,
  ) {
    const options = {
      method: 'POST',
      url: `${url}/api/payments`,
      headers: {
        'Api-Key': apiKey,
      },
      body: {
        amount,
        account_number: accountNumber,
        monzo_me_link: monzoMeLink,
        sort_code: sortCode,
        reference,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      cb(body);
    });
  }

  static getPaymentRequestCount(cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/payments/count`,
      headers: {
        'Api-Key': apiKey,
      },
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      try {
        cb(JSON.parse(body)[0]);
      } catch (e) {
        cb(null);
      }
    });
  }

  static getPayment(paymentId, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/payments/single`,
      headers: {
        'Api-Key': apiKey,
        payment_id: paymentId,
      },
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      try {
        cb(JSON.parse(body));
      } catch (e) {
        cb(null);
      }
    });
  }

  static getPayments(privateApiKey, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/payments`,
      headers: {
        'Api-Key': privateApiKey,
      },
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      try {
        cb(JSON.parse(body));
      } catch (e) {
        cb([]);
      }
    });
  }

  static rejectPayment(privateApiKey, paymentId, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/payments/status/reject`,
      headers: {
        'Api-Key': privateApiKey,
      },
      body: {
        payment_id: paymentId,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      cb(body);
    });
  }

  static authorisePayment(privateApiKey, paymentId, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/payments/status/authorise`,
      headers: {
        'Api-Key': privateApiKey,
      },
      body: {
        payment_id: paymentId,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
    });
  }

  static completePayment(privateApiKey, paymentId, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/payments/status/complete`,
      headers: {
        'Api-Key': privateApiKey,
      },
      body: {
        payment_id: paymentId,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
    });
  }
}

module.exports = DatabaseFunctions;
