<template>
  <NavBar />
  <div class="max-w-5xl space-y-2 mx-auto py-6 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Tasks</h1>
      <RouterLink
          to="/tasks/create"
        class="flex items-center py-1 gap-x-1 text-white bg-blue-500 p-1.5 rounded-md duration-150 hover:bg-blue-400">
        <span class="text-2xl">+</span>
        <span>Create Task</span>
      </RouterLink>
    </div>
    <div class="grid grid-cols-5 bg-gray-200 p-2 rounded-md">
      <span>#</span>
      <span>Title</span>
      <span>Status</span>
      <span>Due date</span>
      <span>Actions</span>
    </div>
    <div class="bg-gray-200 p-2 rounded-md grid grid-cols-5 " v-for="(task, index) in tasks" :key="task.id">
      <Task :task="task" />
    </div>
  </div>
</template>

<script>
import { getAllTasks } from "../../api/tasks.ts";
import NavBar from "../../components/layouts/NavBar.vue";
import Task from "../../components/partials/Task.vue";

export default {
  name: "tasks-list",
  components: { Task, NavBar },
  data() {
    return {
      tasks: []
    }
  },
  async mounted() {
    this.tasks = await getAllTasks("asc");
  }
}
</script>

<style scoped></style>