import { FormEvent, useState } from "react"

interface Props {
  handleAdd: (item: string) => void
}

const TaskForm = ({handleAdd}: Props) => {
  const [task, setTask] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleAdd(task)
    setTask("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={task}
          onChange={(event) => {setTask(event.target.value)}}
        />
        <button>Add</button>
      </form>
    </div>
  )

}

export default TaskForm