var JSX = require('node-jsx').install(),
  React = require('react'),
  TweetsApp = require('./components/TweetsApp.react');

module.exports = {
  index: function(req, res) {
    var markup = React.renderToString(
      React.createElement(TweetsApp, { tweets: [] })
    );

    res.render('home', {
      markup: markup,
      state: '{}'
    });
  }
}
