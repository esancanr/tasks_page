import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTask, createTask, updateTask, deleteTask } from '../api/task'

function TasksPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const params = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      const res = await createTask({title, description})
      console.log(res)
    } else {
      const res = await updateTask(params.id, {title, description})
      console.log(res)
    }
    e.target.reset()
    navigate("/")
  };

  useEffect(() => {
    if (params.id){
      getTask(params.id)
        .then(res =>{
          setTitle(res.data.title)
          setDescription(res.data.description)
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [params.id]);

  return(
    <div className="grid h-screen place-items-center bg-gray-100:">
      <div>
        <form className="bg-zinc-950 p-10 rounded-md" onSubmit={handleSubmit}>
          <h1 className='text-3xl font-bold my-4'>
            {
              params.id ? "Update Task" : "Create Task"
            }
          </h1>
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
          <button className='bg-white hover:bg-slate-800 hover:text-white text-slate-800 py-2 px-4 rounded'>
            {params.id ? "Update Task" : "Save Task"}
          </button>
        </form>
        {params.id && (
          <button className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5' onClick={async() =>{
          const res = await deleteTask(params.id)
          console.log(res);
          navigate("/")
          }}>
          Delete 
        </button>
        )}
      </div>
    </div>
  )
}

export default TasksPage