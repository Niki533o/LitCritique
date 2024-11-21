const { auth, db } = require('../firebase');

// POST /reviews: Create a new book review
const addBookReview = async (req, res) => {
    const { title, author, rating, reviewText, username, timestamp } = req.body;
    
    if (!title || !author || !rating || !reviewText || !username || !timestamp) {
        return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const docRef = await db.collection("bookReviews").add({
        title,
        author,
        rating,
        reviewText,
        username,
        timestamp,
      });
      res.status(201).json({ message: "Review created successfully", id: docRef.id });
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Error creating review" });
    }
 };
  
  // GET /reviews: Retrieve all book reviews
  const getAllBookReviews = async (req, res) => {
    try {
      const snapshot = await db.collection("bookReviews").get();
      const reviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Error fetching reviews" });
    }
  };

  // GET /reviews/user/:uid: Retrieve all book reviews by the UID
  const getReviewsByUid = async (req, res) => {
    const { uid } = req.params; 
  
    try {      
      const userRecord = await auth.getUser(uid);  
      const username = userRecord.displayName;  
  
      const reviewsSnapshot = await db.collection('bookReviews').where('username', '==', username).get();
  
      if (reviewsSnapshot.empty) {
        console.log("No reviews found for this user");
        return res.status(404).json({ message: "No reviews found for this user" });
      }
  
      const reviews = reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(reviews);  
    } catch (error) {
      console.error("Error fetching reviews:", error);  
      res.status(500).json({ message: "Error fetching reviews" });
    }
  }; 
  
  // GET /reviews/:id: Retrieve a review by specific id
  const getBookReviewById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const docRef = db.collection("bookReviews").doc(id);
      const doc = await docRef.get();
  
      if (!doc.exists) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
      console.error("Error fetching review:", error);
      res.status(500).json({ message: "Error fetching review" });
    }
  };
  
  // PUT /reviews/:id: Update an existing review
  const updateBookReview = async (req, res) => {
    const { id } = req.params;
    const {rating, reviewText, timestamp } = req.body;
  
    try {
      const docRef = db.collection("bookReviews").doc(id);
      const doc = await docRef.get();
  
      if (!doc.exists) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      await docRef.update({
        rating,
        reviewText,
        timestamp,
      });
  
      res.status(200).json({ message: "Review updated successfully" });
    } catch (error) {
      console.error("Error updating review:", error);
      res.status(500).json({ message: "Error updating review" });
    }
  };
  
  // DELETE /reviews/:id: Delete a review by id
  const deleteBookReview = async (req, res) => {
    const { id } = req.params;
  
    try {
      const docRef = db.collection("bookReviews").doc(id);
      const doc = await docRef.get();
  
      if (!doc.exists) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      await docRef.delete();
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ message: "Error deleting review" });
    }
  };
  
  module.exports = {
    addBookReview,
    getAllBookReviews,
    getBookReviewById,
    updateBookReview,
    deleteBookReview,
    getReviewsByUid
  };