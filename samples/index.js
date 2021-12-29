'use strict';

const webzio = require('../webzio.js');

const client = webzio.config({ token: '670f37a4-2e44-49be-afbb-10a92a25c664' });

client.query('filterWebData', {q: 'github'})
  .then(output => {
    console.log(output['posts'][0]['text']);
    console.log(output['posts'][0]['published']);
});

client.getNext()
  .then(output => {
    console.log("--------------------");
    console.log(output['posts'][0]['thread']['site']);
    console.log(output['posts'][0]['published'])
  });



