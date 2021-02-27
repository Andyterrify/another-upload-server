import argon2, { hash } from 'argon2';
import crypto from 'crypto';

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export default hashToken;
