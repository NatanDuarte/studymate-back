const App = require('./src/app');


const port = process.env.PORT;
const callbackMessage = `Application up: http://localhost:${port}/api-docs`

App().listen(
    port,
    () => console.log(callbackMessage)
);
