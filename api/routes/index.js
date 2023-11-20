const bodyParser = require('body-parser');

const user = require('./UsersRoute');
const auth = require('./authRoute');
const roles = require('./rolesRoute');
const permission = require('./permissionRoute');
const healthCheck = require('./healthCheckRoute');
const security = require('./security');
const room = require('./roomRoute');
const liveKitAuth = require('./liveKitAuth');


module.exports = app => {
    app.use(
        bodyParser.json(),
        healthCheck,
        auth,
        liveKitAuth,
        user,
        roles,
        security,
        permission,
        room
    )
}
