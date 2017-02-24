'use strict';

const webhoseio = require('../src/webhose');

const client = webhoseio.config({token: '61b50ab2-2f53-43f8-8b89-59ad8a5e83bd'});

client.query('filterWebData', {q: 'github'})
  .then(output => {
    console.log(output['posts'][0]['text']);
    console.log(output['posts'][0]['published']);
});

client.getNext()
  .then(output => {
    console.log(output['posts'][0]['thread']['site']);
  });
