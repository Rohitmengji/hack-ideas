// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Logins";
// import Challenge from "./components/Challenge";
import { fetchChallenges } from "./services/api";
import { useUserChallengeContext } from "./context/UserContext";
import ChallengeList from "./components/ChallengeList";

function App() {
  const { empId, setEmpId, setChallenges } = useUserChallengeContext();

  useEffect(() => {
    const storedEmpId = localStorage.getItem("empId");
    if (storedEmpId) {
      setEmpId(storedEmpId);
      fetchChallenges(storedEmpId)
        .then((response) => setChallenges(response.data))
        .catch((error) => console.error("Error fetching challenges:", error));
    }
  }, [setEmpId, setChallenges]);

  const handleLogin = () => {
    if (!empId.trim()) {
      alert("Please enter an Employee ID");
      return;
    }
    localStorage.setItem("empId", empId);
    setChallenges([]);
    // Redirect to the ChallengeList component
    // You may replace "/challenges" with the desired route path
    // The ChallengeList component will handle displaying challenges and adding new challenges
    window.location.href = "/challenges";
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/challenges">
          <ChallengeList />
        </Route>
        <Route path="/">
          {/* Redirect to "/login" if no matching route */}
          <Login handleLogin={handleLogin} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
