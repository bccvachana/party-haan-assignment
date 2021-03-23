import winston, { Logger } from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const logger: Logger = winston.createLogger({
  levels,
  format: winston.format.combine(
    winston.format.metadata(),
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize({ all: true }),
  ),
  transports: [
    new winston.transports.Console(),
  ],
  exitOnError: false,
});

export default logger;
