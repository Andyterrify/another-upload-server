import jwt from 'jsonwebtoken';

function access(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.unsername,
      displayName: user.displayName,
      email: user.email,
      access: user.access,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '20d' },
  );
}

function refresh(user, exp) {
  return jwt.sign({
    id: user.id,
    exp,
  }, process.env.JWT_REFRESH_SECRET);
}

export default {
  access, refresh,
};
