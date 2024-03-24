const router = require('express').Router();
const controller = require('../controllers/users.controllers');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/verify_token', controller.verify_token);
router.post('/add_to_watchlist', controller.add_to_watchlist)
router.post('/get_watchlist', controller.get_watchlist)
router.post('/remove_from_watchlist', controller.remove_from_watchlist)
module.exports = router;
