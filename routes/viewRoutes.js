const express = require('express');
const viewsController = require('../controllers/viewsController');
const { isLoggedIn, protect } = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/me', protect, viewsController.getAccount);
router.post('/submit-user-data', protect, viewsController.updateUserData);
router.get('/my-tours', protect, viewsController.getMyTours);

router.use(isLoggedIn);
router.get('/', viewsController.getOverview);
router.get('/tour/:slug', viewsController.getTour);
router.get('/login', viewsController.getLoginForm);
router.get('/sign-up', viewsController.getSignUpForm);

module.exports = router;
