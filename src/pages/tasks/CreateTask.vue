<template>
  <NavBar />
  <div class="max-w-4xl space-y-2 m-3 md:mx-auto  py-6 sm:px-6 lg:px-8">
    <h3 class="text-lg md:text-2xl font-semibold text-gray-600">Create new task</h3>
    <div class="p-4 bg-gray-200 rounded-lg">
      <TaskForm :isEditMode="false" :task="{}"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import NavBar from "../../components/layouts/NavBar.vue";
import TaskForm from "../../components/features/task/TaskForm.vue";
</script>

<style scoped></style>