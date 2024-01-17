const express = require("express");
const router = express.Router();
const firebase = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL:
    "https://hack-ideas-dafeb-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = firebase.database();
const challengesRef = db.ref("challenges");

router.get("/:emp_id", async (req, res) => {
  try {
    const empId = req.params.emp_id;
    const snapshot = await challengesRef
      .orderByChild("emp_id")
      .equalTo(Number(empId))
      .once("value");

    if (snapshot.exists()) {
      const tasks = [];
      snapshot.forEach((childSnapshot) => {
        tasks.push(childSnapshot.val());
      });

      res.json(tasks);
    } else {
      res
        .status(404)
        .json({ error: "Data not found for the specified emp_id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addChallenge", async (req, res) => {
  try {
    const newChallenge = req.body;
    const challengeRef = challengesRef.push();

    const timestamp = new Date().toISOString();

    await challengeRef.set({
      ...newChallenge,
      task_id: challengeRef.key,
      vote: 0,
      timestamp,
    });

    res.json({ ...newChallenge, task_id: challengeRef.key, timestamp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:task_id/vote", async (req, res) => {
  try {
    const task_id = req.params.task_id;
    const snapshot = await challengesRef.child(task_id).once("value");

    if (snapshot.exists()) {
      let currentVote = snapshot.val().vote || 0;

      currentVote++;

      await challengesRef.child(task_id).update({ vote: currentVote });

      res.json({
        ...snapshot.val(),
        vote: currentVote,
      });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:task_id", async (req, res) => {
  try {
    const task_id = req.params.task_id;

    const taskSnapshot = await challengesRef.child(task_id).once("value");

    if (taskSnapshot.exists()) {
      await challengesRef.child(task_id).remove();

      res.json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
