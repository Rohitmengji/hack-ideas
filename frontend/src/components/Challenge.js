// src/ChallengeList.js
import React, { useState, useEffect } from "react";
import {
  fetchChallenges,
  addChallenge,
  voteForChallenge,
  deleteChallenge,
} from "../services/api";
import { useHistory } from "react-router-dom";

const Challenge = ({
  empId,
  setEmpId,
  challenges,
  setChallenges,
  newChallenge,
  setNewChallenge,
}) => {
  const [sortBy, setSortBy] = useState(null); // 'votes' or 'timestamp'
  const history = useHistory();

  const handleBack = () => {
    // Clear localStorage before navigating back to login
    localStorage.removeItem("empId");
    setEmpId("");
    history.push("/login");
  };
  useEffect(() => {
    // Fetch challenges when the component mounts
    fetchChallenges(empId)
      .then((response) => setChallenges(response.data))
      .catch((error) => console.error("Error fetching challenges:", error));
  }, [empId, setChallenges]);

  const handleAddChallenge = () => {
    if (!newChallenge.title.trim() || !newChallenge.description.trim()) {
      alert("Please add both title and description");
      return;
    }

    const tagsArray = newChallenge.tags.split(",");
    addChallenge({
      ...newChallenge,
      emp_id: parseInt(empId),
      tags: tagsArray.map((tag) => tag.trim()),
    })
      .then((response) => {
        setChallenges([...challenges, response.data]);
        setNewChallenge({
          title: "",
          description: "",
          tags: "",
        });
      })
      .catch((error) => console.error("Error adding challenge:", error));
  };
  // formating the date and time with AM/PM
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours() % 12 || 12).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  const handleVote = (taskId) => {
    // hiting api call from below func
    voteForChallenge(taskId)
      .then((response) => {
        //Updating the new vote count
        setChallenges((prevChallenges) =>
          prevChallenges.map((challenge) =>
            challenge.task_id === taskId
              ? { ...challenge, vote: response.data.vote }
              : challenge
          )
        );
      })
      .catch((error) => console.error("Error voting:", error));
  };

  const handleDelete = (taskId) => {
    // Send a delete request
    deleteChallenge(taskId)
      .then((result) => {
        // Remove the deleted challenge from the state
        setChallenges((prevChallenges) =>
          prevChallenges.filter((challenge) => challenge.task_id !== taskId)
        );
        alert(result.data.message); // Display a success message
      })
      .catch((error) => console.error("Error deleting challenge:", error));
  };

  const handleSort = (type) => {
    // Update the sortBy state to trigger re-render and sorting
    setSortBy(type);
    setChallenges((prevChallenges) =>
      [...prevChallenges].sort((a, b) => {
        if (type === "votes") {
          return (b.vote || 0) - (a.vote || 0);
        } else if (type === "timestamp") {
          return new Date(b.timestamp) - new Date(a.timestamp);
        }
        return 0;
      })
    );
  };
  return (
    <>
      <div key="1" className="container mx-auto px-4 py-6">
        <button
          onClick={handleBack}
          className="mb-4 bg-black  text-white py-2 px-4 rounded-md hover:bg-black-600 focus:outline-none focus:ring focus:border-black-300 flex items-center justify-center"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back
        </button>
        <div className="grid gap-6">
          <div className="flex flex-col gap-4 w-7/10 items-center">
            <h1 className="text-3xl font-bold">Task Manager</h1>
            <div className="grid gap-2 w-1/2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-600"
              >
                Title
              </label>
              <input
                id="title"
                value={newChallenge.title}
                onChange={(e) =>
                  setNewChallenge({ ...newChallenge, title: e.target.value })
                }
                placeholder="Enter task title"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="grid gap-2 w-1/2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-600"
                value={newChallenge.description}
                onChange={(e) =>
                  setNewChallenge({
                    ...newChallenge,
                    description: e.target.value,
                  })
                }
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter task description"
                value={newChallenge.description}
                onChange={(e) =>
                  setNewChallenge({
                    ...newChallenge,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              ></textarea>
            </div>
            <div className="grid gap-2 w-1/2">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-600"
              >
                Tags
              </label>
              <input
                id="tags"
                value={newChallenge.tags}
                onChange={(e) =>
                  setNewChallenge({ ...newChallenge, tags: e.target.value })
                }
                placeholder="Enter tags separated by commas"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              onClick={handleAddChallenge}
              className="bg-black text-white py-2 px-4 rounded-md  focus:outline-none focus:ring ]"
            >
              Add Task
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">Tasks</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSort("votes")}
                  className="bg-black text-white py-2 px-4 rounded-md  focus:outline-none focus:ring "
                >
                  Sort by Votes
                </button>
                <button
                  onClick={() => handleSort("timestamp")}
                  className="bg-black text-white py-2 px-4 rounded-md  focus:outline-none focus:ring "
                >
                  Sort by Time
                </button>
              </div>
            </div>
            <div className="grid gap-4">
              {challenges.length > 0 ? (
                challenges?.map((challenge) => {
                  return (
                    <div
                      key={challenge.task_id}
                      className="border border-gray-300 rounded-md p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-2">
                          <h3 className="text-xl font-bold">
                            {challenge.title}
                          </h3>
                          <p className="text-gray-500">
                            {challenge.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              Votes: {challenge.vote || 0}
                            </span>
                            <span className="text-sm text-gray-500">
                              Tags: {challenge.tags.join(", ")}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {formatDate(challenge.timestamp)}
                          </span>
                          <div className="flex justify-center item-center">
                            <button
                              onClick={() => handleVote(challenge.task_id)}
                              className="  bg-black text-white py-1 px-2 mr-4 rounded-md focus:outline-none focus:ring "
                            >
                              +
                            </button>
                            <button
                              onClick={() => handleDelete(challenge.task_id)}
                              className=" bg-black text-white py-1 px-2 rounded-md  focus:outline-none focus:ring "
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No challenges found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Challenge;
