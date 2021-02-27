import jwt from 'jsonwebtoken';

async function createAccessToken(user) {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '20d' },
  );
}

export default createAccessToken;
