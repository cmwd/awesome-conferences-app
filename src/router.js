const { dataController } = require('./controller/index');

const notFound = (req, res) => {
  const statusCode = 404;
  const status = 'ERROR';
  const message = 'Not found';

  res.status(404).json({ status, statusCode, message });
};

function Router(app) {
  app.get('/data/github', dataController.github);
  app.get('/data/twitter/:twitterScreenName', dataController.twitter);
}

module.exports = Router;
