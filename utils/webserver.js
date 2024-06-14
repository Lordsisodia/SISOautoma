// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = process.env.NODE_ENV || 'development';
process.env.ASSET_PATH = '/';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const env = require('./env');
const config = require('../webpack.config');

if (process.env.NODE_ENV === 'development') {
  const options = config.chromeExtensionBoilerplate || {};
  const excludeEntriesToHotReload = options.notHotReload || [];

  for (const entryName in config.entry) {
    if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
      config.entry[entryName] = [
        'webpack/hot/dev-server',
        `webpack-dev-server/client?hot=true&hostname=localhost&port=${env.PORT}`,
      ].concat(config.entry[entryName]);
    }
  }

  config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(
    config.plugins || []
  );
  delete config.chromeExtensionBoilerplate;

  const compiler = webpack(config);
  const server = new WebpackDevServer(
    {
      https: false,
      hot: false,
      client: false,
      host: '0.0.0.0', // bind to all interfaces
      port: env.PORT || 3000, // use the PORT environment variable
      static: {
        directory: path.join(__dirname, '../build'),
      },
      devMiddleware: {
        publicPath: `http://localhost:${env.PORT}/`,
        writeToDisk: true,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      allowedHosts: 'all',
    },
    compiler
  );

  if (module.hot) {
    module.hot.accept();
  }

  (async () => {
    await server.start();
  })();
} else {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Serve static files from the 'build' directory
  app.use(express.static(path.join(__dirname, '../build')));

  // Serve the main HTML file for the root URL
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}
