<template>
  <NavBar />
  <div class="max-w-5xl space-y-2 mx-auto py-6 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Tasks</h1>
      <div class="flex-1 flex items-center gap-3 justify-end">
        <FilterTasks/>
        <SortTasks/>
        <RouterLink
            to="/tasks/create"
            class="flex items-center py-1 gap-x-1 text-white bg-blue-500 p-1.5 rounded-md duration-150 hover:bg-blue-400">
          <span class="text-2xl">+</span>
          <span>Create Task</span>
        </RouterLink>
      </div>
    </div>
    <div class="grid grid-cols-5 bg-gray-200 p-2 rounded-md">
      <span>#</span>
      <span>Title</span>
      <span>Status</span>
      <span>Due date</span>
      <span>Actions</span>
    </div>
    <div class="bg-gray-200 p-2 rounded-md grid grid-cols-5 " v-for="(task, index) in tasks" :key="task.id">
      <Task :on-deleted="onDeleted" :task="task" />
    </div>
  </div>
</template>

<script setup lang="ts" >
import { getAllTasks } from "../../api/tasks.ts";
import NavBar from "../../components/layouts/NavBar.vue";
import Task from "../../components/partials/Task.vue";
import SortTasks from "../../components/partials/SortTasks.vue";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import FilterTasks from "../../components/partials/FilterTasks.vue";
const tasks = ref([]);
const onDeleted=(id :string)=>{
  tasks.value = tasks.value.filter(t => t.id !== id);
}
const route = useRoute();
watch(() => route.query, async function(prop){
  tasks.value = await getAllTasks((prop.sort || "asc") as any, prop.filter as any);
}, { immediate: true })

</script>

<style scoped></style>