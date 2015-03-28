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
      <h1>Hello World MOM</h1>
    );
  }
});
