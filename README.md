# LitCritique Web App

LitCritique is a full-stack web application for managing book reviews. Users can add, browse, and manage reviews, all while benefiting from an intuitive interface. This project is built using React for the frontend and Node.js (Express) for the backend. Firebase handles user authentication and Firestore for data storage.

## Functionalities

- **User Authentication**: Users can sign up and log in using Firebase Authentication.
- **Book Reviews**:
  - Users can add new reviews with book titles, authors, ratings, and detailed review text.
  - Users can browse all book reviews using the search bar, and sort them by date or filter by rating.
- **My Reviews**: 
  - Users can view all their reviews in the "My Reviews" section, which is accessible via the hamburger menu.
  - In the "My Reviews" section, users can edit or delete a specific review by clicking the 3-dot menu in the top-right corner of each review.
  
## Tech Stack

- **Frontend**: 
  - **React**: Used for building the user interface and managing state.
  - **React Router DOM**: For handling routing and navigation.
  - **Fetch API**: Used for making HTTP requests to the backend.
  
- **Backend**:
  - **Node.js**: JavaScript runtime for the backend.
  - **Express**: Web framework for building RESTful APIs.
  - **Firebase**: For user authentication and Firestore as the database.
  
- **Database**: 
  - **Firestore**: NoSQL cloud database used to store and retrieve book review data.

## Backend Structure

The backend handles the logic for user authentication, review management, and communication with Firestore. The API is organized around different operations for managing book reviews.

### API Endpoints

- **POST `/api/reviews`**: Creates a new review.
- **GET `/api/reviews`**: Retrieves all reviews.
- **GET `/api/reviews/user/:uid`**: Retrieves all reviews of a specific user using UID.
- **GET `/api/reviews/:id`**: Retrieves a specific review by its ID.
- **PUT `/api/reviews/:id`**: Updates a review.
- **DELETE `/api/reviews/:id`**: Deletes a review.

### Authentication

Firebase Authentication is used for handling user login and sign-up. On successful login, a Firebase authentication token is generated and used to manage sessions.

## Frontend Structure

The frontend is built using React. The components manage views such as displaying reviews, logging in users, and managing their sessions.

