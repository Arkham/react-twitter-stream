/** @jsx React.DOM */

var React = require('react');

module.exports = Tweets = React.createClass({
  render: function() {
    var tweets = this.props.tweets.map(function(tweet) {
      return (
        <li key={tweet.id} className="tweet">
          <div className="tweet-image">
            <img src={tweet.avatar} />
          </div>
          <div className="tweet-content">
            <h2>{tweet.author}</h2>
            <span>@{tweet.screenName}</span>
            <p>{tweet.body}</p>
          </div>
        </li>
      );
    });

    return (
      <ul>{tweets}</ul>
    );
  }
})
