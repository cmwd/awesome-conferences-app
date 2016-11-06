import { prepareRender } from './services/react-service';

const handleRedirect = (res, { pathname }) => {
  res.writeHead(301, {
    Location: pathname,
  });
  res.end();
};

const requestHandler = () =>
  (req, res, next) => {
    const location = req.url;
    const preloadedState = {
      user: req.pocket.get('user') || { loggedIn: false },
    };

    prepareRender({ location, preloadedState })
      .then(({ html, state, result: { redirect } }) => {
        if (redirect) {
          handleRedirect(res, redirect);
          return;
        }

        res.render('index', { state, html });
      })
      .catch(next);
  };

export default requestHandler;
