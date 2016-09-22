import { prepareStore, prepareRender } from './services/react-service';
import { fetchConferencesIfNeeded } from '../common/actions';

const handleRedirect = (res, { pathname }) => {
  res.writeHead(301, {
    Location: pathname,
  });
  res.end();
};

export default (req, res, next) => {
  const location = req.url;
  const store = prepareStore({ conferences: [], pages: {} });

  prepareRender({ store, location })
    .then(({ html, state, result: { redirect, missed } }) => {
      if (redirect) {
        handleRedirect(res, redirect);
        return;
      }

      res.render('index', { state, html });
    })
    .catch(next);
  // if (!missed) {
  //   store.dispatch(fetchConferencesIfNeeded(1))
  //     .then(() => {
  //       res.render('index', prepareRender({ store, location }));
  //     });
  // } else {
  // }
};
