import axios from "../lib/axiosConfig";
import {getCookie} from "../lib/utils";

export const getAllTasks = async (sort? : "asc"|"desc", statusFilter?: "pending"|"in progress"|"completed") => {
    let path = `api/tasks/?due_date=${sort}`;
    if(statusFilter){
        path.concat(`&status=${statusFilter}`);
    }

    const {data:tasks, status} = await axios.get(path, {
        headers:{
            Authorization: getCookie("auth_token")
        }
    });

    return tasks;
}