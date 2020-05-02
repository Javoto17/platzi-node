module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.API_PORT || 3000,
  },
  post: {
    port: process.env.POST_PORT || 3002,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'noatsecret!',
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'sql7.freesqldatabase.com',
    user: process.env.MYSQL_USER || 'sql7337261',
    password: process.env.MYSQL_PASSW || 'dCYRY2zIy2',
    database: process.env.MYSQL_DB || 'sql7337261',
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
  cacheService: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || '3003',
  },
  redis: {
    host:
      process.env.REDIS_HOST ||
      'redis-15201.c228.us-central1-1.gce.cloud.redislabs.com',
    port: process.env.REDIS_PORT || 15201,
    password: process.env.REDIS_PASS || 'ltFntbvRCoWds3SIYZ7YRkeNktjD01yb',
  },
};
