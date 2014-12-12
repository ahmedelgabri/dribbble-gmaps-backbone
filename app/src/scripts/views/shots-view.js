var config   = require('../config.json');
var Backbone = require('backbone');
var _        = require('lodash');
var $        = require('jquery');
var gmaps    = require('google-maps');
// var geocoder = require('geocoder');
var shotsCollection    = require('../collections/shots-collection');
var shotsModel    = require('../models/shots-model');

Backbone.$ = $;

var shotsView = Backbone.View.extend({
  el: $('.app'),

  initialize: function() {
    var map;

    gmaps.load(function(google) {
      var mapOptions = {
        center: new google.maps.LatLng(17.2145731,26.4016914)
      };

      map = new google.maps.Map(document.querySelector('.app'), mapOptions);
    });


    this.collection.bind('add', function(model) {
      gmaps.load(function(google) {
        var m = JSON.stringify(model),
            loc = m.user.location;
            console.log(loc);
        // geocoder.geocode(m, function(err, data) {
        //   console.log(data);
        // });
        // Stores the tweet's location
        // var position = new google.maps.LatLng( model.get('geo').coordinates[0], model.get('geo').coordinates[1]);

        // // Creates the marker
        // var marker = new google.maps.Marker({
        //   position: position,
        //   map: map,
        //   title: model.from_user,
        //   description: model.text
        // });
      });
   });
  }
});

module.exports = shotsView;


