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

  static getSessionIds(sessionId, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/session-ids`,
      headers: {
        'Session-Id': sessionId === '' ? null : sessionId,
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
  static getLoggedInSessionIds(sessionId, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/logged-in-session-ids`,
      headers: {
        'Session-Id': sessionId === '' ? null : sessionId,
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

  static login(sessionId, uname, pword, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/login`,
      headers: {
        'Session-Id': sessionId,
      },
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

  static getBlogs(blogCollection, sessionId, selectedBlogTags, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/blog-posts`,
      headers: {
        'Session-Id': sessionId === '' ? null : sessionId,
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

  static getBlog(sessionId, blogId, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/blog-posts/single`,
      headers: {
        'Session-Id': sessionId === '' ? null : sessionId,
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

  static deleteSession(sessionId, sessionIdToDelete, cb) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/session-ids`,
      headers: {
        'Session-Id': sessionId,
      },
      body: {
        session_id: sessionIdToDelete,
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

  static deleteLoggedInSession(sessionId, sessionIdToDelete, cb) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/logged-in-session-ids`,
      headers: {
        'Session-Id': sessionId,
      },
      body: {
        logged_in_session_id: sessionIdToDelete,
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

  static updateBlog(sessionId, blog, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/blog-posts/update`,
      headers: { 'Session-Id': sessionId },
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
        blog_published_timestamp: blog.publishedTimestamp,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      cb(body);
    });
  }

  static addBlog(sessionId, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/blog-posts`,
      headers: { 'Session-Id': sessionId },
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
        blog_published_timestamp: null,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      cb(body);
    });
  }

  static deleteBlog(sessionId, blogId, cb) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/blog-posts`,
      headers: {
        'Session-Id': sessionId,
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

  static deleteAllPings(sessionId, cb) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/ping-tests`,
      headers: {
        'Session-Id': sessionId,
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

  static deletePayment(sessionId, paymentId, cb) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/payments`,
      headers: {
        'Session-Id': sessionId,
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
      headers: {
        'Session-Id': sessionId,
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

  static deleteComment(sessionId, pageId, pattern, commentId, cb) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/comments`,
      headers: {
        'Session-Id': sessionId,
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

  static getPayments(sessionId, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/payments`,
      headers: {
        'Session-Id': sessionId,
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

  static rejectPayment(sessionId, paymentId, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/payments/status/reject`,
      headers: {
        'Session-Id': sessionId,
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

  static authorisePayment(sessionId, paymentId, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/payments/status/authorise`,
      headers: {
        'Session-Id': sessionId,
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

  static completePayment(sessionId, paymentId, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/payments/status/complete`,
      headers: {
        'Session-Id': sessionId,
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

  static getNotifications(sessionId, cb) {
    const options = {
      method: 'GET',
      url: `${url}/api/notifications`,
      headers: {
        'Session-Id': sessionId,
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

  static createNotification(sessionId, message, type, cb) {
    const options = {
      method: 'POST',
      url: `${url}/api/notifications`,
      headers: {
        'Session-Id': sessionId,
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

  static deleteNotification(sessionId, notificationId, cb) {
    const options = {
      method: 'DELETE',
      url: `${url}/api/notifications`,
      headers: {
        'Session-Id': sessionId,
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
