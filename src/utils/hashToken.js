import crypto from 'crypto';

export default (token) => crypto.createHash('sha256').update(token).digest('hex');
