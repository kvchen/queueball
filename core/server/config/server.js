export default {
  port: process.env.PORT || 3000,
  views: 'core/client',
  assets: 'core/client/dist',
  session: {
    secret: process.env.SESSION_SECRET || 'mXVTcZF9RXUMWwAZuQNxAKge',
    prefix: 'koa:sess:',
  },
};
