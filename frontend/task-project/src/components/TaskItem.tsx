import React, { useState } from 'react'
import { tasksContext } from '../App'
import { useContext } from 'react'

interface Props {
  task: string
  id: number
}

const TaskItem = ({task, id}: Props) => {

  const context = useContext(tasksContext)
  const [checked, setChecked] = useState<boolean>(false);

  if (!context) {
    return <div>No task</div>
  }

  const { handleDelete } = context

  const handleClick = () => {
    handleDelete(id)
  }

  const handleCheck = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json();
      setChecked(data.completed);
    } catch (error) {
      console.log("error checking box")
    }
  }

  return (
    <div className='task-item'>
      <input 
        type="checkbox"
        checked= {checked}
        onChange={handleCheck}
      />
      <div className={checked ? 'task-name-checked' : 'task-name'}>
        {task}
      </div>
      <div className='del-button'>
        <button onClick={handleClick}>Delete</button>
      </div>
    </div>
  )
}

export default TaskItem