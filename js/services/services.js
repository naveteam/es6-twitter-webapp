export const fetchTweets = () => new Promise((resolve, reject) => {
    fetch('https://twitter-nave-api.herokuapp.com/tweets')
        .then(response => {
            response.json().then((data) => {
                resolve(data);
            });
        })
        .catch(error => reject(error));
});

export const postTweet = (text) => new Promise((resolve, reject) => {
    fetch('https://twitter-nave-api.herokuapp.com/tweets', {
        body: JSON.stringify({ text }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        }
    })
        .then(response => {
            response.json().then((data) => {
                resolve(data);
            });
        })
        .catch(error => reject(error));
});

export const deleteTweet = (id) => new Promise((resolve, reject) => {
    fetch(`https://twitter-nave-api.herokuapp.com/tweets/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*'
            }
        })
        .then(() => resolve())
        .catch(error => reject(error));
});