import logger from "../utils/logger.js";

const requestLogger = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  logger.info({
    event: "REQUEST",
    method: req.method,
    route: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  next();
};

export default requestLogger;
