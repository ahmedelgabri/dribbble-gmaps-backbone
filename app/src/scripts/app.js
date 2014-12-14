var Backbone = require('backbone');
var $ = require('jquery');
var Router = require('./routes/router');

Backbone.$ = $;

var router = new Router();

document.addEventListener('DOMContentLoaded', function(e){
  Backbone.history.start();
}, false);
