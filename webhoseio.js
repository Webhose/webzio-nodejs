'use strict';

require('isomorphic-fetch');
require('es6-promise').polyfill();

exports.config = function (options) {
  return new WebhoseioClient(options);
};

function WebhoseioClient(options) {
  options = options || {};
  if (!options.token) {
    throw new Error(`Missing required argument 'token'.`);
  }
  this.options = {
    token: options.token,
    format: options.format || 'json'
  };
}

function getQuery(obj) {
  const keys = Object.keys(obj);
  if(keys.length === 0) {
    return '';
  }
  return '?' + keys.map(p => encodeURIComponent(p) + '=' + encodeURIComponent(obj[p])).join('&');
}


WebhoseioClient.prototype.query = function (endpoint, params) {
  this.nextUri = 'https://webhose.io/' + endpoint + getQuery(Object.assign({}, this.options, params));
  return this.getNext();
};

WebhoseioClient.prototype.getNext = function () {
  return fetch(this.nextUri)
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      this.nextUri = 'https://webhose.io' + data.next;
      return data;
    })
    .catch(error => {
      console.log('request failed', error);
      return error;
    });
};
