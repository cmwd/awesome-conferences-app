
import { match } from 'react-router';
import { getConferences } from '../common/services/api-service';
import routes from '../common/routes';
import { prepareStore, prepareRender } from './services/react-service';
import fetch from 'node-fetch';

const handle500 = ({ res, error }) =>
  res.status(500).send(error.message);

const handle404 = ({ res }) =>
  res.status(404).send('Not found');

const handleRedirect = ({ res, redirectLocation }) => {
  const { pathname, search } = redirectLocation;
  res.redirect(302, pathname + search);
};

const handleRender = ({ res, renderProps }) => {
  const current = parseInt(renderProps.params.current, 10);
  const limit = 20;
  const offset = limit * (current - 1);

  getConferences(fetch)(process.env.NODE_API_URL)({ limit, offset })
    .then(prepareStore)
    .then(store => prepareRender({ store, renderProps }))
    .then(data => res.render('index', data))
    .catch(error => handle500({ res,
      error: { ...error, message: error.stack } }));
};

export default (req, res, next) => {
  const expressArgs = { req, res, next };
  const location = req.url;

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      handle500({ ...expressArgs, error });
    } else if (redirectLocation) {
      handleRedirect({ ...expressArgs, redirectLocation });
    } else if (renderProps) {
      handleRender({ ...expressArgs, renderProps });
    } else {
      handle404({ ...expressArgs });
    }
  });
};
