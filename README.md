# [https://www.georgegillams.co.uk/](https://www.georgegillams.co.uk/?utm_source=GitHub)

![Build status](https://api.travis-ci.org/georgegillams/georgegillams.co.uk.svg?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/georgegillams/georgegillams.co.uk.svg)](https://greenkeeper.io/)

This repo was originally a fork of [Dinesh Pandiyan's React Redux Boilerplate app](https://github.com/flexdinesh/react-redux-boilerplate).

This is the code for my personal website. The project uses React, Redux, and has a Node API which talks to a Redis database.

I use my site to experiment with things, share stuff I've figured out, and allow people to reach-out to me. So if you're interested in anything I do, [get in touch](https://www.georgegillams.co.uk/contact?utm_source=GitHub)!

## Developing

### Prerequisites

Ensure redis is installed (`brew install redis`).

### Running locally

```
npm i
npm run dev
```

`npm run dev` will set all necessary environment variables needed to run the application.

The front-end app is server-side rendered with React and interacts with the API via Redux middleware.

### Testing

If components have changed, snapshot tests may need to be updated. Backstop js visual regression tests may also need to be updated.

To update jest snapshots:
```
npx jest -u
```

To update backstopJS snapshots:
```
docker build -t georgegillams-test -f Dockerfile.backstopjstest .
docker run georgegillams-test
docker cp DOCKER_CONTAINER_ID:/usr/src/tmp/backstop_data ./
```

Any changes resulting from these commands should be verified and checked in.

## API

## Hosting on Heroku
To host this on Heroku, you will need to add the [Heroku-redis Add-on](https://devcenter.heroku.com/articles/heroku-redis) and ensure the following environment variables are created:

| Env var                    | Reason                                 | Value                                                |
| -------------------------- | -------------------------------------- | -----------------------------------------------------|
| GSUITE_APP_PASSWORD        | To send emails from your Gmail account | The password generated to access yout G-Suite account|
| GSUITE_EMAIL               | To send emails from your Gmail account | Your G-Suite email address                           |
| NODE_ENV                   | Makes the magic happen                 | `production`                                         |
| REDIS_URL                  | To access the redis database           | \<Created by the Add-on\>                            |
| SECRET_API_KEY             | Used to make admin API requests        | Anything secret and impossible to guess              |
| STRIPE_PUBLIC_API_KEY      | Used to enable card payments           | Comes from the Stripe dashboard                      |
| STRIPE_SECRET_API_KEY      | Used to enable card payments           | Comes from the Stripe dashboard                      |

## Contributing
Contributions are welcome. Please fork and submit a PR if you want to add or change a feature.
