import { BrowserRouter, Routes, Route } from "react-router-dom"
import TasksPage from './pages/TasksPage'
import HomePage from './pages/HomePage'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create-tasks" element={<TasksPage/>}/>
        <Route path="/tasks/:id" element={<TasksPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App