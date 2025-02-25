import React from 'react'
import { tasksContext } from '../App'
import { useContext } from 'react'

interface Props {
  task: string
}

const TaskItem = ({task}: Props) => {

  const context = useContext(tasksContext)

  if (!context) {
    return <div>No task</div>
  }

  const { handleDelete } = context

  const handleClick = () => {
    handleDelete(task)
  }

  return (
    <div>
      {task}
      <button onClick={handleClick}>Delete</button>
    </div>
  )
}

export default TaskItem