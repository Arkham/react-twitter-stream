var JSX = require('node-jsx').install({harmony: true}),
  React = require('react'),
  TweetsApp = require('./components/TweetsApp.react'),
  Tweet = require('./models/Tweet');

module.exports = {
  index: function(req, res) {
    Tweet.getTweets({page: 0}, function(tweets) {
      var markup = React.renderToString(
        React.createElement(TweetsApp, { tweets: tweets })
      );

      res.render('home', {
        markup: markup,
        state: JSON.stringify(tweets)
      });
    })
  },

  page: function(req, res) {
    Tweet.getTweets({
      page: req.params.page,
      skip: req.params.skip
    }, function(tweets) {
      res.send(tweets);
    });
  }
}
