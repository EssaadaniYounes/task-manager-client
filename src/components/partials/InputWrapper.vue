<template>
  <div>
    <label :for="forInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
    <slot></slot>

  </div>
</template>

<script setup lang="ts">


defineProps<{forInput:string, label:string}>();
</script>

<style scoped>

</style>