<template>
  <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        {{label}}
      </h1>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()

</script>

<style scoped></style>