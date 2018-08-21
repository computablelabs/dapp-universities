const routes = require('next-routes');

module.exports = routes()
  .add('listings', 'listings/:query')
  .add('search-terms');

