import React, { useState, useEffect } from "react"; 
import { auth} from '../firebase';  
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import "./EditReview.css"; 

const EditReview = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate("/login");  
    }

    const fetchReviewData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/reviews/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch review data");
          }
          const review = await response.json();
          setTitle(review.title); 
          setAuthor(review.author); 
          setRating(review.rating);
          setReviewText(review.reviewText);
        } catch (error) {
          console.error("Error fetching review:", error);
          alert("Error loading review data. Please try again.");
        }
      };
      fetchReviewData();
  }, [id, navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedReviewData = {
      rating,
      reviewText,
      timestamp: new Date().toLocaleString(), 
    };

    try {
      const response = await fetch(`http://localhost:5000/reviews/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReviewData),
      });

      if (response.ok) {
        alert("Review updated successfully!");
        navigate("/my-reviews"); 
      } else {
        throw new Error("Failed to update review");
      }
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Error updating review. Please try again.");
    }
  };

  return (
    <div className="edit-review-container">
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
        <h3>Edit Review</h3>
        <p>Make changes to your review below</p>
        <form className="review-form" onSubmit={handleEdit}> 
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title} 
              readOnly 
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              value={author} 
              readOnly 
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
              placeholder="Edit your review here"
              value={reviewText} 
              onChange={(e) => setReviewText(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );  
};

export default EditReview;