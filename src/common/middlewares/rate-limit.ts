import expressRateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

export const rateLimitMiddleware = (): RateLimitRequestHandler => {
  const rateLimitMs = Number(process.env.RATE_LIMIT_MS)
  const rateLimitMin = rateLimitMs / 60000
  const rateLimitMax = Number(process.env.RATE_LIMIT_MAX)

  return expressRateLimit({
    windowMs: rateLimitMs,
    max: rateLimitMax,
    message: `Você excedeu o limite de ${rateLimitMax} requisições por minuto, volte novamente em ${rateLimitMin} ${rateLimitMin == 1 ? 'minuto' : 'minutos'}!`
  })
}

