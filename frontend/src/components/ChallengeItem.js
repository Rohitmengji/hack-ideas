// src/ChallengeItem.js
import React from "react";

const ChallengeItem = ({ challenge, handleVote, handleDelete }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      hourCycle: "h23", // Use "h23" for 24-hour format, or "h12" for 12-hour format
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div
      key={challenge.task_id}
      className="border border-gray-300 rounded-md p-4"
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">{challenge.title}</h3>
          <p className="text-gray-500">{challenge.description}</p>
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
              className="bg-black text-white py-1 px-2 mr-4 rounded-md focus:outline-none focus:ring"
            >
              +
            </button>
            <button
              onClick={() => handleDelete(challenge.task_id)}
              className="bg-black text-white py-1 px-2 rounded-md focus:outline-none focus:ring"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeItem;
