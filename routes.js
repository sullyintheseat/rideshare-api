const fs = require('fs');

module.exports.routes = app => {
  let routes = [];
  fs.readdirSync('./controls').forEach(file => {
    if (file.substr(-3) === '.js' && file.substr(-7) !== 'spec.js') {
      require('./controls/' + file).controller(app);
      routes.push('./controls/' + file);
    }
  });
}
