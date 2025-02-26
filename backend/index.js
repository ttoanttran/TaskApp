const express = require('express');
const cors = require('cors'); 

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  {id: 1, task: "Do laundry", completed: false},
  {id: 1, task: "Do hw", completed: false}
];

app.get('/tasks', (req, res) => {
  res.send(tasks)
})

app.post('/tasks', (req, res) => {
  const { task } = req.body;
  const newTask = { id: Date.now(), task, completed: false}
  tasks.push(newTask);
  res.status(200).json(newTask)
})

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks.filter(task => task.id !== parseInt(id))
  res.status(200).send();
})



app.listen(5000, () => {console.log("Server is running on port 5000")})

