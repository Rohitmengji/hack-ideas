// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Logins";
import Challenge from "./components/Challenge";
import { fetchChallenges } from "./services/api";

function App() {
  const [empId, setEmpId] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    tags: "",
  });

  useEffect(() => {
    const storedEmpId = localStorage.getItem("empId");
    if (storedEmpId) {
      setEmpId(storedEmpId);
      fetchChallenges(storedEmpId)
        .then((response) => setChallenges(response.data))
        .catch((error) => console.error("Error fetching challenges:", error));
    }
  }, []);

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
          <Login empId={empId} setEmpId={setEmpId} handleLogin={handleLogin} />
        </Route>
        <Route path="/challenges">
          <Challenge
            empId={empId}
            setEmpId={setEmpId}
            challenges={challenges}
            setChallenges={setChallenges}
            a
            newChallenge={newChallenge}
            setNewChallenge={setNewChallenge}
          />
        </Route>
        <Route path="/">
          {/* Redirect to "/login" if no matching route */}
          <Login empId={empId} setEmpId={setEmpId} handleLogin={handleLogin} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
