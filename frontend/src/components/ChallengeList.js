// src/ChallengeList.js
import React, { useEffect } from "react";
import {
  fetchChallenges,
  addChallenge,
  voteForChallenge,
  deleteChallenge,
} from "../services/api";
import { useHistory } from "react-router-dom";
import ChallengeItem from "./ChallengeItem";
import { useUserChallengeContext } from "../context/UserContext";

const ChallengeList = () => {
  const {
    empId,
    setEmpId,
    challenges,
    setChallenges,
    newChallenge,
    setNewChallenge,
  } = useUserChallengeContext();

  const history = useHistory();

  const handleBack = () => {
    localStorage.removeItem("empId");
    setEmpId("");
    history.push("/login");
  };

  useEffect(() => {
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

  const handleVote = (taskId) => {
    voteForChallenge(taskId)
      .then((response) => {
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
    deleteChallenge(taskId)
      .then((result) => {
        setChallenges((prevChallenges) =>
          prevChallenges.filter((challenge) => challenge.task_id !== taskId)
        );
        alert(result.data.message);
      })
      .catch((error) => console.error("Error deleting challenge:", error));
  };

  const handleSort = (type) => {
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
          className="mb-4 bg-black text-white py-2 px-4 rounded-md hover:bg-black-600 focus:outline-none focus:ring focus:border-black-300 flex items-center justify-center"
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
              className="bg-black text-white py-2 px-4 rounded-md focus:outline-none focus:ring"
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
                  className="bg-black text-white py-2 px-4 rounded-md focus:outline-none focus:ring"
                >
                  Sort by Votes
                </button>
                <button
                  onClick={() => handleSort("timestamp")}
                  className="bg-black text-white py-2 px-4 rounded-md focus:outline-none focus:ring"
                >
                  Sort by Time
                </button>
              </div>
            </div>
            <div className="grid gap-4">
              {challenges.length > 0 ? (
                challenges?.map((challenge) => (
                  // to display the data in table
                  <ChallengeItem
                    key={challenge.task_id}
                    challenge={challenge}
                    handleVote={handleVote}
                    handleDelete={handleDelete}
                  />
                ))
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

export default ChallengeList;
