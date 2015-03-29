var Tweet = require('../models/Tweet');

module.exports = function(stream, io) {

  stream.on('data', function(data) {

    var tweet = Tweet.build({
      twid: data.id,
      active: false,
      author: data.user.name,
      avatar: data.user.profile_image_url,
      body: data.text,
      date: data.created_at,
      screenname: data.user.screen_name
    });

    console.log(tweet.get('body'));
  });
};
