import axios from 'axios'
import type { Task } from '../App'
const api = axios.create({baseURL: 'http://localhost:3000',
})


export const getTasks = () =>
  api.get<Task[]>('/tasks').then(r => r.data)

export const createTask = (title: string, priority: string) =>
  api.post<Task>('/tasks', { title, priority }).then(r => r.data)

export const updateTask = (id: number, data: Partial<Task>) =>
  api.patch<Task>(`/tasks/${id}`, data).then(r => r.data)

export const deleteTask = (id: number) =>
  api.delete<Task>(`/tasks/${id}`).then(r => r.data)