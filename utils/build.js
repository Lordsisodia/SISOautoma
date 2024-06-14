// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.ASSET_PATH = '/';

try {
  const webpack = require('webpack');
  const config = require('../webpack.config');

  delete config.chromeExtensionBoilerplate;

  config.mode = 'production';

  webpack(config, function (err, stats) {
    if (err) {
      console.error('Webpack build error:', err);
      throw err;
    }
    console.log(stats.toString({ colors: true }));
  });
} catch (error) {
  console.error('Build script error:', error);
  process.exit(1);
}
