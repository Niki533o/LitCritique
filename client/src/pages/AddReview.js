import React, { useState, useEffect } from "react";
import { auth} from '../firebase';  
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import "./AddReview.css";  

const AddReview = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate("/login");  
    }
  }, [navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
        title,
        author,
        rating,
        reviewText,
        username: user.displayName, 
        timestamp: new Date().toLocaleString(),
      };
    try {
       
      // POST request to the backend API to add the review
      const response = await fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      console.log("Response:", response);

      if (response.ok) {
        alert("Review submitted successfully!");
        setTitle("");
        setAuthor("");
        setRating(0);
        setReviewText("");
        navigate("/home");
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Error submitting review. Please try again.");
    }
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  return (
    <div className="add-review-container">
      <div className="top-panel">
        <div className="left-section">
            <Link to="/home" className="litcritique-link">
            <h1>LitCritique</h1>
            </Link>
        </div>
        <div className="right-section">
          <div className="hamburger-menu" onClick={toggleMenu}>
            ☰
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="dropdown-menu show">
          <ul>
            <li><Link to="/my-reviews">My Reviews</Link></li>
            <li><Link to="/login">Logout</Link></li>
          </ul>
        </div>
      )}

      <div className="glass-card">
        <h3>Write a Review</h3>
        <p>Share your thoughts about your favorite book!</p>

        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              placeholder="Enter book title"
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              placeholder="Enter author name"
              value={author} 
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Rating:</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating ? "selected" : ""}`}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reviewText">Review:</label>
            <textarea
              id="reviewText"
              placeholder="Write your review here"
              value={reviewText} 
              onChange={(e) => setReviewText(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;