import jwt from 'jsonwebtoken';
import { config } from '../utils/config.js';
import result from '../utils/result.js';

export function authorization(req, res, next) {
  const path = req.originalUrl;

  // ✅ Allow public routes
  if (
    path.includes('/api/user/register') ||
    path.includes('/api/user/login') ||
    path.includes('/api/weather')
  ) {
    return next();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send(result.createErrorResult('Token missing'));

  try {
    const payload = jwt.verify(token, config.secret);
   req.userId = payload.userId;
    next();
  } catch {
    res.status(401).send(result.createErrorResult('Invalid Token'));
  }
}
