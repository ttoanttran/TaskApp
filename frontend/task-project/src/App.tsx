import React, { useState, createContext, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList';
import './App.css'

type Task = {
  id: number;
  task: string;
  completed: boolean;
}

type TaskContextType = {
  tasks: Task[];
  handleAdd: (task: string) => void;
  handleDelete: (item: number) => void;
}

export const tasksContext = createContext<TaskContextType | undefined>(undefined);

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks');
        const data = await response.json();
        setTasks(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching tasks", error)
      }
    }
    fetchTasks();
  }, [])
  
  const handleAdd = (task: string) => {
    const addTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({task: task}),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTasks((task) => [...task, data])
        // {   } {   } {   } {   }, data
      } catch (error) {
        console.error("Error adding tasks", error)
      }
    }
    addTasks();
  }

  const handleDelete = (id: number) => {
    const deleteTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setTasks((prevTasks) => prevTasks.filter(task => id !== task.id))
      } catch (error) {
        console.error("Error deleting tasks", error)
      }
    }
    deleteTasks()
  }

  const handleDeleteAll = () => {
    const deleteAll = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks/all', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("response not okay");
        }
        
        setTasks([]);

      } catch (error) {
        console.error("Error deleting tasks", error)
      }
    }
    deleteAll();
  }

  const value = {
    tasks, handleAdd, handleDelete
  }


  return (
    <tasksContext.Provider value={value}>
      <div className='container'>
        <h1>Task Manager</h1>
        <button className='form-button' onClick={handleDeleteAll}>Delete All</button>
        <TaskForm></TaskForm>
        <TaskList></TaskList>
      </div>
    </tasksContext.Provider>
  )
}

export default App