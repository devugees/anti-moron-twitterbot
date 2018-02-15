const twit = require('twit')
const config = require('./config.js')
const fs = require('fs')

// initializing the whole shabang

const Twitter = new twit(config)


// reading from the data

const hashtags = fs.readFile('./hashtags.json', "utf8", (err, data) => {
    if (err) {
        console.err(err)
    }
    const theData = JSON.parse(data)
    const theHashTag = theData.hashtags[0].tag
})

// entering the data

const retweet = function() {
    const params = {
        q: theHashTag,
        result_type: 'recent',
        lang: 'en'
    }


// retweet function (inside previous function)

    Twitter.get('search/tweets', params, function(err, data) {
        // if there no errors
        if (!err) {
            // grab ID of tweet to retweet
            const retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweet successful')
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Error retweeting, check for duplicates')
                }
            });
        }
        // if unable to Search a tweet
        else {
            console.log('Error searching - try again')
        }
    })
}

// set interval and execute

setInterval(retweet, 3000000)