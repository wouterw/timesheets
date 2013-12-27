module.exports = function(server) {
  server.namespace('/api', function() {

    server.post('/sessions', function(req, res) {
      var email = req.param('email');
      var password = req.param('password');

      if (email !== 'medufy' || password !== 'foobar') {
        return res.send({ errors: 'unauthorized' }, 401);
      }

      var session = {
        'user_session': {
          'access_token': 'abcdefghijklmnopqrstuvwxyz'
        }
      };

      return res.send(session, 201);
    });

    server.get('/projects', function(req, res) {
      var records = db.find('projects');
      res.send({ projects: records });
    });

    server.get('/projects/:id', function(req, res) {
      var record = db.find('projects', req.params.id);
      res.send({ project: record });
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
  }
};


db.records.projects = [
  {
    "id": 1,
    "name": "Project X",
    "description": ""
  },
  {
    "id": 2,
    "name": "Project Y",
    "description": ""
  },
];
