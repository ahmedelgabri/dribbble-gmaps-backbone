var $                 = require('jquery');
var Backbone          = require('backbone');
var _                 = require('lodash');

var popularCollection = require('../collections/popular.collection');
var popularView       = require('../views/popular.view');

var shotsCollection   = require('../collections/shots.collection');
var shotsView         = require('../views/shot.view');

var userShotsCollection   = require('../collections/user-shots.collection');

var userCollection    = require('../collections/users.collection');
var userView          = require('../views/user.view');

Backbone.$ = $;

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'shot/:id': 'shotDetails',
    'user/:id': 'userDetails'
  },

  template: {
    app: $('.app')
  },

  index: function() {
    var collection = new popularCollection();
    var view;
    var self = this;
    collection.fetch({
      success: function(data) {
        view = new popularView({ collection: data });
        self.template.app.html(view.render().el);
      }
    });
  },

  shotDetails: function(id) {
    var collection = new shotsCollection(id);
    var view;
    var self = this;
    collection.fetch({
      success: function(data){
        view = new shotsView({ collection: data });
        self.template.app.html(view.render().el);
      }
    });
  },

  userDetails: function(id) {
    var user = new userCollection(id);
    var userShots = new userShotsCollection(id);
    var view;
    var self = this;
    var complete = _.invoke([user, userShots], 'fetch');

    //when all of them are complete...
    $.when.apply($, complete).done(function(user, userShots) {
       //all ready and good to go...

      view = new userView({ collection: user[0], shots: userShots[0] });
      self.template.app.html(view.render().el);
    });
  }
});

module.exports = Router;
