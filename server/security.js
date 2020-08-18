import appConfig from 'helpers/appConfig';
import cors from 'cors';
import helmet from 'helmet';
import slowDown from 'express-slow-down';
import apiStructure from 'helpers/apiStructure';

const sensitiveApiRoutes = [];
Object.keys(apiStructure).forEach(k => {
  const apiRoute = apiStructure[k];
  if (apiRoute.isSensitive) {
    sensitiveApiRoutes.push(`api${apiRoute.path}`);
  }
});

const applySecurityPractises = server => {
  // Helmet
  server.use(helmet());

  // Cors
  if (appConfig.isProduction && !appConfig.projectUnderTest) {
    server.use(
      cors({
        origin: appConfig.siteUrl,
      })
    );
  }

  // Rate limiting
  server.use(
    slowDown({
      windowMs: 15 * 60 * 1000, // 15 minutes
      delayAfter: 5, // allow 5 requests per window without limiting...
      delayMs: 500, // add 1s delay per request above 50...
      maxDelayMs: 10000, // with a maximum delay of 10 seconds
      // request # 1 no delay
      // ...
      // request # 5 no delay
      // request # 6 is delayed by 500ms
      // request # 7 is delayed by 1000ms
      // request # 8 is delayed by 1500ms
      // ...
      // request # 25 is delayed by 10s
      // request # 26 is delayed by 10s <-- won't exceed 10s delay
      // ...
      skip: req => {
        let skip = true;
        sensitiveApiRoutes.forEach(s => {
          if (req.originalUrl.includes(s)) {
            skip = false;
          }
        });
        return skip;
      },
    })
  );
};

export default applySecurityPractises;
