/** @jsx React.DOM */

var React = require('react');
var pluralize = require('pluralize');

module.exports = React.createClass({
  render: function() {
    var count = this.props.count;

    return (
      <div className={"notification-bar" + (count > 0 ? ' active' : '')}>
        <p>We have {count} new {pluralize('tweet', count)}! <a href="#" onClick={this.props.onShowNewTweets}>Click here to show</a></p>
      </div>
    );
  }
});
