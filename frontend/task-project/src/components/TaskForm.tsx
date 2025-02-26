import { FormEvent, useState, useContext } from "react"
import { tasksContext } from "../App";



const TaskForm = () => {
  const [task, setTask] = useState("");
  const context = useContext(tasksContext);

  if (!context) {
    return <div></div>
  }

  const { handleAdd } = context

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleAdd(task)
    setTask("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="task-form">
        <input 
          type="text"
          value={task}
          onChange={(event) => {setTask(event.target.value)}}
          className="task-input"
        />
        <button className="form-button">Add</button>
      </form>
    </div>
  )

}

export default TaskForm