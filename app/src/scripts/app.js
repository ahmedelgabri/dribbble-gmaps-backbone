// https://api.dribbble.com/v1/shots?access_token=7e7eaa80824b2c13b545206b88fe3fc42759285f93a91ca0ccb3ff53939e4697&list=popular&per_page=12
var $               = require('jquery');
var Backbone        = require('backbone');
// var gmaps        = require('google-maps');
var _               = require('lodash');
var shotsCollection = require('./collections/shots-collection');
var shotsView       = require('./views/shots-view');

Backbone.$ = $;

document.addEventListener('DOMContentLoaded', function(e){
  // some init stuff here
  var collection = new shotsCollection();

  collection.fetch({
    success: function(data) {
      var view = new shotsView({ collection: data});
      // $('.app').append(view.render().el);
    }
  });
}, false);


// gmaps.load(function(google) {
//   var mapOptions = {
//     zoom: 10,
//     center: new google.maps.LatLng(-33.9, 151.2)
//   };
//   new google.maps.Map(document.querySelector('.app'), mapOptions);
// });

