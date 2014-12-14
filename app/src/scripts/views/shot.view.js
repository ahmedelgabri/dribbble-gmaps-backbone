var Backbone = require('backbone');
var _        = require('lodash');
var $        = require('jquery');

Backbone.$ = $;

var shotView = Backbone.View.extend({
  className: 'main-wrapper',

  template: $('#shot-view').html(),

  initialize: function() {
    this.render();
  },

  render: function() {
    var self = this;
    var shotsViewTemplate;

    this.collection.forEach(function(shot){
      shotsViewTemplate = _.template(self.template, {shot: shot.attributes });
      self.$el.html(shotsViewTemplate);
    });

    return this;
  }
});

module.exports = shotView;


