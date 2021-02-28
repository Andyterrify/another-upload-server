const pattern = /(?<=Bearer )([a-zA-Z0-9-_]+.[a-zA-Z0-9-_]+.[a-zA-Z0-9-_]+)/g;

export default async function extractToken(string) {
  return new Promise((resolve, reject) => {
    try {
      const token = string.match(pattern)[0];
      return resolve(token);
    } catch (err) {
      return reject(err);
    }
  });
}
