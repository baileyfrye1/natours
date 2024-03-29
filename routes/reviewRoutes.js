const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const Review = require('../models/reviewModel');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(authController.protect, reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview,
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    authController.ownedByUser(Review),
    reviewController.deleteReview,
  );
module.exports = router;
