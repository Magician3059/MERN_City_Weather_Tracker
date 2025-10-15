import jwt from 'jsonwebtoken';
import { config } from '../utils/config.js';
import result from '../utils/result.js';

export function authorization(req, res, next) {
   const path = req.originalUrl;

  // allow public routes
  if (
    path.startsWith('/api/user/register') ||
    path.startsWith('/api/user/login') ||
    path.startsWith('/api/weather')
  ) {
    return next();
  }
 // get token from header having name : authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // extract after 'Bearer'
  
  if (!token) {
    return res.status(401).send(result.createErrorResult('Token is missing'));
  }

  try {
    const payload = jwt.verify(token, config.secret);
   req.headers.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).send(result.createErrorResult('Invalid Token'));
  }
}
