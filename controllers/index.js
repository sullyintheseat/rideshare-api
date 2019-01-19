const IndexController = {

  test: async(req, res) => {
    res.send('test');
  },
}

module.exports.Controller = IndexController;
module.exports.controller = (app) => {
  app.get('/', IndexController.test);
}
