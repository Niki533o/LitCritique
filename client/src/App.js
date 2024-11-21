import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import AddReview from "./pages/AddReview";
import MyReviews from "./pages/MyReviews";
import EditReview from "./pages/EditReview";

function App() {
  return (
    <Router>
      <div>
        <Routes>  
          <Route path="/edit-review/:id" element={<EditReview />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/add-review" element={<AddReview />} />
          <Route path="/signup" element={<Signup />} />  
          <Route path="/login" element={<Login />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;