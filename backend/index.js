const express = require('express');
const cors = require('cors'); 

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.send(tasks)
})

app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  foundTask = tasks.find(task => task.id === parseInt(id));
  res.json(foundTask);
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
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const updatedTask = { ...tasks[taskIndex], completed: !tasks[taskIndex].completed};

  tasks = tasks.map(task => task.id === parseInt(id) ? updatedTask : task);

  res.status(200).json(updatedTask);
})




app.listen(5000, () => {console.log("Server is running on port 5000")})

