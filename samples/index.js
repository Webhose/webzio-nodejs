'use strict';

const webzio = require('../webzio.js');

const client = webzio.config({token: '670f37a4-2e44-49be-afbb-10a92a25c664'});

client.query('filterWebData', {q: '\"stock market\" language:english'})
  .then(output => {

    console.log(output['posts'][0]['text']); // Print the text of the first post
    console.log(output['posts'][0]['published']); // Print the publication date of the first post 
});

// Get the next batch of posts
client.getNext()
  .then(output => {
    console.log(output['posts'][0]['thread']['site']);
    console.log(output['posts'][0]['published']);
  });




