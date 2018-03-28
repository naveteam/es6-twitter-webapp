import TweetForm from './TweetForm';
import TweetList from './TweetList';

const tweetsContainer = 'tweets-container';
const form = 'tweet-form';
const list = new TweetList({tweetsContainer});
const tweetForm = new TweetForm({
    form,
    tweetsContainer
});

list.render();

