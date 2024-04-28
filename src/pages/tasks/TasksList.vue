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
    <div class="bg-gray-200 p-2 rounded-md grid grid-cols-5 " v-for="(task, index) in paginatedTasks" :key="task.id">
      <Task :on-deleted="onDeleted" :task="task" />
    </div>
    <div class="w-full flex justify-end">
      <vue-awesome-paginate
          :total-items="tasks.length"
          :items-per-page="TASKS_PER_PAGE"
          :max-pages-shown="4"
          v-model="currentPage"
          :on-click="onClickHandler"
          :show-ending-buttons="true"
          :show-breakpoint-buttons="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts" >
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

import NavBar from "../../components/layouts/NavBar.vue";
import Task from "../../components/partials/Task.vue";
import SortTasks from "../../components/partials/SortTasks.vue";
import FilterTasks from "../../components/partials/FilterTasks.vue";

import { getAllTasks } from "../../api/tasks.ts";

const TASKS_PER_PAGE = 5;
const tasks = ref([]);
const currentPage = ref(1);
const paginatedTasks = ref([]);
const route = useRoute();

const onDeleted=(id :string)=>{
  tasks.value = tasks.value.filter(t => t.id !== id);
}
const onClickHandler = (page: number) => {
  const startIndex = TASKS_PER_PAGE * (page - 1);
  const endIndex = startIndex + TASKS_PER_PAGE;
  paginatedTasks.value = tasks.value.slice(startIndex, endIndex)
};

watch(() => route.query, async function(prop){
  tasks.value = await getAllTasks((prop.sort || "asc") as any, prop.filter as any);
  onClickHandler(1);
}, { immediate: true })

</script>

<style>
.pagination-container {
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
}
.paginate-buttons {
  height: 35px;
  width: 35px;
  font-weight: normal;
  border-radius: 10px;
  cursor: pointer;
  background-color: #eee;
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>