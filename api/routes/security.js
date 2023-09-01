const { Router } = require('express');
const SecurityController = require('../controllers/securityController');


const router = Router();

router
    .post('/security/acl', SecurityController.registerAcl)
    .post('/security/permission-roles', SecurityController.registerPermissionRoles);

module.exports = router;
