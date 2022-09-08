# craco-multiple-pages

## Install
```bash
# npm 
npm install -D craco-multiple-page
# or yarn
yarn add craco-multiple-page -D
```

##  Usage


```javascript
// define in craco config file, such like: craco.config.{js, ts}
const CracoMultiplePage = require('craco-multiple-page')
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