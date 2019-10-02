# [https://www.georgegillams.co.uk/](https://www.georgegillams.co.uk/)

[![Greenkeeper badge](https://badges.greenkeeper.io/georgegillams/georgegillams.co.uk.svg)](https://greenkeeper.io/)

![Travis status](https://api.travis-ci.org/georgegillams/georgegillams.co.uk.svg?branch=master)

This repo was originally a fork of [Dinesh Pandiyan's React Redux Boilerplate app](https://github.com/flexdinesh/react-redux-boilerplate).

This is the code for my personal website. The project uses React, Redux, and has a Node API which talks to a Redis database.

I use my site to experiment with things, share stuff I've figured out, and allow people to reach-out to me. So if you're interested in anything I do, [get in touch](https://www.georgegillams.co.uk/contact)!

## Running
Ensure a redis-instance is running.

```
yarn
yarn run dev
```

Note that a prebuild script is used to transpile some dependencies. It will therefore take longer the first time you build it.

`yarn run dev` will set all necessary environment variables needed to run the application.

The front-end app is server-side rendered with React and interacts with the API via Redux middleware.

## API

## Hosting on Heroku
To host this on Heroku, you will need to add the [Heroku-redis Add-on](https://devcenter.heroku.com/articles/heroku-redis) and ensure the following environment variables are created:

| Env var             | Reason                                 | Value                                                |
| ------------------- | -------------------------------------- | -----------------------------------------------------|
| GSUITE_APP_PASSWORD | To send emails from your Gmail account | The password generated to access yout G-Suite account|
| GSUITE_EMAIL        | To send emails from your Gmail account | Your G-Suite email address                           |
| NODE_ENV            | Makes the magic happen                 | `production`                                         |
| REDIS_URL           | To access the redis database           | \<Created by the Add-on\>                            |
| SECRET_API_KEY      | Used to make admin API requests        | Anything secret and impossible to guess              |

## Contributing
Contributions are welcome. Please fork and submit a PR if you want to add or change a feature.
