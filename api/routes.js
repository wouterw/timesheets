var _ = require('lodash-node');

module.exports = function(server) {
  server.namespace('/api', function() {

    server.post('/token', function(req, res) {
      var username = req.param('username');
      var password = req.param('password');

      if (username !== 'foo' || password !== 'bar') {
        return res.send({ error: 'unauthorized' }, 401);
      }

      var response = {
        'access_token': 'abcdefghijklmnopqrstuvwxyz',
        'token_type': 'bearer'
      };

      return res.send(response, 201);
    });

    server.get('/projects', function(req, res) {
      var records = db.find('projects');
      res.send({ projects: records }, 200);
    });

    server.get('/projects/:id', function(req, res) {
      var record = db.find('projects', req.params.id);
      res.send({ project: record }, 200);
    });

    server.post('/projects', function(req, res) {
      var record = db.create('projects', req.body.project);
      res.send({ project: record }, 201);
    });

  });
};


var db = {
  records: {},

  find: function(type, id) {
    if (id === undefined) {
      return this.records[type];
    }

    var records = this.records[type].filter(function(item){
      return item.id === id;
    });

    return records[0];
  },

  create: function(type, obj) {
    _.extend(obj, { "id": this._sequenzer(type) });
    this.records[type].push(obj);
    return obj;
  },

  _sequenzer: function(type) {
    var ids = this.records[type].map(function(record) {
      return record.id;
    });

    return Math.max.apply(Math, ids) + 1;
  }
};


db.records.projects = [
  {
    "id": 1,
    "name": "Project X"
  },
  {
    "id": 2,
    "name": "Project Y"
  },
];
