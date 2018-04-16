import Tweet from './Tweet';
import { fetchTweets } from './services/services';

export default class TweetList {
    constructor(props) {
        this.container = document.getElementById(props.tweetsContainer);
        this.getTweets = this.getTweets.bind(this);
    }

    getTweets() {
        return fetchTweets()
            .then((resp) => {
                this.tweets = resp;
            })
    }

    async render() {
        try {
            await this.getTweets();
            const html = this.tweets.map(t => {
                const tweet = new Tweet(t);
                return tweet.render();
            });
            html.forEach(el => this.container.appendChild(el));
        } catch(e) {
            console.log(e);
        }
    }
}