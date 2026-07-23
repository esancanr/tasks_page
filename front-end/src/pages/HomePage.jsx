import axios from "axios";
import { useEffect, useState } from "react"
import TaskList from "../components/TaskList";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function getTasks() {
      const response = await axios.get('http://localhost:8000/api/tasks')
      setTasks(response.data)
    }
    getTasks();
  })

  return(
    <>
      <h1 className="text-3xl font-bold">Home Page</h1>
      <TaskList tasks={tasks}/>
    </>
  )
}

export default HomePage