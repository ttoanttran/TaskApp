import React from 'react'
import { useContext } from 'react'
import { tasksContext } from '../App'
import TaskItem from './TaskItem'


const TaskList = () => {

  const context = useContext(tasksContext)

  if (!context) {
    return <div>No tasks available</div>
  }

  const { tasks } = context
  
  return (
    <div>
      <ul className='task-list'>
        {tasks.map((task) => 
          <li key={task.id}><TaskItem task={task.task} id={task.id}></TaskItem></li>
        )}
      </ul>
    </div>
  )
}

export default TaskList