import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function TasksPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const params = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await axios.put(`http://localhost:8000/api/task/${params.id}`, {
        title,
        description,
      });
    } else {
      await axios.post("http://localhost:8000/api/create-task", {
        title,
        description,
      });
    }
    e.target.reset()
    navigate("/")
  };

  useEffect(() => {
    if (params.id){
      fetchTask()
    }
    async function fetchTask(){
      const res = await axios.get(`http://localhost:8000/api/task/${params.id}`)
      setTitle(res.data.title)
      setDescription(res.data.description)
    }
  }, [params.id])

  return(
    <div className="grid h-screen place-items-center bg-gray-100:">
      <form className="bg-zinc-950 p-10 rounded-md" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          className="block py-2 px-3 mb-4 w-full text-white border rounded-md"
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          value={title}
          />
        <textarea
          placeholder="Desciption"
          rows='3'
          className="block py-2 px-3 mb-4 w-full text-white border rounded-md"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button>
          {params.id ? "Update Task" : "Save Task"}
        </button>
      </form>
    </div>
  )
}

export default TasksPage