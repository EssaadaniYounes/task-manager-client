<template>
  <span class="text-xs text-red-500 font-medium tracking-wider">{{ error }}</span>
</template>

<script setup lang="ts">
defineProps<{ error: string }>()
</script>

<style scoped>

</style>