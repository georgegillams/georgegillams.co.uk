const request = require('request');
const HelperFunctions = require('./HelperFunctions');

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

  static getNewSessionId(cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/session-id`,
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

  static getSessionIds(loggedInSessionId, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/session-ids`,
      headers: {
        'Logged-In-Session-Id':
          loggedInSessionId === '' ? null : loggedInSessionId,
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
  static getLoggedInSessionIds(loggedInSessionId, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/logged-in-session-ids`,
      headers: {
        'Logged-In-Session-Id':
          loggedInSessionId === '' ? null : loggedInSessionId,
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

  static login(uname, pword, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/login`,
      headers: {},
      body: {
        username: uname,
        password: pword,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      cb(body);
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

  static getPings(cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/ping-tests`,
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

  static getBlogs(blogCollection, loggedInSessionId, selectedBlogTags, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/blog-posts`,
      headers: {
        'Logged-In-Session-Id':
          loggedInSessionId === '' ? null : loggedInSessionId,
        'selected-blog-tags': selectedBlogTags,
        'blog-collection': blogCollection,
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

  static getBlog(loggedInSessionId, blogId, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/blog-posts/single`,
      headers: {
        'Logged-In-Session-Id':
          loggedInSessionId === '' ? null : loggedInSessionId,
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

  static updateBlog(loggedInSessionId, blog, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/blog-posts/update`,
      headers: { 'Logged-In-Session-Id': loggedInSessionId },
      body: {
        blog_id: blog.blogId,
        blog_name: blog.blogName,
        blog_content: blog.blogContent,
        blog_tags: blog.blogTags,
        blog_published: blog.blogPublished,
        blog_hero_image: blog.blogHeroImage,
        blog_image: blog.blogImage,
        blog_image_border_color: blog.blogImageBorderColor,
        blog_banner_color: blog.blogBannerColor,
        blog_card_light: blog.blogCardLight,
        blog_card_link: blog.blogCardLink,
        blog_bibtex: blog.blogBibtex,
        blog_show_in_blogs_list: blog.blogShowInBlogsList,
        blog_show_in_travel_blogs_list: blog.blogShowInTravelBlogsList,
        blog_card_date: blog.blogCardDate,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      cb(body);
    });
  }

  static addBlog(loggedInSessionId, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/blog-posts`,
      headers: { 'Logged-In-Session-Id': loggedInSessionId },
      body: {
        blog_name: 'new blog',
        blog_content: '',
        blog_image_border_color: '',
        blog_banner_color: '',
        blog_tags: [],
        blog_card_link: '/blog/no-blog-here',
        blog_card_light: false,
        blog_published: false,
        blog_show_in_blogs_list: true,
        blog_show_in_travel_blogs_list: true,
        blog_card_date: null,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      cb(body);
    });
  }

  static deleteBlog(loggedInSessionId, blogId, cb) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/blog-posts`,
      headers: {
        'Logged-In-Session-Id': loggedInSessionId,
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

  static deleteAllPings(loggedInSessionId, cb) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/ping-tests`,
      headers: {
        'Logged-In-Session-Id': loggedInSessionId,
      },
      body: {},
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) {
        throw new Error(error);
      }
      cb(body);
    });
  }

  static deletePayment(loggedInSessionId, paymentId, cb) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/payments`,
      headers: {
        'Logged-In-Session-Id': loggedInSessionId,
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

  static postNewComment(sessionId, pageId, commenterName, comment, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/comments`,
      headers: {},
      body: {
        page_id: pageId,
        commenter_session_id: sessionId,
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

  static deleteComment(
    regularSessionId,
    loggedInSessionId,
    pageId,
    pattern,
    commentId,
    cb,
  ) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/comments`,
      headers: {
        'Logged-In-Session-Id': loggedInSessionId,
      },
      body: {
        deleter_id: regularSessionId,
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
      headers: {},
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
      headers: {},
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

  static getPayments(loggedInSessionId, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/payments`,
      headers: {
        'Logged-In-Session-Id': loggedInSessionId,
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

  static rejectPayment(loggedInSessionId, paymentId, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/payments/status/reject`,
      headers: {
        'Logged-In-Session-Id': loggedInSessionId,
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

  static authorisePayment(loggedInSessionId, paymentId, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/payments/status/authorise`,
      headers: {
        'Logged-In-Session-Id': loggedInSessionId,
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

  static completePayment(loggedInSessionId, paymentId, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/payments/status/complete`,
      headers: {
        'Logged-In-Session-Id': loggedInSessionId,
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

  static getNotifications(cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/notifications`,
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

  static createNotification(loggedInSessionId, message, type, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/notifications`,
      headers: {
        'Logged-In-Session-Id': loggedInSessionId,
      },
      body: {
        notification_message: message,
        notification_type: type,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      cb(body);
    });
  }

  static deleteNotification(loggedInSessionId, notificationId, cb) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/notifications`,
      headers: {
        'Logged-In-Session-Id': loggedInSessionId,
      },
      body: {
        notification_id: notificationId,
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
}

module.exports = DatabaseFunctions;
