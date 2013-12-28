export default DS.Model.extend({
  name: DS.attr(),

  status: function() {
    return "0h";
  }.property()
});
