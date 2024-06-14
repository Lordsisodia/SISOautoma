process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.ASSET_PATH = '/';

try {
  /* eslint-disable no-console */
  console.log('Attempting to require webpack...');
  // Disable eslint rule for global require
  // eslint-disable-next-line global-require
  const webpack = require('../node_modules/webpack');
  console.log('Webpack successfully required:', webpack.version);
  // eslint-disable-next-line global-require
  const config = require('../webpack.config');
  console.log('Webpack config loaded:', JSON.stringify(config, null, 2));
  /* eslint-enable no-console */

  delete config.chromeExtensionBoilerplate;

  config.mode = 'production';

  webpack(config, function (err, stats) {
    if (err) {
      /* eslint-disable no-console */
      console.error('Webpack build error:', err);
      /* eslint-enable no-console */
      throw err;
    }
    /* eslint-disable no-console */
    console.log(stats.toString({ colors: true }));
    /* eslint-enable no-console */
  });
} catch (error) {
  /* eslint-disable no-console */
  console.error('Build script error:', error);
  /* eslint-enable no-console */
  process.exit(1);
}
