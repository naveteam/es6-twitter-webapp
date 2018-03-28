export const fetchTweets = () => new Promise((resolve, reject) => {
    fetch('https://twitter-nave-api.herokuapp.com/tweets')
        .then(response => {
            response.json().then((data) => {
                resolve(data);
            });
        })
        .catch(error => reject(error));
}) 