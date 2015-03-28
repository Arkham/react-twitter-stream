var JSX = require('node-jsx').install(),
  React = require('react'),
  TweetsApp = require('./components/TweetsApp.react'),
  Tweet = require('./models/Tweet');

module.exports = {
  index: function(req, res) {
    Tweet.findAll().then(function(tweets) {
      var markup = React.renderToString(
        React.createElement(TweetsApp, { tweets: tweets })
      );

      res.render('home', {
        markup: markup,
        state: JSON.stringify(tweets)
      });
    })
  }
}
