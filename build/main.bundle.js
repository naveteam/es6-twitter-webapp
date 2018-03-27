'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tweet = function () {
    function Tweet(props) {
        _classCallCheck(this, Tweet);

        this.name = props.username;
        this.text = props.text;
        this.id = props._id;
        this.delete = this.delete.bind(this);
    }

    _createClass(Tweet, [{
        key: 'delete',
        value: function _delete() {
            var _this = this;

            fetch('https://twitter-nave-api.herokuapp.com/tweets/' + this.id, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*' }
            }).then(function () {
                return _this.tweet.remove();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var tweet = document.createElement("li");
            var user = document.createElement("span");
            var deleteButton = document.createElement("button");
            var text = document.createElement("p");
            var div = document.createElement("div");
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
    }]);

    return Tweet;
}();

var TweetList = function () {
    function TweetList(props) {
        _classCallCheck(this, TweetList);

        this.container = document.getElementById(props.tweetsContainer);
    }

    _createClass(TweetList, [{
        key: 'getTweets',
        value: function getTweets() {
            return new Promise(function (resolve, reject) {
                fetch('https://twitter-nave-api.herokuapp.com/tweets').then(function (response) {
                    response.json().then(function (data) {
                        resolve(data);
                    });
                }).catch(function (error) {
                    return reject(error);
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var tweetsData = this.getTweets();
            tweetsData.then(function (resp) {
                var html = resp.map(function (t) {
                    var tweet = new Tweet(t);
                    return tweet.render();
                });
                html.forEach(function (el) {
                    return _this2.container.appendChild(el);
                });
            });
        }
    }]);

    return TweetList;
}();

var TweetForm = function () {
    function TweetForm(props) {
        _classCallCheck(this, TweetForm);

        this.form = document.getElementById(props.form);
        this.container = document.getElementById(props.tweetsContainer);
        this.form.onsubmit = this.onSubmit.bind(this);
    }

    _createClass(TweetForm, [{
        key: 'onSubmit',
        value: function onSubmit(e) {
            e.preventDefault();
            this.text = document.forms["create-tweet"]["tweet"].value;
            if (this.text) this.add();
        }
    }, {
        key: 'add',
        value: function add() {
            var _this3 = this;

            this.postData('https://twitter-nave-api.herokuapp.com/tweets').then(function (data) {
                var tweet = new Tweet(data);
                document.forms["create-tweet"]["tweet"].value = "";
                _this3.container.append(tweet.render());
            });
        }
    }, {
        key: 'postData',
        value: function postData(url) {
            return fetch(url, {
                body: JSON.stringify({ text: this.text }),
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*' }
            }).then(function (response) {
                return response.json();
            });
        }
    }]);

    return TweetForm;
}();

var tweetsContainer = 'tweets-container';
var form = 'tweet-form';
var list = new TweetList({ tweetsContainer: tweetsContainer });
var tweetForm = new TweetForm({
    form: form,
    tweetsContainer: tweetsContainer
});

list.render();
