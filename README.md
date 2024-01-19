
# Challenge Tracker API --> Backend 

The Challenge Tracker API is a Node.js and Express-based RESTful API that interacts with Firebase Realtime Database. 
It manages and tracks challenges, providing endpoints for retrieving, adding, voting, and deleting challenges.

## Getting Started
1. Install dependencies:
npm install

2. Start the server:
nodemon index.js

The API will be accessible at `http://localhost:5000`.

## API Endpoints
### 1. Retrieve Challenges for an Employee

- **Endpoint:** `GET /challenges/:emp_id`
- **Parameter:** `emp_id` (Employee ID)
- **Response:** Array of challenges or a 404 error if no challenges found.

### 2. Add a New Challenge

- **Endpoint:** `POST /challenges/addChallenge`
- **Request Body:** `emp_id` (Employee ID), `description` (Challenge Description)
- **Response:** Newly added challenge details or a 500 error if an issue occurs.

### 3. Vote on a Challenge

- **Endpoint:** `PUT /challenges/:task_id/vote`
- **Parameter:** `task_id` (Task ID)
- **Response:** Updated challenge details with the new vote count or a 404 error if the challenge is not found.

### 4. Delete a Challenge

- **Endpoint:** `DELETE /challenges/:task_id`
- **Parameter:** `task_id` (Task ID)
- **Response:** Success message or a 404 error if the challenge is not found.

## Dependencies

- [Express](https://expressjs.com/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Body Parser](https://www.npmjs.com/package/body-parser)
- [CORS](https://www.npmjs.com/package/cors)


# Challenge Tracker Frontend

The Challenge Tracker Frontend is a React application that enables employees to log in, view challenges, and perform actions such as adding challenges, voting, and deleting.

## Components

### 1. ChallengeItem.js

- **Description:** React component to display individual challenges.
- **Props:**
  - `challenge`: Challenge data.
  - `handleVote`: Function to handle voting.
  - `handleDelete`: Function to handle deletion.

### 2. ChallengeList.js

- **Description:** React component to display a list of challenges and manage user interactions.
- **Functions:**
  - `handleAddChallenge`: Adds a new challenge.
  - `handleVote`: Handles voting for a challenge.
  - `handleDelete`: Handles deleting a challenge.
  - `handleSort`: Sorts challenges based on votes or timestamp.

### 3. Login.js

- **Description:** React component for employee login.
- **Props:**
  - `handleLogin`: Function to handle login.

### 4. App.js

- **Description:** Main React component managing routing and global state.
- **Functions:**
  - `handleLogin`: Handles login and fetches challenges for the logged-in employee.

### 5. api.js

- **Description:** Module for making API requests using Axios.
- **Functions:**
  - `fetchChallenges`: Fetches challenges for a specific employee.
  - `addChallenge`: Adds a new challenge.
  - `voteForChallenge`: Votes for a challenge.
  - `deleteChallenge`: Deletes a challenge.

## Setup

1. Install dependencies:

    npm install
   
3. Start the development server:

   npm start
   The application will be accessible at `http://localhost:3000`.

## Usage

1. Log in with your employee ID.
2. View and interact with challenges.
3. Add new challenges, vote, and delete challenges as needed.

## Dependencies

- React
- Axios
- React Router DOM
- Tailwind CSS (devDependencies)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements or bug fixes.
