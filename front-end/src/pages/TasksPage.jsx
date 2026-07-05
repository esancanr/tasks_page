import { useState } from 'react'
import axios from 'axios'

function TasksPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:8000/api/create-task",{
      title,
      description,
    });
    console.log(res)
    e.target.reset()
  };

  return(
    <div className="grid h-screen place-items-center bg-gray-100:">
      <form className="bg-zinc-950 p-10 rounded-md" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          className="block py-2 px-3 mb-4 w-full text-white border rounded-md"
          onChange={(e) => setTitle(e.target.value)}
          />
        <textarea
          placeholder="Desciption"
          rows='3'
          className="block py-2 px-3 mb-4 w-full text-white border rounded-md"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button>Save</button>
      </form>
    </div>
  )
}

export default TasksPage