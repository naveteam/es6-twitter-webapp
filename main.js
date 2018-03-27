class Tweet {
    constructor(props) {
        this.name = props.username;
        this.text = props.text;
        this.id = props._id;
        this.delete = this.delete.bind(this);
    }

    delete() {
        fetch(`https://twitter-nave-api.herokuapp.com/tweets/${this.id}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*'}
        })
            .then(() => this.tweet.remove());
    }

    render() {
        const tweet = document.createElement("li");
        const user = document.createElement("span");
        const deleteButton = document.createElement("button");
        const text = document.createElement("p")
        const div = document.createElement("div");
        deleteButton.onclick = this.delete;
        deleteButton.innerHTML = "Excluir";
        user.innerHTML = this.name;
        text.innerHTML = this.text;
        div.appendChild(text);
        div.appendChild(deleteButton);
        tweet.appendChild(user);
        tweet.appendChild(div);
        tweet.classList.add("tweet");
        this.tweet = tweet;
        return tweet;
    }
}

class TweetList {
    constructor(props) {
        this.container = document.getElementById(props.tweetsContainer);
    }

    getTweets() {
        return new Promise((resolve, reject) => {
            fetch('https://twitter-nave-api.herokuapp.com/tweets')
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

const tweetsContainer = 'tweets-container';
const form = 'tweet-form';
const list = new TweetList({tweetsContainer});
const tweetForm = new TweetForm({
    form,
    tweetsContainer
});

list.render();

