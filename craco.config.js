const CracoScopedCssPlugin = require("craco-plugin-scoped-css");
const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

    plugins: [
        {
            plugin: CracoScopedCssPlugin,
        },
    ],
};