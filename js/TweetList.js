import Tweet from './Tweet';
import { fetchTweets } from './services/services';

export default class TweetList {
    constructor(props) {
        this.container = document.getElementById(props.tweetsContainer);
        this.getTweets = this.getTweets.bind(this);
    }

    getTweets() {
        fetchTweets()
            .then((resp) => {
                this.tweets = resp;
            })
    }

    render() {
        this.getTweets();
        const html = this.tweets.map(t => {
            const tweet = new Tweet(t);
            return tweet.render();
        });
        html.forEach(el => this.container.appendChild(el));
    }
}