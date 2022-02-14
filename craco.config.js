const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#ff889c",
              "@link-color": "rgba(0, 0, 0, 0.8)",
              "@font-size-base": "15px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};