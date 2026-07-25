import axios from "axios";

const URL = "http://localhost:8000"
const endpoint = `${URL}/api`

export const getTask = (id) =>  axios.get(`${endpoint}/task/${id}`)

export const updateTask = (id, task) => axios.put(`${endpoint}/task/${id}`, task);

export const createTask = (task) => axios.post(`${endpoint}/create-task`, task);

export const deleteTask = (id) => axios.delete(`${endpoint}/task/${id}`)

export const fetchTasks = () => axios.get(`${endpoint}/tasks`)