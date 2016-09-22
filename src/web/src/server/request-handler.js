import { prepareStore, prepareRender } from './services/react-service';

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
    .then(({ html, state, result: { redirect } }) => {
      if (redirect) {
        handleRedirect(res, redirect);
        return;
      }

      res.render('index', { state, html });
    })
    .catch(next);
};
