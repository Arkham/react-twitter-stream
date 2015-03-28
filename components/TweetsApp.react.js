/** @jsx React.DOM */

var React = require('react');

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
        <h1>Hello World</h1>
        <p>Tweets Count: {this.state.tweets.length}</p>
      </div>
    );
  }
});
