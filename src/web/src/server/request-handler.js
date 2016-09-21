import { prepareStore, prepareRender } from './services/react-service';

const handleRedirect = (res, { pathname }) => {
  res.writeHead(301, {
    Location: pathname,
  });
  res.end();
};

const handle404 = res => {
  res.writeHead(404);
  res.write('404');
  res.end();
};

export default (req, res) => {
  const location = req.url;
  const store = prepareStore({ conferences: [], pages: {} });
  const {
    html,
    state,
    result: { redirect, missed },
  } = prepareRender({ store, location });

  if (redirect) {
    handleRedirect(res, redirect);
    return;
  }

  if (missed) {
    handle404(res);
    return;
  }

  res.render('index', { state, html });
};
