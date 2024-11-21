import React, { useState, useEffect } from "react";
import { auth} from '../firebase';  
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import "./MyReviews.css";  

const MyReviews = () => {
  
    const [user, setUser] = useState(null);
    const [menuVisible, setMenuVisible] = useState(null); 
    const [myReviews, setMyReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataFetched, setDataFetched] = useState(false); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

   useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setLoading(false);
    }
    const fetchReviews = async () => {
        try {
            if (currentUser) {
              const uid = currentUser.uid;  
                  const response = await fetch(`http://localhost:5000/reviews/user/${uid}`);
              
              if (!response.ok) {
                throw new Error('Failed to fetch reviews');
              }
    
              const data = await response.json();  
              setMyReviews(data);  
            }
          } catch (error) {
            console.error("Error fetching reviews:", error);
          } finally {
            setDataFetched(true); 
            setLoading(false); 
        }
    };

    fetchReviews(); 
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ellipsisMenu = (id) => {
    setMenuVisible(menuVisible === id ? null : id); 
  };

  const handleEdit = (id) => {
    navigate(`/edit-review/${id}`);
  };

  const handleDelete = async (id) => {
    console.log('Deleting review:', id);
  
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        // DELETE request to the backend API
        const response = await fetch(`http://localhost:5000/reviews/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          alert("Review deleted successfully!");
          setMyReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
        } else {
          throw new Error("Failed to delete review");
        }
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Error deleting review. Please try again.");
      }
    }
  };

  return (
    <div className="my-review-container">
      <div className="top-panel">
        <div className="left-section">
            <Link to="/home" className="litcritique-link">
            <h1>LitCritique</h1>
            </Link>
        </div>
        <div className="right-section">
          <Link to="/add-review" className="add-review-link">
            Add Review
          </Link>
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

      {/* Page Content */}
      <div className="content">
                <div className="reviews-container">
                    {dataFetched && myReviews.length === 0 ? (
                        <p>No reviews found.</p> 
                    ) : (
                        myReviews.map((review) => (
                            <div key={review.id} className="bottom-glass-card">
                                <h3>{review.title}</h3>
                                <p><strong>Author:</strong> {review.author}</p>
                                <p><strong>Rating:</strong> {review.rating}</p>
                                <p><strong>Review:</strong> {review.reviewText}</p>
                                <p><strong>Submitted by:</strong> {review.username}</p>
                                <p><strong>Posted on:</strong> {review.timestamp}</p>

                                <div className="menu-icon" onClick={() => ellipsisMenu(review.id)}>
                                    &#8226; 
                                    &#8226; 
                                    &#8226; 
                                </div>

                                {menuVisible === review.id && (
                                    <div className="menu-options">
                                        <button onClick={() => handleEdit(review.id)}>Edit</button>
                                        <button onClick={() => handleDelete(review.id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyReviews;