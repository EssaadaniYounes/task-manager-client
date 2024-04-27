<template>
  <span>{{ task.id }}</span>
  <span>{{ task.title }}</span>
  <span :class="task.status === 'completed' ? 'bg-blue-500' : task.status === 'pending' ?'bg-gray-600' :'bg-green-300' " class="w-[120px] text-center rounded-lg flex items-center justify-center capitalize text-white">{{ task.status }}</span>
  <span :class="new Date(task.due_date.toString())< Date() ? 'bg-red-400' : 'bg-gray-400'" class="w-[120px] text-center rounded-lg flex items-center justify-center capitalize text-white">{{ task.due_date }}</span>
  <div class="flex flex-wrap gap-1">
    <button title="Update" class="  bg-gray-300 duration-200 hover:bg-gray-200 p-2 rounded-md">
      <img class="w-4 h-4 " src="../../assets/edit.png" alt="edit">
    </button>
    <button title="Delete" class="  bg-gray-300 duration-200 hover:bg-gray-200 p-2 rounded-md">
      <img class="w-4 h-4 " src="../../assets/delete.png" alt="delete">
    </button>
    <button v-if="task.status!=='completed'" @click="async()=>await markTaskCompleted(task)" title="Mark done" class="  bg-gray-300 duration-200 hover:bg-gray-200 p-2 rounded-md">
      <img class="w-4 h-4 " src="../../assets/check.png" alt="view">
    </button>
  </div>
</template>

<script setup lang="ts">
import {setTaskCompleted} from "../../api/tasks";

type ITask={
  id:string;
  title:string;
  due_date : Date;
  status: "pending"|"completed"|"in progress";
  description:string
}
defineProps<{ task: ITask}>()
async function markTaskCompleted(task:ITask){
  const updated = await  setTaskCompleted(task.id);
  if(updated){
    task.status = "completed";
  }
}

</script>

<style scoped>

</style>