webhose.io client for Node.js
============================

[![npm version](https://img.shields.io/npm/v/webhoseio.svg?style=flat-square)](https://www.npmjs.com/package/webhoseio)
[![npm downloads](https://img.shields.io/npm/dm/webhoseio.svg?style=flat-square)](https://www.npmjs.com/package/webhoseio)

A simple way to access the [Webhose.io](https://webhose.io) API from your Node.js code

```javascript
const webhoseio = require('webhoseio');

const client = webhoseio.config({token: 'YOUR_API_KEY'});
client.query('filterWebData', {q: 'github'})
  .then(output => {
    console.log(output['posts'][0]['text']); // Print the text of the first post
    console.log(output['posts'][0]['published']); // Print the text of the first post publication date
});

// Get the next batch of posts
client.getNext()
  .then(output => {
    console.log(output['posts'][0]['thread']['site']); // Print the site of the first post
  });
```

API Key
-------

To make use of the webhose.io API, you need to obtain a token that would be
used on every request. To obtain an API key, create an account at
https://webhose.io/auth/signup, and then go into
https://webhose.io/dashboard to see your token.


Installing
----------
You can install using npm:

```bash
$ npm install webhoseio
```

Use the API
-----------

To get started, you need to import the library, and set your access token.
(Replace `YOUR_API_KEY` with your actual API key).

```javascript
const webhoseio = require('webhoseio');

const client = webhoseio.config({token: 'YOUR_API_KEY'});
```

**API Endpoints**

The first parameter the `query()` function accepts is the API endpoint string. Available endpoints:
* `filterWebData` - access to the news/blogs/forums/reviews API
* `productSearch` - access to data about eCommerce products/services
* `darkWebAPI` - access to the dark web (coming soon)

Now you can make a request and inspect the results:

```javascript
client.query('filterWebData', {q: 'github'})
  .then(output => {
    console.log(output['totalResults']);
    // 15565094

    console.log(output['posts'].length);
    // 100

    console.log(output['posts'][0]['language']);
    // english

    console.log(output['posts'][0]['title']);
    // Putting quotes around dictionary keys in JS
});
```

For your convenience, functions `query` and `getNext` both return Promise with
one argument - the response JSON, so you can loop over it and get all the results of this batch (up to 100).

```javascript
client.query('filterWebData', {q: 'github'})
  .then(output => {
    let totalWords = output['posts'].reduce((sum, post) => {
      return sum + post['text'].split(' ').length}, 0);
    console.log(totalWords);
    // 8822
  });
```

Full documentation
------------------

* ``config({token})``

  * token - your API key

* ``query(end_point_str, params)``

  * end_point_str:
    * filterWebData - access to the news/blogs/forums/reviews API
    * productSearch - access to data about eCommerce products/services
    * darkWebAPI - access to the dark web (coming soon)
  * params: A key value dictionary. The most common key is the "q" parameter that hold the filters Boolean query. [Read about the available filters](https://webhose.io/documentation).

* ``getNext()`` - a method to fetch the next page of results.


Polling
-------

If you want to make repeated searches, performing an action whenever there are
new results, use code like this:

```javascript
const client = webhoseio.config({token: 'YOUR_API_KEY'});
let r = client.query('filterWebData', {q: 'github'});

setInterval(() => {
  r.then(output => {
    output['posts'].map(post => performAction(post));
    return client.getNext();
  });
}, 300);
```
