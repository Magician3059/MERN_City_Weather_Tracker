import jwt from 'jsonwebtoken';
import { config } from '../utils/config.js';
import result from '../utils/result.js';

export function authorization(req, res, next) {
  // Public routes
  if (
    req.url === '/api/user/register' ||
    req.url === '/api/user/login'    ||
    req.url.startsWith('/api/weather') ) // allow weather route without token
    {
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
   req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).send(result.createErrorResult('Invalid Token'));
  }
}
