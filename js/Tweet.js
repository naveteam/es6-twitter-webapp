export default class Tweet {
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