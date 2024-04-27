import axios from "../lib/axiosConfig";
import { getCookie } from "../lib/utils";

export const getAllTasks = async (
  sort?: "asc" | "desc",
  statusFilter?: "pending" | "in progress" | "completed"
) => {
  let path = `api/tasks/?due_date=${sort}`;
  if (statusFilter) {
    path.concat(`&status=${statusFilter}`);
  }

  const { data: tasks } = await axios.get(path, {
    headers: {
      Authorization: getCookie("auth_token"),
    },
  });

  return tasks;
};

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

export const setTaskCompleted = async (taskID: string) => {
    const { status } = await axios.put(`/api/tasks/${taskID}/mark-completed`,{}, {
        headers: {
            Authorization: getCookie("auth_token"),
        },
    });
    return status === 200;
};
