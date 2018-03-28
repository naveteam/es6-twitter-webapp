import Tweet from './Tweet';
import { postTweet } from './services/services';

export default class TweetForm {
    constructor(props) {
        this.form = document.getElementById(props.form);
        this.container = document.getElementById(props.tweetsContainer);
        this.form.onsubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.text = document.forms["create-tweet"]["tweet"].value;
        if (this.text)
            this.add();
    }

    add() {
        postTweet(this.text)
            .then(data => {
                const tweet = new Tweet(data);
                document.forms["create-tweet"]["tweet"].value = "";
                this.container.append(tweet.render());
            })   
    }  
}
