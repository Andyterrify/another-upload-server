import jwt from 'jsonwebtoken';

function refresh(user) {
  return jwt.sign({
    id: user.id,
    username: user.unsername,
    displayName: user.displayName,
    email: user.email,
    access: user.access,
  }, process.env.JWT_REFRESH_SECRET);
}

function access(user) {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '20d' },
  );
}

export default {
  access, refresh,
};
