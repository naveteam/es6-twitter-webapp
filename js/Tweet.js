import { deleteTweet } from './services/services';

export default class Tweet {
    constructor(props) {
        this.name = props.username;
        this.text = props.text;
        this.id = props._id;
        this.delete = this.delete.bind(this);
        window.deleteTweet = this.delete;
    }

    card(){ 
        return`
            <div class="card column is-one-third">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">${this.name}</p>
                        </div>
                    </div>
                    <div class="content">
                        ${this.text}
                    </div>
                    <button class="button is-dark is-pulled-right" onclick="window.deleteTweet('${this.id}')">
                        Excluir
                    </button>
                </div>
            </div>
    `}

    delete(id) {
        deleteTweet(id)
            .then(() => this.tweet.remove());
    }

    render() {
        const tweet = document.createElement("div")
        tweet.classList.add("columns", "is-multiline", "is-centered");
        const cardContainer = this.card(this.name, this.text, this.delete);
        tweet.innerHTML = cardContainer;
        this.tweet = tweet;
        return tweet;
    }
}