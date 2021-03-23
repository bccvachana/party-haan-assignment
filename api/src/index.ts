import express, { Application } from 'express';
import expressWinston from 'express-winston';
import cookieParser from 'cookie-parser';
import logger from '_helpers/logger';
import db from '_db';
import routes from '_controllers';
import { serverConfig } from '_configs';

(async () => {
  await db.migrate();

  const app: Application = express();

  app.use(expressWinston.logger({ winstonInstance: logger }));
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api', routes);

  app.listen(serverConfig.port, (): void => {
    logger.info(`🍺  Ready on ${serverConfig.port} ...`);
  });
})();
