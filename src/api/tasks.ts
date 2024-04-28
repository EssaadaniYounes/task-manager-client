import axios from "../lib/axios-config";
import { getCookie } from "../lib/utils";

export const getAllTasks = async (
  sort?: "asc" | "desc",
  statusFilter?: "pending" | "in progress" | "completed"
) => {
  let path = `api/tasks/?due_date=${sort}`;
  if (statusFilter) {
    path += `&status=${statusFilter}`;
  }

  const { data: tasks } = await axios.get(path, {
    headers: {
      Authorization: getCookie("auth_token"),
    },
  });

  return tasks;
};


export const getTaskByID = async(taskID: string)=>{
    const { data } = await axios.get(`/api/tasks/${taskID}`, {
        headers: {
            Authorization: getCookie("auth_token"),
        },
    });
    return data.data;
}

export const createTask = async (payload: {
  title: string;
  description: string;
  due_date: string;
  status: string;
}) => {
  const { status } = await axios.post("/api/tasks", payload, {
    headers: {
      Authorization: getCookie("auth_token"),
    },
  });
  return status === 201;
};

export const updateTask = async (payload: {
    title: string;
    description: string;
    due_date: string;
    status: string;
}, taskID: string) => {
    const { status, data } = await axios.put(`/api/tasks/${taskID}`, payload, {
        headers: {
            Authorization: getCookie("auth_token"),
        },
    });
    return {updated: status === 200, message: data.message };
};

export const setTaskCompleted = async (taskID: string) => {
    const { data, status } = await axios.put(`/api/tasks/${taskID}/mark-completed`,{}, {
        headers: {
            Authorization: getCookie("auth_token"),
        },
    });
    return {updated: status === 200, message: data.message}

};

export const deleteTask = async (taskID: string) => {
    const { data } = await axios.delete(`/api/tasks/${taskID}`, {
        headers: {
            Authorization: getCookie("auth_token"),
        },
    });
    return {...data};
};
