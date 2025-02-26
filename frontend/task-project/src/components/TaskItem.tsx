import React from 'react'
import { tasksContext } from '../App'
import { useContext } from 'react'

interface Props {
  task: string
  id: number
}

const TaskItem = ({task, id}: Props) => {

  const context = useContext(tasksContext)

  if (!context) {
    return <div>No task</div>
  }

  const { handleDelete } = context

  const handleClick = () => {
    handleDelete(id)
  }

  return (
    <div className='task-item'>
      <div className='task-name'>
        {task}
      </div>
      <div className='del-button'>
        <button onClick={handleClick}>Delete</button>
      </div>
    </div>
  )
}

export default TaskItem