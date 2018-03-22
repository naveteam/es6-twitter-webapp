class Tweet {
    constructor(props) {
        this.name = props.name;
        this.text = props.text;
    }

    render() {
        const tweet = document.createElement("li");
        const user = document.createElement("span");
        user.innerHTML = this.name;
        const text = document.createElement("p")
        text.innerHTML = this.text;
        tweet.appendChild(user);
        tweet.appendChild(text);
        return tweet;
    }
}

class TweetList {
    constructor(props) {
        this.container = document.getElementById(props.tweetsContainer);
    }

    getTweets() {
        return new Promise((resolve, reject) => {
            fetch('https://api-nave-twitter.herokuapp.com/tweets')
                .then(response => {
                    response.json().then((data) => {
                        resolve(data);
                    });
                })
                .catch(error => reject(error));
        }) 
    }

    render() {
        const tweetsData = this.getTweets();
        tweetsData.then(resp => {
            const html = resp.map(t => {
                const tweet = new Tweet(t);
                return tweet.render();
            })
            html.forEach(el => this.container.appendChild(el));
        });
    }
}

class TweetForm {
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
        this.postData('https://api-nave-twitter.herokuapp.com/tweets', {userId: 1, text: "novo"})
            .then(data => console.log(data)) // JSON from `response.json()` call
            .catch(error => console.error(error))   
    }

    postData(url, data) {
    return fetch(url, {
        body: JSON.stringify({userId: 1, text: this.text}),
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
    })
    .then(response => response.json())
    }  

}
const tweetsContainer = 'tweets-container';
const form = 'tweet-form';
const list = new TweetList({tweetsContainer});
const tweetForm = new TweetForm({
    form,
    tweetsContainer
});

list.render();

console.log("ceee");

