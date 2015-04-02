/** @jsx React.DOM */

var React = require('react');
var Tweets = require('./Tweets.react');
var request = require('superagent');

module.exports = TweetsApp = React.createClass({
  getInitialState: function(props) {
    props = props || this.props;

    return {
      tweets: props.tweets,
      count: 0,
      page: 0,
      skip: 0,
      paging: false,
      done: false
    }
  },

  componentWillReceiveProps: function(newProps, oldProps) {
    this.setState(this.getInitialState(newProps));
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this.checkWindowScroll);
  },

  checkWindowScroll: function() {
    var height = Math.max(document.documentElement.clientHeight,
                          window.innerHeight || 0);
    var scrollTop = document.body.scrollTop;
    var scrolled = (height + scrollTop) >= document.body.offsetHeight;

    if (scrolled && !this.state.paging && !this.state.done) {
      this.setState({ paging: true, page: this.state.page + 1 });
      this.getPage(this.state.page);
    }
  },

  getPage: function(page) {
    var self = this;

    request.get(`page/${page}/${this.state.skip}`).end(function(err, res) {
      if (err) {
        self.setState({paging: false, done: true});
      } else {
        self.loadPagedTweets(JSON.parse(res.text));
      }
    });
  },

  loadPagedTweets: function(tweets) {
    if (tweets.length) {
      var updated = this.state.tweets;

      tweets.forEach(function(tweet) {
        updated.push(tweet);
      });

      this.setState({tweets: updated, paging: false});
    } else {
      this.setState({done: true, paging: false});
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
