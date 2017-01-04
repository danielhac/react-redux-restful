// Using 'require' instead of 'imports' because ES6 doesn't support dynamic imports
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureStore.prod');
} else {
    module.exports = require('./configureStore.dev');
}