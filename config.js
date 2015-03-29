module.exports = {
  twitter: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET,
  },

  database: {
    development: {
      username: "arkham",
      password: null,
      database: "react_twitter_development",
      host: "127.0.0.1",
      dialect: "postgres"
    }
  }
}
