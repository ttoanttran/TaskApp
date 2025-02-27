const express = require('express');
const cors = require('cors'); 

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.send(tasks)
})

app.post('/tasks', (req, res) => {
  const { task } = req.body;
  const newTask = { id: Date.now(), task, completed: false}
  tasks.push(newTask);
  res.status(200).json(newTask)
})

app.delete('/tasks/all', (req, res) => {
  console.log("detelintg")
  tasks = [];
  res.status(200).send();
})

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== parseInt(id))
  res.status(200).send();
})

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const found = tasks.find(task => task.id === id);
  if (found.completed) {
    found.completed = false;
  } else {
    found.completed = true;
  }
  res.status(200).json(found);
})




app.listen(5000, () => {console.log("Server is running on port 5000")})

