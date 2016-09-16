
import { match } from 'react-router';
import API from '../common/services/api-service';
import routes from '../common/routes';
import { prepareStore, prepareRender } from './services/react-service';
import fetch from 'node-fetch';
import CONFIG from '../../config';

const handleRedirect = ({ res, redirectLocation }) => {
  const { pathname, search } = redirectLocation;
  res.redirect(302, pathname + search);
};
const { getConferences } = API(fetch);

const handleRender = ({ res, next, renderProps }) => {
  const current = parseInt(renderProps.params.current, 10);
  const limit = 20;
  const offset = limit * (current - 1);

  getConferences(CONFIG.BACKEND_API_URL)({ limit, offset })
    .then(prepareStore)
    .then(store => prepareRender({ store, renderProps }))
    .then(data => res.render('index', data))
    .catch(next);
};

export default (req, res, next) => {
  const expressArgs = { req, res, next };
  const location = req.url;

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      next(error);
    } else if (redirectLocation) {
      handleRedirect({ ...expressArgs, redirectLocation });
    } else if (renderProps) {
      handleRender({ ...expressArgs, renderProps });
    } else {
      next(error);
    }
  });
};
