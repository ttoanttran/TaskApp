import { useState } from "react"


const TaskForm = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <form>
        <input 
          type="text"
        />
        <button>Add</button>
      </form>
    </div>
  )

}

export default TaskForm