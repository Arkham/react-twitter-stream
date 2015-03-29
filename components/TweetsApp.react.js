/** @jsx React.DOM */

var React = require('react');
var Tweets = require('./Tweets.react');

module.exports = TweetsApp = React.createClass({
  getInitialState: function(props) {
    props = props || this.props;

    return {
      tweets: props.tweets
    }
  },

  render: function() {
    return (
      <div className="tweets-app">
        <Tweets tweets={this.state.tweets} />
      </div>
    );
  }
});
