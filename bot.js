const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const twit = require('twit')
const config = require('./config.js')
const fs = require('fs')

// initializing the whole shabang

const Twitter = new twit(config)

app.use(bodyParser())

// reading from the data

const hashtags = fs.readFile('./hashtags.json', "utf8", (err, data) => {
    if (err) {
        console.err(err)
    } else {
        init(data)
    }
})

// entering the data




    retweet = function(data) {
        const theData = JSON.parse(data)
        theData.hashtags.forEach(item => {
            const theHashTag = item.tag
            const params = {
                q: theHashTag,
                result_type: 'recent'
            }


// retweet function (inside previous function)

        Twitter.get('search/tweets', params, function(err, data) {

            // if there no errors
            if (!err) {
                // grab ID of tweet to retweet
                const retweetId = data.statuses[0].id_str
                // Tell TWITTER to retweet
                Twitter.post('statuses/retweet/:id', {
                    id: retweetId
                }, function(err, response) {
                    // if there was an error while tweeting
                    if (err) {
                        console.log('Error retweeting, check for duplicates')
                    }
                    if (response) {
                        console.log('Retweet successful')
                    }
                });
            }
            // if unable to Search a tweet
            else {
                console.log('Error searching - try again')
            }
        })
    })
}


// connect to server

app.listen(3000, function() {
    console.log('app listening on post 3000')
})

// execute

const init = function(data) {
    setInterval(function(){retweet(data) 
    }, 60000)
}

app.get('/', function(req, res)  {
    console.log('blah')
})
