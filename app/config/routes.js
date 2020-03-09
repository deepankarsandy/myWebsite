// eslint-disable-next-line new-cap
const routes = require('express').Router();

routes.get('/', (req, res, _next) => {
  res.render('layouts/home_layout', { body: { title: 'Express' } });
  // next();
});

routes.get('/about', (req, res, _next) => {
  res.render('layouts/about_layout', { body: { title: 'Express' } });
});

module.exports = routes;
