# Express minimal boilerplate
A lightweight and simple boilerplate for using Express with ES6+ syntax via babel.

Features:
 - Morgan logger
 - Helmet
 - Simple file structure & example code
## Installation
```bash
mkdir my-app && cd "$_"
git clone https://github.com/tommitchelmore/express-minimal-boilerplate.git .
echo "PORT=3000" > .env
yarn install
```
## Usage
To run the app, simply use `yarn dev`.  To build a production ready, minified version, simply use `yarn build` and `yarn serve` to serve it.
The production app is built to `./dist`

## Usage with SPAs (React, Vue, etc)
In the main route file, simply replace:
```js
router.get('/', (req, res) => {
    res.send("Hello!")
})
```
With the following (Assumes that the SPA's build directory is `./client/build`):
```js
router.get('*', (req, res) => {
    res.sendFile('index.html', { root: resolve(__dirname, './../client/build') })
})
```
Note that you need to import `resolve` from the Path module.