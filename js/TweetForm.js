import Tweet from './Tweet';

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
        this.postData('https://twitter-nave-api.herokuapp.com/tweets')
            .then(data => {
                const tweet = new Tweet(data);
                document.forms["create-tweet"]["tweet"].value = "";
                this.container.append(tweet.render());
            })   
    }

    postData(url) {
        return fetch(url, {
            body: JSON.stringify({text: this.text}),
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*'}
        })
        .then(response => response.json())
    }  
}
