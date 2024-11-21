import React, { useState, useEffect } from "react";
import { auth } from '../firebase'; 
import { Link } from "react-router-dom"; 
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/reviews'); //GET request to backend
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json(); 
        setReviews(data);  
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews(); 
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value); 
  };

  const handleRatingFilterChange = (e) => {
    setRatingFilter(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);

    if (sortOption === "newest") {
      return dateB - dateA; // (newest first)
    } else {
      return dateA - dateB; // (oldest first)
    }
  });

  return (
    <div className="home-container">
      <div className="top-panel">
        <div className="left-section">
          <h1>LitCritique</h1>
        </div>

        <div className="center-section">
          <input
            type="text"
            placeholder="Search for reviews"
            value={searchQuery}
            onChange={handleSearch}
            className="search-bar"
          />
        </div>

        <div className="right-section">
          {user && (
            <span className="greeting">
              Hi, {user.displayName}!
            </span>
          )}
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

      <div className="content">
        <div className="filters-container">
          <div className="rating-filter">
            <label htmlFor="rating-filter">Filter by Rating:</label>
            <select
              id="rating-filter"
              value={ratingFilter}
              onChange={handleRatingFilterChange}
            >
              <option value="">All Ratings</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>

          <div className="sort-filter">
            <label htmlFor="sort-filter">Sort by Date:</label>
            <select
              id="sort-filter"
              value={sortOption}
              onChange={handleSortOptionChange}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        <div className="reviews-container">
          {sortedReviews
            .filter((review) => {
              const searchTerm = searchQuery.toLowerCase();
              return (
                (review.title && review.title.toLowerCase().includes(searchTerm)) ||
                (review.author && review.author.toLowerCase().includes(searchTerm)) ||
                (review.reviewText && review.reviewText.toLowerCase().includes(searchTerm)) ||
                (review.user && review.user.toLowerCase().includes(searchTerm))
              );
            })
            .filter((review) => {
              if (ratingFilter) {
                return review.rating === parseInt(ratingFilter);
              }
              return true;
            })
            .map((review) => (
              <div key={review.id} className="bottom-glass-card">
                <h3>{review.title}</h3>
                <p><strong>Author:</strong> {review.author}</p>
                <p><strong>Rating:</strong> {review.rating}</p>
                <p><strong>Review:</strong> {review.reviewText}</p>
                <p><strong>Submitted by:</strong> {review.username}</p>
                <p><strong>Posted on:</strong> {review.timestamp}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
