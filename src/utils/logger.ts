import { environment } from "@/configs/env.config"
import winston from "winston"

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: `${environment.packageName}.log` }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
})

export default logger
