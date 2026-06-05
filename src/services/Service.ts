import axios from "axios";
export const task ='http://localhost:3000/task'

export const getTasks  = async (url: string) =>{
    const response = await axios.get(url);
    return response.data;
};


export const createTask = async (url: string, data: any) => {
    const response = await axios.post(url, data);
    return response.data;
};


export const updateTask = async (url: string, { arg }: any) => {
    const response = await axios.patch(url, arg);
    return response.data;
};

export const deleteTask = async (url: string, { arg }: any) => {
    const response = await axios.delete(url, { data: arg });
    return response.data;
}

/*

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
  api.delete<Task>(`/tasks/${id}`).then(r => r.data)*/