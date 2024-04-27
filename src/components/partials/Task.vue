<template>
  <span>{{ task.id }}</span>
  <span>{{ task.title }}</span>
  <span :class="task.status === 'completed' ? 'bg-blue-500' : task.status === 'pending' ?'bg-gray-600' :'bg-green-300' " class="w-[120px] text-center rounded-lg flex items-center justify-center capitalize text-white">{{ task.status }}</span>
  <span :class="new Date(task.due_date.toString())< Date() ? 'bg-red-400' : 'bg-gray-400'" class="w-[120px] text-center rounded-lg flex items-center justify-center capitalize text-white">{{ task.due_date }}</span>
  <div class="flex flex-wrap gap-1">
    <RouterLink :to="{ name: 'edit-task', params: { id: task.id }}" title="Update" class="  bg-gray-300 duration-200 hover:bg-gray-200 p-2 rounded-md">
      <img class="w-4 h-4 " src="../../assets/edit.png" alt="edit">
    </RouterLink>
    <button @click="handleDeleteTask" title="Delete" class="  bg-gray-300 duration-200 hover:bg-gray-200 p-2 rounded-md">
      <img class="w-4 h-4 " src="../../assets/delete.png" alt="delete">
    </button>
    <button v-if="task.status!=='completed'" @click="markTaskCompleted" title="Mark done" class="  bg-gray-300 duration-200 hover:bg-gray-200 p-2 rounded-md">
      <img class="w-4 h-4 " src="../../assets/check.png" alt="view">
    </button>
  </div>
</template>

<script setup lang="ts">
import {deleteTask, setTaskCompleted} from "../../api/tasks";

type ITask={
  id:string;
  title:string;
  due_date : Date;
  status: "pending"|"completed"|"in progress";
  description:string
}
const {task, onDeleted} = defineProps<{ task: ITask, onDeleted:(id:string)=>void}>()

async function markTaskCompleted(){
  const updated = await  setTaskCompleted(task.id);
  if(updated){
    task.status = "completed";
  }
}
async function handleDeleteTask(){
  if(confirm(`Are you sure that you want to delete this task?`)){
    const deleted = await  deleteTask(task.id);
    if(deleted){
      onDeleted(task.id);
    }
  }
}

</script>

<style scoped>

</style>