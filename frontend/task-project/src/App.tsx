import React, { useState, createContext } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList';
import './App.css'

type TaskContextType = {
  tasks: string[];
  handleAdd: (task: string) => void;
  handleDelete: (item: number) => void;
}

export const tasksContext = createContext<TaskContextType | undefined>(undefined);

const App = () => {
  const [tasks, setTasks] = useState<string[]>(["test", "dog"]);
  
  const handleAdd = (task: string) => {
    setTasks(prevTasks => [...prevTasks, task])
  }

  const handleDelete = (item: number) => {
    setTasks(tasks.filter((_, i) => i !== item))
  }

  const value = {
    tasks, handleAdd, handleDelete
  }


  return (
    <tasksContext.Provider value={value}>
      <div className='container'>
        <h1>Task Manager</h1>
        <TaskForm></TaskForm>
        <TaskList></TaskList>
      </div>
    </tasksContext.Provider>
  )
}

export default App