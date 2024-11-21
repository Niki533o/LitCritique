const express = require('express');
const {
    addBookReview,
    getAllBookReviews,
    getBookReviewById,
    updateBookReview,
    deleteBookReview,
    getReviewsByUid
  } = require('../controllers/reviewsController');

const router = express.Router();

// POST /reviews: Create a new book review
router.post('/', addBookReview);

// GET /reviews: Retrieve all book reviews
router.get('/', getAllBookReviews);

// GET /reviews/user/:uid: Retrieve all book reviews by uid
router.get('/user/:uid', getReviewsByUid);

// GET /reviews/:id: Retrieve a review by specific id
router.get('/:id', getBookReviewById);

// PUT /reviews/:id: Update an existing review
router.put('/:id', updateBookReview);

// DELETE /reviews/:id: Delete a review by id
router.delete('/:id', deleteBookReview);

module.exports = router;