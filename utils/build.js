process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.ASSET_PATH = '/';

try {
  const webpack = require('webpack'); // Add /* eslint-disable-line global-require */
  const config = require('../webpack.config'); // Add /* eslint-disable-line global-require */

  delete config.chromeExtensionBoilerplate;

  config.mode = 'production';

  webpack(config, function (err, stats) {
    if (err) {
      console.error('Webpack build error:', err); // Add /* eslint-disable-line no-console */
      throw err;
    }
    console.log(stats.toString({ colors: true })); // Add /* eslint-disable-line no-console */
  });
} catch (error) {
  console.error('Build script error:', error); // Add /* eslint-disable-line no-console */
  process.exit(1);
}
