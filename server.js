const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const {
  DECIMAL_REGEX,
  INT_REGEX,
  SORT_CODE_REGEX,
  STRING_REGEX,
  MONZOME_LINK_REGEX,
} = require('./src/shared/constants');

const app = express();

const xApiKeyPub = process.env.REST_PUBLIC_ACCESS_KEY;
const xApiKeyPrivate = process.env.REST_PRIVATE_ACCESS_KEY;

let client = null;
if (process.env.REDIS_URL) {
  // Heroku redis connection
  // eslint-disable-next-line global-require
  client = require('redis').createClient(process.env.REDIS_URL);
} else {
  // running locally
  // eslint-disable-next-line global-require
  client = require('redis').createClient();
}

const buildDirectory = '../build';
const staticFiles = express.static(path.join(__dirname, buildDirectory));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, page_id, payment_id, blog_id, Api-Key, selected-blog-tags, blog-collection',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

client.on('connect', () => {
  client.set('framework', 'AngularJS');
});

// API Routing:

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router();

app.use(staticFiles);

router.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, './server_content', 'robots.txt'), {
    headers: { 'Content-Type': 'text/plain' },
  });
});

router.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, './server_content', 'sitemap.xml'), {
    headers: { 'Content-Type': 'text/xml' },
  });
});

router.get('/ontologies/2018/tv-listing-ontology', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      './server_content/ontologies',
      'tv-listing-ontology.owl',
    ),
    { headers: { 'Content-Type': 'text/xml' } },
  );
});

router.get('/api/greasemonkey/secureEcs_download', (req, res) => {
  res.sendFile(
    path.join(__dirname, './server_content/greasemonkey', 'secure ecs.js'),
    {
      headers: { 'Content-Type': 'text/plain' },
    },
  );
});

router.get('/api/greasemonkey/george_gillams_blog_edit', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      './server_content/greasemonkey',
      'georgeGillamsBlogEdit.js',
    ),
    {
      headers: { 'Content-Type': 'text/plain' },
    },
  );
});

router.get('/api/greasemonkey/guruShotsBoost_download', (req, res) => {
  res.sendFile(
    path.join(__dirname, './server_content/greasemonkey', 'guruShotsBoost.js'),
    {
      headers: { 'Content-Type': 'text/plain' },
    },
  );
});

router.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

router.get('/api/comments', (req, res) => {
  const pageId = req.headers.page_id;
  client.lrange(`${pageId}_comments`, 0, -1, (err, reply) => {
    const result = [];
    for (let i = 0; i < reply.length; i += 1) {
      result.push(JSON.parse(reply[i]));
    }
    res.send(result);
  });
});

router.get('/api/comments/page_ids', (req, res) => {
  client.lrange('pageIds', 0, -1, (err, reply) => {
    res.send(reply);
  });
});

router.post('/api/comments', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPub) {
    res.end();
    return;
  }
  const pageId = req.body.page_id;
  const commentId = Math.random()
    .toString(36)
    .substring(7);
  const commenterName = req.body.commenter_name;
  const { comment } = req.body;
  client.lrem('pageIds', 0, pageId);
  client.rpush(['pageIds', pageId]);
  client.rpush([
    `${pageId}_comments`,
    JSON.stringify({
      commentId,
      commenterName,
      comment,
      timestamp: Date.now(),
    }),
  ]);
  res.end();
});

router.delete('/api/comments', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPrivate) {
    res.end();
    return;
  }
  const pageId = req.body.page_id;
  const { pattern } = req.body;
  const commentId = req.body.comment_id;
  if (pattern === '*') {
    client.del(`${pageId}_comments`);
  } else if (pattern !== undefined) {
    client.lrange(`${pageId}_comments`, 0, -1, (err, reply) => {
      for (let i = reply.length - 1; i >= 0; i -= 1) {
        const comment = JSON.parse(reply[i]);
        if (`${comment.commenterName}${comment.comment}`.includes(pattern)) {
          client.lrem(`${pageId}_comments`, 1, reply[i]);
        }
      }
    });
  }
  if (commentId !== undefined) {
    client.lrange(`${pageId}_comments`, 0, -1, (err, reply) => {
      for (let i = 0; i < reply.length; i += 1) {
        const comment = JSON.parse(reply[i]);
        if (comment.commentId === commentId) {
          client.lrem(`${pageId}_comments`, 1, reply[i]);
          res.end();
          return;
        }
      }
    });
  }
  res.end();
});

router.get('/api/payments/count', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPub) {
    res.end();
    return;
  }
  client.lrange(`payments`, 0, -1, (err, reply) => {
    res.send([reply.length]);
  });
});

router.get('/api/payments/single', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPub) {
    res.end();
    return;
  }
  const paymentId = req.headers.payment_id;
  client.lrange(`payments`, 0, -1, (err, reply) => {
    for (let i = 0; i < reply.length; i += 1) {
      if (JSON.parse(reply[i]).paymentId === paymentId) {
        res.send(JSON.parse(reply[i]));
        return;
      }
    }
    res.send(null);
  });
});

router.get('/api/payments', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPrivate) {
    res.end();
    return;
  }
  client.lrange(`payments`, 0, -1, (err, reply) => {
    const result = [];
    for (let i = 0; i < reply.length; i += 1) {
      result.push(JSON.parse(reply[i]));
    }
    res.send(result);
  });
});

router.post('/api/payments', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPub) {
    res.end();
    return;
  }
  const { reference, amount } = req.body;
  const monzoMeLink = req.body.monzo_me_link;
  const accountNumber = req.body.account_number;
  const sortCode = req.body.sort_code;
  let valid = true;
  if (!amount.match(DECIMAL_REGEX)) {
    valid = false;
  }
  if (monzoMeLink !== '' && !monzoMeLink.matches(MONZOME_LINK_REGEX)) {
    valid = false;
  }
  if (!reference.match(STRING_REGEX)) {
    valid = false;
  }
  if (!accountNumber.match(INT_REGEX)) {
    valid = false;
  }
  if (!sortCode.match(SORT_CODE_REGEX)) {
    valid = false;
  }
  if (!valid) {
    res.send({
      error:
        'There was an error processing the request 😿 Please try again later.',
    });
    res.end();
    return;
  }
  const paymentId = Math.random()
    .toString(36)
    .substring(7);
  client.rpush([
    `payments`,
    JSON.stringify({
      paymentId,
      reference,
      amount,
      monzoMeLink,
      accountNumber,
      sortCode,
      status: 'pending',
      timestamp: Date.now(),
    }),
  ]);
  res.send({ payment_id: paymentId });
  res.end();
});

router.delete('/api/payments', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPrivate) {
    res.end();
    return;
  }
  const paymentId = req.body.payment_id;
  if (paymentId !== undefined) {
    client.lrange(`payments`, 0, -1, (err, reply) => {
      for (let i = 0; i < reply.length; i += 1) {
        const payment = JSON.parse(reply[i]);
        if (payment.paymentId === paymentId) {
          client.lrem(`payments`, 1, reply[i]);
          res.end();
          return;
        }
      }
    });
  }
  res.end();
});

router.delete('/api/blog-posts', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPrivate) {
    res.end();
    return;
  }
  const blogId = req.body.blog_id;
  if (blogId !== undefined) {
    client.lrange(`blog-posts`, 0, -1, (err, reply) => {
      for (let i = 0; i < reply.length; i += 1) {
        const blog = JSON.parse(reply[i]);
        if (blog.blogId === blogId) {
          client.lrem(`blog-posts`, 1, reply[i]);
          res.end();
          return;
        }
      }
    });
  }
  res.end();
});

router.post('/api/payments/status/authorise', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPrivate) {
    res.end();
    return;
  }
  const paymentId = req.body.payment_id;
  if (paymentId !== undefined) {
    client.lrange(`payments`, 0, -1, (err, reply) => {
      for (let i = 0; i < reply.length; i += 1) {
        const payment = JSON.parse(reply[i]);
        if (payment.paymentId === paymentId) {
          payment.status = 'authorised';
          client.lset(`payments`, i, JSON.stringify(payment));
          res.end();
          return;
        }
      }
    });
  }
  res.end();
});

router.post('/api/payments/status/complete', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPrivate) {
    res.end();
    return;
  }
  const paymentId = req.body.payment_id;
  if (paymentId !== undefined) {
    client.lrange(`payments`, 0, -1, (err, reply) => {
      for (let i = 0; i < reply.length; i += 1) {
        const payment = JSON.parse(reply[i]);
        if (payment.paymentId === paymentId) {
          payment.status = 'completed';
          client.lset(`payments`, i, JSON.stringify(payment));
          res.end();
          return;
        }
      }
    });
  }
  res.end();
});

router.post('/api/payments/status/reject', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPrivate) {
    res.end();
    return;
  }
  const paymentId = req.body.payment_id;
  if (paymentId !== undefined) {
    client.lrange(`payments`, 0, -1, (err, reply) => {
      for (let i = 0; i < reply.length; i += 1) {
        const payment = JSON.parse(reply[i]);
        if (payment.paymentId === paymentId) {
          payment.status = 'rejected';
          client.lset(`payments`, i, JSON.stringify(payment));
          res.end();
          return;
        }
      }
    });
  }
  res.end();
});

router.get('/api/blog-posts', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (
    apiKey === undefined ||
    !(apiKey === xApiKeyPub || apiKey === xApiKeyPrivate)
  ) {
    res.end();
    return;
  }
  const selectedBlogTags = req.headers['selected-blog-tags']
    ? req.headers['selected-blog-tags'].split(', ')
    : [];
  const blogCollection = req.headers['blog-collection'];
  client.lrange(`blog-posts`, 0, -1, (err, reply) => {
    const result = [];
    for (let i = 0; i < reply.length; i += 1) {
      const blog = JSON.parse(reply[i]);
      if (apiKey === xApiKeyPrivate || blog.blogPublished) {
        if (selectedBlogTags.length === 0) {
          if (
            blogCollection === 'all' ||
            (blogCollection === 'blog' && blog.blogShowInBlogsList) ||
            (blogCollection === 'travel' && blog.blogShowInTravelBlogsList)
          ) {
            result.push(blog);
          }
        } else {
          for (let j = 0; j < blog.blogTags.length; j += 1) {
            const tag = blog.blogTags[j];
            if (selectedBlogTags.includes(tag)) {
              if (
                blogCollection === 'all' ||
                (blogCollection === 'blog' && blog.blogShowInBlogsList) ||
                (blogCollection === 'travel' && blog.blogShowInTravelBlogsList)
              ) {
                result.push(blog);
              }
              break;
            }
          }
        }
      }
    }
    res.send(
      result.sort((a, b) => a.publishedTimestamp < b.publishedTimestamp),
    );
  });
});

router.get('/api/blog-posts/single', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (
    apiKey === undefined ||
    !(apiKey === xApiKeyPub || apiKey === xApiKeyPrivate)
  ) {
    res.end();
    return;
  }
  const blogId = req.headers.blog_id;
  client.lrange(`blog-posts`, 0, -1, (err, reply) => {
    for (let i = 0; i < reply.length; i += 1) {
      const blog = JSON.parse(reply[i]);
      if (blog.blogId === blogId) {
        // TODO If private api key, return blog
        // TODO Else if public api key, return only if published
        if (apiKey === xApiKeyPrivate || blog.blogPublished) {
          res.send(JSON.parse(reply[i]));
          return;
        }
      }
    }
    res.send(null);
  });
});

router.post('/api/blog-posts', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPrivate) {
    res.end();
    return;
  }
  const blogName = req.body.blog_name;
  const blogId = Math.random()
    .toString(36)
    .substring(7);
  const blogContent = req.body.blog_content;
  const blogTags = req.body.blog_tags;
  const blogPublished = req.body.blog_published;
  const blogImageBorderColor = req.body.blog_image_border_color;
  const blogBannerColor = req.body.blog_banner_color;
  const blogCardLight = req.body.blog_card_light;
  const blogCardLink = req.body.blog_card_link;
  const blogBibtex = req.body.blog_bibtex;
  const blogShowInBlogsList = req.body.blog_show_in_blogs_list;
  const blogShowInTravelBlogsList = req.body.blog_show_in_travel_blogs_list;
  const blogCardDate = req.body.blog_card_date;
  client.rpush([
    `blog-posts`,
    JSON.stringify({
      blogId,
      blogName,
      blogContent,
      blogTags,
      blogPublished,
      blogImageBorderColor,
      blogBannerColor,
      blogCardLight,
      blogCardLink,
      blogBibtex,
      blogShowInBlogsList,
      blogShowInTravelBlogsList,
      blogCardDate,
      publishedTimestamp: null,
    }),
  ]);
  res.send({ blog_id: blogId });
  res.end();
});

router.post('/api/blog-posts/update', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPrivate) {
    res.end();
    return;
  }
  const blogId = req.body.blog_id;
  const blogName = req.body.blog_name;
  const blogContent = req.body.blog_content;
  const blogTags = req.body.blog_tags;
  const blogPublished = req.body.blog_published;
  const blogHeroImage = req.body.blog_hero_image;
  const blogImage = req.body.blog_image;
  const blogImageBorderColor = req.body.blog_image_border_color;
  const blogBannerColor = req.body.blog_banner_color;
  const blogCardLight = req.body.blog_card_light;
  const blogCardLink = req.body.blog_card_link;
  const blogBibtex = req.body.blog_bibtex;
  const blogShowInBlogsList = req.body.blog_show_in_blogs_list;
  const blogShowInTravelBlogsList = req.body.blog_show_in_travel_blogs_list;
  const blogCardDate = req.body.blog_card_date;
  if (blogId !== undefined) {
    client.lrange(`blog-posts`, 0, -1, (err, reply) => {
      for (let i = 0; i < reply.length; i += 1) {
        const blog = JSON.parse(reply[i]);
        if (blog.blogId === blogId) {
          if (!blog.publishedTimestamp && blogPublished) {
            // blog has just been published for the first time:
            // Set Published date:
            blog.publishedTimestamp = Date.now();
          }
          blog.blogContent = blogContent;
          blog.blogName = blogName;
          blog.blogTags = blogTags;
          blog.blogPublished = blogPublished;
          blog.blogHeroImage = blogHeroImage;
          blog.blogImage = blogImage;
          blog.blogImageBorderColor = blogImageBorderColor;
          blog.blogBannerColor = blogBannerColor;
          blog.blogCardLight = blogCardLight;
          blog.blogCardLink = blogCardLink;
          blog.blogBibtex = blogBibtex;
          blog.blogShowInBlogsList = blogShowInBlogsList;
          blog.blogShowInTravelBlogsList = blogShowInTravelBlogsList;
          blog.blogCardDate = blogCardDate;
          client.lset(`blog-posts`, i, JSON.stringify(blog));
          return;
        }
      }
    });
  }
  res.send({ blog_id: blogId });
  res.end();
});

router.post('/api/blog-posts/override-published-timestamp', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPrivate) {
    res.end();
    return;
  }
  const blogId = req.body.blog_id;
  const blogPublishedTimestamp = req.body.blog_published_timestamp;
  if (blogId !== undefined) {
    client.lrange(`blog-posts`, 0, -1, (err, reply) => {
      for (let i = 0; i < reply.length; i += 1) {
        const blog = JSON.parse(reply[i]);
        if (blog.blogId === blogId) {
          blog.publishedTimestamp = blogPublishedTimestamp;
          client.lset(`blog-posts`, i, JSON.stringify(blog));
          return;
        }
      }
    });
  }
  res.send({ blog_id: blogId });
  res.end();
});

router.get('/api/notifications', (req, res) => {
  client.lrange('notifications', 0, -1, (err, reply) => {
    const result = [];
    for (let i = 0; i < reply.length; i += 1) {
      result.push(JSON.parse(reply[i]));
    }
    res.send(result);
  });
});

router.post('/api/notifications', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPrivate) {
    res.end();
    return;
  }
  const notificationId = Math.random()
    .toString(36)
    .substring(7);
  const notificationMessage = req.body.notification_message;
  const notificationType = req.body.notification_type;
  client.rpush([
    `notifications`,
    JSON.stringify({
      notificationId,
      notificationMessage,
      notificationType,
      timestamp: Date.now(),
    }),
  ]);
  res.end();
});

router.delete('/api/notifications', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPrivate) {
    res.end();
    return;
  }
  const notificationId = req.body.notification_id;
  if (notificationId !== undefined) {
    client.lrange(`notifications`, 0, -1, (err, reply) => {
      for (let i = reply.length - 1; i >= 0; i -= 1) {
        const notification = JSON.parse(reply[i]);
        if (notification.notificationId === notificationId) {
          client.lrem(`notifications`, 1, reply[i]);
        }
      }
    });
  }
  res.end();
});

router.get('/418', (req, res) => {
  res.status(418);
  res.sendFile(path.resolve(__dirname, buildDirectory, 'index.html'));
});

router.get('/teapot', (req, res) => {
  res.status(418);
  res.sendFile(path.resolve(__dirname, buildDirectory, 'index.html'));
});

app.use(router);

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles);

app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), () => {});
