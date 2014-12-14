var Backbone = require('backbone');
var _        = require('lodash');
var $        = require('jquery');

Backbone.$ = $;

var userView = Backbone.View.extend({
  className: 'main-wrapper',
  template: $('#user-info').html(),

  initialize: function(options) {
    this.shots = options.shots;
    this.render();
  },

  render: function() {
    var self = this;
    var userPage = _.template(self.template, { user: this.collection, shots: this.shots  });

    self.$el.html(userPage);
    return this;
  }
});

module.exports = userView;


