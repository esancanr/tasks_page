import { BrowserRouter, Routes, Route } from "react-router-dom"
import TasksPage from './pages/TasksPage'
import HomePage from './pages/HomePage'

import NavBar from "./components/NavBar"

function App() {
  return(
    <BrowserRouter>
      <div className="container mx-auto px-10">
        <NavBar/>

        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/create-tasks" element={<TasksPage/>}/>
          <Route path="/tasks/:id" element={<TasksPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App