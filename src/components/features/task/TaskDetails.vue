<template>
  <div class="max-w-sm md:max-w-xl w-full mx-auto">
    <div class="m-6 md:m-10 lg:m-14 border border-gray-300 rounded-md p-3">
      <h3 class="text-xl md:text-2xl font-medium text-gray-800 capitalize">Task: {{ task.title }}</h3>
      <p class="break-words text-sm m-2 text-gray-700">
        <span class="font-medium">Description : </span>
        {{ task.description || "No description yet" }}
      </p>
      <div class="flex justify-between bg-gray-200 rounded-md">
        <p class="break-words text-sm m-2 text-gray-700">
          <span class="font-medium">Due Date : </span>
          {{ task.due_date }}
        </p>
        <p class="break-words text-sm m-2 text-gray-700 capitalize">
          <span class="font-medium">Status : </span>
          {{ task.status }}
        </p>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{ task: { id: string; title: string; description: string; due_date: string; status: string; } }>()
</script>

<style scoped>
.break-words {
  word-wrap: break-word;
}
</style>