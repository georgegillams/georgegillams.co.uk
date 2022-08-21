# [https://www.georgegillams.co.uk/](https://www.georgegillams.co.uk/?utm_source=GitHub)

![Build status](https://github.com/georgegillams/georgegillams.co.uk/workflows/CI/badge.svg)
![Dependencies status](https://img.shields.io/david/georgegillams/georgegillams.co.uk)

This is the code for my personal website. The project uses React, Redux, and has a Node API which talks to a Redis database.

I use my site to experiment with things, share stuff I've figured out, and allow people to reach-out to me. So if you're interested in anything I do, [get in touch](https://www.georgegillams.co.uk/contact?utm_source=GitHub)!

## Developing

### Prerequisites

Ensure redis is installed (`brew install redis`).

### Running locally

```
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn install --frozen-lockfile
yarn dev
```

`yarn dev` will set all necessary environment variables needed to run the application.

A debugger can be attached to debug server-side code.

### Testing

If components have changed, snapshot tests may need to be updated. Backstop js visual regression tests may also need to be updated.

To update jest snapshots:

```
npx jest -u
```

To update backstopJS snapshots:

```
./scripts/docker/prepare.sh
./scripts/docker/run-tests.sh --update
./scripts/docker/clean-up.sh'
```

- The first will setup the docker image and container. If they already exist this will be super fast.
- The second will copy the project over, setup dependencies, build and run, and take screenshots. Failed screenshots will be copied back to your machine.
- The third simply stops the docker container.

Any changes resulting from these commands should be verified and checked in.

## Hosting

The following environment variables should be set up

| Env var             | Reason                                 | Value                                                                     |
| ------------------- | -------------------------------------- | ------------------------------------------------------------------------- |
| GSUITE_APP_PASSWORD | To send emails from your Gmail account | The password generated to access yout G-Suite account                     |
| GSUITE_EMAIL        | To send emails from your Gmail account | Your G-Suite email address                                                |
| FLICKR_API_KEY      | To pull images from the showcase album | Your Flickr API key                                                       |
| NODE_ENV            | Makes the magic happen                 | `production`                                                              |
| REDIS_URL           | To access the redis database.          | If no URL is provided, the server will connect to a local redis instance. |
| SECRET_API_KEY      | Used to make admin API requests        | Anything secret and impossible to guess                                   |
| SESSION_SECRET      | Used to sign cookies                   | Anything secret and impossible to guess                                   |

### Hosting on Heroku

To host this on Heroku, you will need to add the [Heroku-redis Add-on](https://devcenter.heroku.com/articles/heroku-redis). Doing so will create a the REDIS_URL environment variable required to connect to the DB. The server code will automatically use this connection if present instead of connecting to a local instance.

## Contributing

Contributions are welcome. Please fork and submit a PR if you want to add or change a feature.
