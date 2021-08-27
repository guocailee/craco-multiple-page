# craco-multiple-pages



##  Usage

```javascript

const CracoMultiplePage = require('./plugins/index')

module.exports = {
  plugins: [
    {
      plugin: CracoMultiplePage,
      options: {
        pages: [
          {
            name: 'index',
            template: './src/pages/auth/index.html',
            entry: './src/pages/auth/index.tsx',
          },
          {
            name: 'app',
            template: './src/pages/app/index.html',
            entry: './src/pages/app/index.tsx',
          },
        ],
      },
    },
  ]
}
```