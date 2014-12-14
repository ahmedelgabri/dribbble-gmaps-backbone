var Backbone = require('backbone');
var _        = require('lodash');
var $        = require('jquery');
var gmaps    = require('google');

Backbone.$ = $;

var popularView = Backbone.View.extend({
  className: 'popular-map',

  template: $('#shot-popup').html(),

  initialize: function() {
    var mapOptions = {
      zoom: 3,
      center: new google.maps.LatLng(17.21, 26.40),
      mapTypeControl: false,
      streetViewControl: false
    };
    this.map = new google.maps.Map(this.el, mapOptions);
    this.render();
  },

  render: function() {
    var self = this;
    var bounds = new google.maps.LatLngBounds();
    var geocoder = new google.maps.Geocoder();

    this.collection.forEach(function(model) {
      var loc = model.attributes.user.location;
      var coord;


      var infowindow = new google.maps.InfoWindow({
        content: _.template(self.template, {shot: model.attributes })
      });

      geocoder.geocode({ 'address': loc }, function(res, status) {
        if(res) {
          coord = res[0].geometry.location;
          // Stores the shot's location
          var position = new google.maps.LatLng( coord.k, coord.D);

          // Creates the marker
          var marker = new google.maps.Marker({
            position: position,
            map: self.map,
            title: model.attributes.title
            // description: model.attributes.description
          });

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(self.map, marker);
          });

          bounds.extend(position);
        }
        self.map.fitBounds(bounds);
      });
    });

    return this;
  }
});

module.exports = popularView;


