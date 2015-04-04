/** @jsx React.DOM */

var React = require('react');
var request = require('superagent');
var Tweets = require('./Tweets.react');
var Loader = require('./Loader.react');

module.exports = React.createClass({
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

  addTweet: function(tweet) {
    var newTweets = this.state.tweets;

    newTweets.unshift(tweet);

    this.setState({
      tweets: newTweets,
      count: this.state.count + 1,
      skip: this.state.skip + 1
    });
  },

  componentWillReceiveProps: function(newProps, oldProps) {
    this.setState(this.getInitialState(newProps));
  },

  componentDidMount: function() {
    var self = this;

    var socket = require('socket.io-client').connect();

    socket.on('tweet', function(data) {
      self.addTweet(data);
    });

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
    var self = this;

    if (tweets.length) {
      var updated = self.state.tweets;

      tweets.forEach(function(tweet) {
        updated.push(tweet);
      });

      // Make everything slower so we can see the loader
      setTimeout(function(){
        self.setState({tweets: updated, paging: false});
      }, 1000);
    } else {
      self.setState({done: true, paging: false});
    }
  },

  render: function() {
    return (
      <div className="tweets-app">
        <Tweets tweets={this.state.tweets} />
        <Loader paging={this.state.paging} />
      </div>
    );
  }
});
