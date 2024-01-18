// src/api.js
import axios from "axios";

const baseURL = "http://localhost:5000/challenges"; 

const api = axios.create({
  baseURL,
});

export const fetchChallenges = (empId) => api.get(`/${empId}`);
export const addChallenge = (newChallenge) =>
  api.post("/addChallenge", newChallenge);
export const voteForChallenge = (taskId) => api.put(`/${taskId}/vote`);
export const deleteChallenge = (taskId) => api.delete(`/${taskId}`);
 